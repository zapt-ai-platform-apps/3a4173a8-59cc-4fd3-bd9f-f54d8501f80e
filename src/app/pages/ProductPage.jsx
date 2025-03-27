import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api as marketplaceApi } from '../../modules/marketplace/api';
import { api as paymentsApi } from '../../modules/payments/api';
import { api as walletApi } from '../../modules/wallet/api';
import PaymentMethodSelector from '../../modules/payments/ui/PaymentMethodSelector';
import WalletConnector from '../../modules/wallet/ui/WalletConnector';
import { formatPrice, truncateAddress } from '../../modules/core/utils';
import Button from '../../modules/core/ui/Button';
import Container from '../../modules/core/ui/Container';
import * as Sentry from '@sentry/browser';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await marketplaceApi.getProductById(id);
        setProduct(data);
        setActiveImage(0);
      } catch (error) {
        console.error('Error fetching product details:', error);
        Sentry.captureException(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchPaymentMethods = async () => {
      try {
        const methods = await paymentsApi.getPaymentMethods();
        setPaymentMethods(methods);
        
        // If there's a default payment method, select it
        const defaultMethod = methods.find(m => m.isDefault);
        if (defaultMethod) {
          setSelectedPaymentMethod(defaultMethod.id);
        }
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        Sentry.captureException(error);
      }
    };
    
    fetchProduct();
    fetchPaymentMethods();
  }, [id]);
  
  const handleConnectWallet = async (walletType) => {
    try {
      setIsConnectingWallet(true);
      const walletData = await walletApi.connectWallet(walletType);
      setWallet(walletData);
      
      // If we're connecting a crypto wallet, also update selected payment method
      const cryptoMethod = paymentMethods.find(
        m => m.type === 'crypto' && m.details.blockchain === walletData.blockchain
      );
      
      if (cryptoMethod) {
        setSelectedPaymentMethod(cryptoMethod.id);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      Sentry.captureException(error);
    } finally {
      setIsConnectingWallet(false);
    }
  };
  
  const handleDisconnectWallet = async () => {
    try {
      await walletApi.disconnectWallet();
      setWallet(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      Sentry.captureException(error);
    }
  };
  
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      return;
    }
    
    try {
      setIsPaymentLoading(true);
      setPaymentStatus({ type: 'processing', message: 'Processing your payment...' });
      
      // Create a payment intent
      const paymentIntent = await paymentsApi.createPaymentIntent({
        amount: product.price,
        currency: product.currency,
        paymentMethodId: selectedPaymentMethod,
        productId: product.id,
      });
      
      // Process the payment
      const result = await paymentsApi.processPayment(paymentIntent.id);
      
      if (result.status === 'completed') {
        setPaymentStatus({ type: 'success', message: 'Payment successful! You now own this asset.' });
      } else {
        setPaymentStatus({ type: 'error', message: 'Payment failed. Please try again.' });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Sentry.captureException(error);
      setPaymentStatus({ type: 'error', message: 'Payment failed. Please try again.' });
    } finally {
      setIsPaymentLoading(false);
    }
  };
  
  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-80 bg-gray-300 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2].map(i => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
            <div>
              <div className="h-10 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-24 bg-gray-300 rounded mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-40 bg-gray-300 rounded mb-4"></div>
              <div className="h-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
  
  if (!product) {
    return (
      <Container className="py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/marketplace">
            <Button className="cursor-pointer">Back to Marketplace</Button>
          </Link>
        </div>
      </Container>
    );
  }
  
  return (
    <Container className="py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="aspect-w-16 aspect-h-9 bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded ${index === activeImage ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className="h-20 w-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <span className="text-gray-500">Category: {product.category}</span>
              {product.blockchain && (
                <>
                  <span className="mx-2">•</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    {product.blockchain}
                  </span>
                </>
              )}
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-gray-900 mb-6">
              {formatPrice(product.price, product.currency)}
            </div>
            
            {/* Seller Info */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-gray-600">{product.seller.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-medium">{product.seller.name}</h3>
                  {product.seller.rating && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-1">Rating:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg key={star} className={`w-4 h-4 ${star <= Math.round(product.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 ml-1">{product.seller.rating}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {product.contractAddress && (
                <div className="text-sm text-gray-600">
                  <span className="block mb-1">Contract Address:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block overflow-auto">
                    {product.contractAddress}
                  </code>
                </div>
              )}
            </div>
            
            {/* Payment Section */}
            {paymentStatus?.type === 'success' ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                    <p className="text-green-700 text-sm">You now own this asset. Check your profile for details.</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600 mb-2 block">Connect your wallet (optional)</span>
                  <WalletConnector
                    onConnect={handleConnectWallet}
                    onDisconnect={handleDisconnectWallet}
                    wallet={wallet}
                    isConnecting={isConnectingWallet}
                  />
                </div>
                
                <div className="mb-6">
                  <PaymentMethodSelector
                    methods={paymentMethods}
                    selectedId={selectedPaymentMethod}
                    onSelect={setSelectedPaymentMethod}
                  />
                </div>
                
                {paymentStatus?.type === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-red-800">Payment Failed</h3>
                        <p className="text-red-700 text-sm">Please try again or use a different payment method.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentStatus?.type === 'processing' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-blue-500 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <div>
                        <h3 className="font-semibold text-blue-800">Processing Payment</h3>
                        <p className="text-blue-700 text-sm">Please wait while we process your payment...</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || isPaymentLoading}
                  isLoading={isPaymentLoading}
                  fullWidth
                  className="py-3 text-lg cursor-pointer"
                >
                  Purchase Now
                </Button>
              </>
            )}
            
            {/* Delivery Info */}
            {product.physicalDelivery && (
              <div className="mt-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  This item includes physical delivery. Shipping details will be requested after purchase.
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="border-t border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Ownership Information</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex">
                  <span className="font-medium w-32">Asset Type:</span>
                  <span>{product.category}</span>
                </li>
                {product.tokenId && (
                  <li className="flex">
                    <span className="font-medium w-32">Token ID:</span>
                    <span>{product.tokenId}</span>
                  </li>
                )}
                {product.blockchain && (
                  <li className="flex">
                    <span className="font-medium w-32">Blockchain:</span>
                    <span>{product.blockchain}</span>
                  </li>
                )}
                <li className="flex">
                  <span className="font-medium w-32">Listing Date:</span>
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Purchase Protection</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Verified authenticity with blockchain validation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure escrow payment protection</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Ownership transfer with legal documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Customer support throughout the purchase process</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}