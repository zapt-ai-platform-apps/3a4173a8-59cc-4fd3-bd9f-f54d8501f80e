import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api as marketplaceApi } from '../../modules/marketplace/api';
import ProductCard from '../../modules/marketplace/ui/ProductCard';
import Button from '../../modules/core/ui/Button';
import Container from '../../modules/core/ui/Container';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await marketplaceApi.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Real World Assets Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              The future of ownership - secure your assets on the blockchain with our hybrid payment solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace">
                <Button className="text-lg px-8 py-3">
                  Explore Marketplace
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" className="text-lg px-8 py-3 bg-white/10 hover:bg-white/20 text-white border-white">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Featured Products */}
      <Container className="py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Assets</h2>
          <p className="text-lg text-gray-600">Discover our most exclusive real-world asset opportunities</p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-20 bg-gray-300 rounded mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link to="/marketplace">
            <Button variant="outline" className="px-8 py-3">
              View All Assets
            </Button>
          </Link>
        </div>
      </Container>
      
      {/* How It Works Section */}
      <div className="bg-gray-50">
        <Container className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our marketplace combines the security of blockchain with the familiarity of traditional eCommerce</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-3">Browse Assets</h3>
              <p className="text-gray-600">Explore our curated collection of premium real-world assets - from real estate to collectibles and more.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-3">Choose Payment Method</h3>
              <p className="text-gray-600">Pay with cryptocurrency for instant blockchain settlement, or use traditional payment methods like credit cards and PayPal.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-3">Secure Ownership</h3>
              <p className="text-gray-600">Receive verified blockchain certification of ownership, with physical delivery options for applicable assets.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/how-it-works">
              <Button variant="outline" className="px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
        </Container>
      </div>
      
      {/* Benefits Section */}
      <Container className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Why Choose Our Marketplace</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience the future of asset ownership with our secure, transparent platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-2">Verified Authenticity</h3>
              <p className="text-gray-600">All assets on our platform undergo rigorous verification processes to ensure authenticity and legal compliance.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-2">Transparent Ownership</h3>
              <p className="text-gray-600">Blockchain technology provides an immutable record of ownership, ensuring transparency and preventing fraud.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-2">Flexible Payment Options</h3>
              <p className="text-gray-600">Choose from cryptocurrency, credit card, or PayPal payment methods to suit your preferences and needs.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">All transactions are protected with enterprise-grade security and follow strict compliance standards.</p>
            </div>
          </div>
        </div>
      </Container>
      
      {/* CTA Section */}
      <div className="bg-gray-800 text-white">
        <Container className="py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of investors who have already secured ownership of premium real-world assets.</p>
            <Link to="/marketplace">
              <Button className="px-8 py-3 text-lg">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}