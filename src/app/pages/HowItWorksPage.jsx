import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../modules/core/ui/Container';
import Button from '../../modules/core/ui/Button';

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Our marketplace bridges the gap between traditional and decentralized finance, allowing you to purchase real-world assets using both cryptocurrency and traditional payment methods.
          </p>
        </Container>
      </div>
      
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Our Unique Approach</h2>
            <p className="text-gray-700 mb-6">
              We've created a platform that combines the security and transparency of blockchain technology with the familiarity of traditional eCommerce. This hybrid approach makes it easy for everyone to participate in the ownership of premium assets, regardless of their level of crypto experience.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-3 text-blue-800">Key Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Verified Authenticity</span>
                    <p className="text-sm text-gray-600">All assets undergo rigorous verification to ensure authenticity and legal compliance.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Blockchain Security</span>
                    <p className="text-sm text-gray-600">Ownership records are secured on the blockchain, providing transparency and preventing fraud.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Payment Flexibility</span>
                    <p className="text-sm text-gray-600">Choose between cryptocurrency, credit card, or PayPal payment methods.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-gray-900">Physical & Digital Ownership</span>
                    <p className="text-sm text-gray-600">Receive both digital certification and physical delivery where applicable.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Simple 3-Step Process</h2>
            
            <div className="space-y-8">
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Browse the Marketplace</h3>
                  <p className="text-gray-700">
                    Explore our curated collection of premium real-world assets. Each listing includes detailed information about the asset, its provenance, and blockchain verification details.
                  </p>
                </div>
              </div>
              
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Choose Your Payment Method</h3>
                  <p className="text-gray-700">
                    Select your preferred payment option. Connect your crypto wallet for blockchain payments, or use traditional methods like credit cards and PayPal. Our system securely processes both types of transactions.
                  </p>
                </div>
              </div>
              
              <div className="relative pl-16">
                <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold text-xl">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Your Ownership</h3>
                  <p className="text-gray-700">
                    After purchase, you'll receive a blockchain certificate of ownership that serves as immutable proof of your asset's authenticity and your ownership rights. For physical items, we arrange secure delivery to your location.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/marketplace">
                <Button className="px-8 py-3 cursor-pointer">
                  Explore the Marketplace
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      
      <div className="bg-gray-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">How is ownership verified?</h3>
              <p className="text-gray-700">
                Each asset in our marketplace is linked to a unique digital token on the blockchain. This token contains verifiable information about the asset's authenticity, history, and ownership. When you purchase an asset, the ownership of this token is transferred to your wallet address, providing an immutable record of your ownership rights.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Do I need cryptocurrency to make a purchase?</h3>
              <p className="text-gray-700">
                No, you don't need cryptocurrency to buy assets on our platform. While we support crypto payments for users who prefer them, we also accept traditional payment methods like credit cards and PayPal. This hybrid approach makes our marketplace accessible to everyone, regardless of their familiarity with blockchain technology.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">What happens after I purchase an asset?</h3>
              <p className="text-gray-700">
                After your purchase is confirmed, you'll receive digital documentation of ownership. For physical assets, we'll coordinate delivery to your specified address. Your ownership details will also be recorded on the blockchain, providing a transparent and immutable record that you can verify at any time.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Are there fees for using the platform?</h3>
              <p className="text-gray-700">
                Our marketplace charges a small transaction fee on each purchase to cover the costs of verification, blockchain transactions, and platform maintenance. These fees vary depending on the asset type and payment method, but they're always clearly disclosed before you complete your purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Can I resell assets I've purchased?</h3>
              <p className="text-gray-700">
                Yes, our platform supports secondary market transactions. Once you own an asset, you can list it for resale directly on our marketplace. The blockchain record ensures that potential buyers can verify your ownership and the asset's provenance, creating a transparent and trustworthy environment for secondary sales.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">What if I don't have a crypto wallet?</h3>
              <p className="text-gray-700">
                You don't need a crypto wallet to make purchases using traditional payment methods. However, if you want to store your ownership certificates on the blockchain, we offer a simple wallet creation process directly through our platform. Our user-friendly interface makes it easy for beginners to create and manage their digital wallets.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">Still have questions about how our marketplace works?</p>
            <Link to="/contact">
              <Button variant="outline" className="px-8 py-3 cursor-pointer">
                Contact Our Support Team
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}