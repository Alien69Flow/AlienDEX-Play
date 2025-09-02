import { useState, useEffect } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string;
  chainId: number | null;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: '0',
    chainId: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check if wallet is already connected
  useEffect(() => {
    if (window.ethereum) {
      console.log("🦊 MetaMask detectado!");
      
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        })
        .catch(console.error);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          connectWallet();
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log("✅ Iniciando conexión con MetaMask...");
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        
        // Get balance
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        });

        // Get chain ID
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });

        // Convert balance from wei to ETH
        const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4);

        setWallet({
          isConnected: true,
          address,
          balance: balanceInEth,
          chainId: parseInt(chainId, 16),
        });

        console.log("✅ DAO iniciada!");
        console.log("💰 Balance:", balanceInEth, "ETH");
        console.log("🔗 Chain ID:", parseInt(chainId, 16));
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: '0',
      chainId: null,
    });
  };

  const getShortAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    wallet,
    connectWallet,
    disconnect,
    isLoading,
    getShortAddress,
    isMetaMaskInstalled: !!window.ethereum,
  };
};