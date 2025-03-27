import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function Header({ isLoggedIn, userWallet, onConnectWallet, onDisconnectWallet }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">RWA Marketplace</Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Home</Link>
              <Link to="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Marketplace</Link>
              <Link to="/how-it-works" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">How It Works</Link>
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {userWallet ? (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">Wallet Connected:</span>
                    <Button variant="outline" onClick={onDisconnectWallet} className="text-xs cursor-pointer">
                      {`${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={onConnectWallet} className="cursor-pointer">Connect Wallet</Button>
                )}
                <Link to="/profile">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-600">U</span>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {userWallet ? (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">Wallet Connected:</span>
                    <Button variant="outline" onClick={onDisconnectWallet} className="text-xs cursor-pointer">
                      {`${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={onConnectWallet} className="cursor-pointer">Connect Wallet</Button>
                )}
                <Link to="/login">
                  <Button variant="outline" className="cursor-pointer">Log In</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Home</Link>
            <Link to="/marketplace" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">Marketplace</Link>
            <Link to="/how-it-works" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800">How It Works</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600">U</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Username</div>
                    <div className="text-sm font-medium text-gray-500">Email</div>
                  </div>
                </div>
                <div className="px-4 space-y-2">
                  {userWallet ? (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700 mr-2">Wallet:</span>
                      <Button variant="outline" onClick={onDisconnectWallet} className="text-xs cursor-pointer">
                        {`${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`}
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={onConnectWallet} className="cursor-pointer">Connect Wallet</Button>
                  )}
                  <Link to="/profile" className="block text-base font-medium text-gray-500 hover:text-gray-800">Your Profile</Link>
                  <button className="block text-base font-medium text-gray-500 hover:text-gray-800 cursor-pointer">Sign out</button>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                {userWallet ? (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-700 mr-2">Wallet:</span>
                    <Button variant="outline" onClick={onDisconnectWallet} className="text-xs cursor-pointer">
                      {`${userWallet.slice(0, 6)}...${userWallet.slice(-4)}`}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={onConnectWallet} className="cursor-pointer">Connect Wallet</Button>
                )}
                <Link to="/login">
                  <Button variant="outline" fullWidth className="cursor-pointer">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button fullWidth className="cursor-pointer">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}