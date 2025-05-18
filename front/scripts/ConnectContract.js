// import { ethers } from "ethers";

// src="https://cdn.jsdelivr.net/npm/ethers@6.7.0/dist/ethers.umd.min.js"

// const abi = [
//     {
//         "inputs": [],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "allowance",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "approve",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "from",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "burn",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//             {
//                 "internalType": "uint8",
//                 "name": "",
//                 "type": "uint8"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "to",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "mint",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "sender",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "recipient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

// const contractAddress = "0xDA2c91836a83ed86195e3754D9C946f1f0a96EFb";
// const devAddress = "0x894205249444FA84044206DadA62e41DF37cf320";

// // Проверка, установлен ли MetaMask
// if (!window.ethereum) {
//     alert("Установите MetaMask");
//     return;
// }

// // Запрашиваем доступ к аккаунту (откроется MetaMask)
// await window.ethereum.request({ method: "eth_requestAccounts" });

// // Подключаем Metamask
// const provider = new ethers.BrowserProvider(window.ethereum);
// const signer = await provider.getSigner();
// const contract = new ethers.Contract(contractAddress, contractABI, signer);


// async function callTransferMethod() {
//     try {
//         // Вызываем метод transfer (это создаёт транзакцию)
//         const tx = await contract.transfer(devAddress, document.getElementById("amount").value);

//         // Ждём подтверждения транзакции в блокчейне
//         await tx.wait();

//         //TODO обновить баланс
//     } catch (err) {
//         console.error(err);
//         alert("Ошибка при вызове метода.");
//     }
// }

// async function callCheckBalacneMethod() {
//     try {
//         // Вызываем метод checkBalance (это создаёт транзакцию)
//         let balance = await contract.checkBalance();

//         // Ждём подтверждения транзакции в блокчейне
//         await balance.wait();

//         //TODO обновить баланс
//     } catch (err) {
//         console.error(err);
//         alert("Ошибка при вызове метода.");
//     }
// }
  


//     // Назначаем обработчики кнопкам
// document.getElementById("callButton").addEventListener("click", callContractMethod);