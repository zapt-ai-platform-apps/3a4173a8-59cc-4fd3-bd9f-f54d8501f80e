import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import Header from '../modules/core/ui/Header';
import Footer from '../modules/core/ui/Footer';
import { api as walletApi } from '../modules/wallet/api';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userWallet, setUserWallet] = useState(null);
  const [isConnectingWallet, setIsConnectingWallet] = useState(false);
  
  const handleConnectWallet = async (walletType) => {
    try {
      setIsConnectingWallet(true);
      const walletData = await walletApi.connectWallet(walletType);
      setUserWallet(walletData.address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnectingWallet(false);
    }
  };
  
  const handleDisconnectWallet = async () => {
    try {
      await walletApi.disconnectWallet();
      setUserWallet(null);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };
  
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          isLoggedIn={isLoggedIn}
          userWallet={userWallet}
          onConnectWallet={handleConnectWallet}
          onDisconnectWallet={handleDisconnectWallet}
        />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
        
        {/* ZAPT Badge */}
        <div className="fixed bottom-4 left-4 z-50">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Made on ZAPT
          </a>
        </div>
      </div>
    </BrowserRouter>
  );
}