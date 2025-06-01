require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Проверка обязательных переменных окружения
const requiredEnvVars = ['DEV_PRIVATE_KEY', 'CONTRACT_ADDRESS'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Missing ${envVar} in .env file`);
    process.exit(1);
  }
}

// Инициализация провайдера и кошелька
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const devWallet = new ethers.Wallet(process.env.DEV_PRIVATE_KEY, provider);

// ABI контракта (перенесите из constants.js)
const contractABI = [{
				"inputs": [],
				"stateMutability": "payable",
				"type": "constructor"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Approval",
				"type": "event"
			},
			{
				"anonymous": false,
				"inputs": [
					{
						"indexed": true,
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"indexed": true,
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"indexed": false,
						"internalType": "uint256",
						"name": "value",
						"type": "uint256"
					}
				],
				"name": "Transfer",
				"type": "event"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "allowance",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "spender",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "approve",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "burn",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "decimals",
				"outputs": [
					{
						"internalType": "uint8",
						"name": "",
						"type": "uint8"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "mint",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "name",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "sendTokens",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "symbol",
				"outputs": [
					{
						"internalType": "string",
						"name": "",
						"type": "string"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "totalSupply",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transfer",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			},
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "sender",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "recipient",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "transferFrom",
				"outputs": [
					{
						"internalType": "bool",
						"name": "",
						"type": "bool"
					}
				],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		];

// Инициализация контракта
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  devWallet
);

// Проверка подключения к контракту
async function checkContractConnection() {
  try {
    const code = await provider.getCode(process.env.CONTRACT_ADDRESS);
    if (code === '0x') {
      throw new Error('Contract does not exist at the specified address');
    }
    console.log('Successfully connected to contract');
  } catch (error) {
    console.error('Contract connection error:', error);
    process.exit(1);
  }
}

// Общая функция для перевода с адреса смарт контракта
async function transferFromContract(to, amount) {
  const tx = await contract.sendTokens(to, amount);
  await tx.wait();
  return tx.hash;
}

// // Маршруты
// app.post('/transfer', async (req, res) => {
//   try {
//     const { to, amount } = req.body;
    
//     if (!ethers.utils.isAddress(to)) {
//       return res.status(400).json({ success: false, error: 'Invalid address' });
//     }

//     const txHash = await transferFromContract(to, amount);
    
//     res.json({ 
//       success: true,
//       txHash,
//       amount: amountWei.toString()
//     });
//   } catch (error) {
//     console.error('Transfer error:', error);
//     res.status(500).json({ 
//       success: false,
//       error: error.reason || error.message || 'Transfer failed'
//     });
//   }
// });

app.post('/topup', async (req, res) => {
  try {
    const { userAddress, amount } = req.body;

    if (!ethers.utils.isAddress(userAddress)) {
      return res.status(400).json({ success: false, error: 'Invalid address' });
    }
    
    const txHash = await transferFromContract(userAddress, amount);
    
    res.json({ 
      success: true,
      amount,
      txHash
    });
  } catch (error) {
    console.error('Top up error:', error);
    res.status(500).json({ 
      success: false,
      error: error.reason || error.message || 'Gift transfer failed'
    });
  }
});

app.post('/gift', async (req, res) => {
  try {
    const { recipient } = req.body;

    if (!ethers.utils.isAddress(recipient)) {
      return res.status(400).json({ success: false, error: 'Invalid address' });
    }

    // const amount = Math.floor(Math.random() * 200) + 1;
    // const amountWei = ethers.utils.parseUnits(amount.toString(), 0); // Тут было 18 вместо 0

        // Генерация случайного количества (decimals = 0, поэтому без parseUnits)
    const amount = Math.floor(Math.random() * 200) + 1;
    
    const txHash = await transferFromContract(recipient, amount);
    
    res.json({ 
      success: true,
      amount,
      txHash
    });
  } catch (error) {
    console.error('Gift error:', error);
    res.status(500).json({ 
      success: false,
      error: error.reason || error.message || 'Gift transfer failed'
    });
  }
});

// app.post('/balance', async (req, res) => {
//   try {
//     const { address } = req.body;
    
//     if (!ethers.utils.isAddress(address)) {
//       return res.status(400).json({ error: 'Invalid address' });
//     }

//     const balance = await contract.balanceOf(address);
//     const formattedBalance = ethers.utils.formatUnits(balance, 18);
    
//     res.json({ 
//       balance: formattedBalance,
//       rawBalance: balance.toString()
//     });
//   } catch (error) {
//     console.error('Balance error:', error);
//     res.status(500).json({ 
//       error: error.reason || error.message || 'Failed to get balance'
//     });
//   }
// });

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Developer wallet: ${devWallet.address}`);
  
  await checkContractConnection();
});