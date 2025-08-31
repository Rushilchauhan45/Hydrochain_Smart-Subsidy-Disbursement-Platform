import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface Transaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  type: 'subsidy_release' | 'milestone_completion' | 'contract_deployment';
  timestamp: Date;
  blockNumber?: number;
  gasUsed?: string;
  description: string;
}

interface SmartContract {
  address: string;
  name: string;
  type: string;
  status: 'deployed' | 'pending' | 'failed';
  deployedAt: Date;
  owner: string;
  balance: string;
}

interface Web3ContextType {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string;
  transactions: Transaction[];
  contracts: SmartContract[];
  isDemoMode: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  deployContract: (contractType: string, name: string) => Promise<string>;
  executeTransaction: (type: string, description: string, value?: string) => Promise<string>;
  switchNetwork: (chainId: number) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

// Mock blockchain data
const generateMockAddress = (): string => {
  return '0x' + Math.random().toString(16).substr(2, 40);
};

const generateMockTxHash = (): string => {
  return '0x' + Math.random().toString(16).substr(2, 64);
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    hash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
    from: '0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9',
    to: '0x8c3f42Aa1e7F9B5C92D11e6F89B5E7C6D4F3A2B1',
    value: '250000',
    status: 'confirmed',
    type: 'subsidy_release',
    timestamp: new Date(Date.now() - 3600000),
    blockNumber: 18942156,
    gasUsed: '21000',
    description: 'Subsidy released for Equipment Installation milestone'
  },
  {
    id: '2',
    hash: '0xb2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456a1',
    from: '0x8c3f42Aa1e7F9B5C92D11e6F89B5E7C6D4F3A2B1',
    to: '0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9',
    value: '0',
    status: 'confirmed',
    type: 'milestone_completion',
    timestamp: new Date(Date.now() - 7200000),
    blockNumber: 18942055,
    gasUsed: '45000',
    description: 'Initial Production milestone completed'
  }
];

const mockContracts: SmartContract[] = [
  {
    address: '0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9',
    name: 'HydroPower Station Alpha',
    type: 'SubsidyContract',
    status: 'deployed',
    deployedAt: new Date(Date.now() - 86400000),
    owner: '0x1234567890123456789012345678901234567890',
    balance: '1200000'
  },
  {
    address: '0x8c3f42Aa1e7F9B5C92D11e6F89B5E7C6D4F3A2B1',
    name: 'GreenH2 Manufacturing Hub',
    type: 'SubsidyContract',
    status: 'deployed',
    deployedAt: new Date(Date.now() - 172800000),
    owner: '0x1234567890123456789012345678901234567890',
    balance: '750000'
  }
];

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [contracts, setContracts] = useState<SmartContract[]>(mockContracts);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Demo mode for video presentation - Static wallet data
  const enableDemoMode = () => {
    setAccount('0x742d35Cc2e4e3B6B81F22c7B6b2e475e3c5c85c9');
    setChainId(1); // Ethereum Mainnet
    setIsConnected(true);
    setBalance('12.5847'); // Static balance for demo
    setIsDemoMode(true);
  };

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Connect to MetaMask or enable demo mode
  const connectWallet = async () => {
    // For video presentation - automatically enable demo mode if MetaMask not available
    if (!isMetaMaskInstalled()) {
      // Enable demo mode instead of showing error
      console.log('MetaMask not found - enabling demo mode for presentation');
      enableDemoMode();
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get chain ID
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
        
        // Mock balance for demo
        setBalance((Math.random() * 10).toFixed(4));
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            setAccount(accounts[0]);
          }
        });

        // Listen for chain changes
        window.ethereum.on('chainChanged', (chainId: string) => {
          setChainId(parseInt(chainId, 16));
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      // If MetaMask connection fails, enable demo mode
      console.log('MetaMask connection failed - enabling demo mode for presentation');
      enableDemoMode();
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
    setBalance('0');
  };

  // Deploy smart contract (mock)
  const deployContract = async (contractType: string, name: string): Promise<string> => {
    const contractAddress = generateMockAddress();
    
    const newContract: SmartContract = {
      address: contractAddress,
      name,
      type: contractType,
      status: 'pending',
      deployedAt: new Date(),
      owner: account || generateMockAddress(),
      balance: '0'
    };

    setContracts(prev => [...prev, newContract]);

    // Simulate deployment time
    setTimeout(() => {
      setContracts(prev => 
        prev.map(contract => 
          contract.address === contractAddress 
            ? { ...contract, status: 'deployed' as const }
            : contract
        )
      );
    }, 3000);

    // Add deployment transaction
    const deployTx: Transaction = {
      id: Date.now().toString(),
      hash: generateMockTxHash(),
      from: account || generateMockAddress(),
      to: contractAddress,
      value: '0',
      status: 'pending',
      type: 'contract_deployment',
      timestamp: new Date(),
      description: `Deployed ${contractType}: ${name}`
    };

    setTransactions(prev => [deployTx, ...prev]);

    // Confirm transaction after delay
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === deployTx.id
            ? { ...tx, status: 'confirmed' as const, blockNumber: Math.floor(Math.random() * 1000000) + 18000000 }
            : tx
        )
      );
    }, 2000);

    return contractAddress;
  };

  // Execute transaction (mock)
  const executeTransaction = async (type: string, description: string, value = '0'): Promise<string> => {
    const txHash = generateMockTxHash();

    const newTx: Transaction = {
      id: Date.now().toString(),
      hash: txHash,
      from: account || generateMockAddress(),
      to: generateMockAddress(),
      value,
      status: 'pending',
      type: type as any,
      timestamp: new Date(),
      description
    };

    setTransactions(prev => [newTx, ...prev]);

    // Confirm transaction after delay
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(tx =>
          tx.id === newTx.id
            ? { 
                ...tx, 
                status: 'confirmed' as const, 
                blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
                gasUsed: (Math.random() * 50000 + 21000).toFixed(0)
              }
            : tx
        )
      );
    }, 3000);

    return txHash;
  };

  // Switch network (mock)
  const switchNetwork = async (targetChainId: number) => {
    if (!isMetaMaskInstalled()) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
      setChainId(targetChainId);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  // Check if already connected on mount
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            setBalance((Math.random() * 10).toFixed(4));
            
            window.ethereum.request({ method: 'eth_chainId' })
              .then((chainId: string) => {
                setChainId(parseInt(chainId, 16));
              });
          }
        })
        .catch(console.error);
    }
  }, []);

  const value: Web3ContextType = {
    account,
    chainId,
    isConnected,
    isConnecting,
    balance,
    transactions,
    contracts,
    isDemoMode,
    connectWallet,
    disconnectWallet,
    deployContract,
    executeTransaction,
    switchNetwork,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any;
  }
}
