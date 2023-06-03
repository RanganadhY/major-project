const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fileHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_viewerUsernames",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_editorUsernames",
				"type": "string[]"
			}
		],
		"name": "storeFileHashes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_randomNumber",
				"type": "uint256"
			}
		],
		"name": "storeRandomNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_fromUsername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_toUsername",
				"type": "string"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			}
		],
		"name": "getFiles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "fileHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "viewerUsernames",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "editorUsernames",
						"type": "string[]"
					}
				],
				"internalType": "struct FileStore.File[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "randomNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const jsonString = JSON.stringify(abi);
console.log(jsonString);