require("dotenv").config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*" // Match any network id
		},

		goerli: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`wss://goerli.infura.io/ws/v3/${process.env.INFURA_API_KEY}` // URL to Ethereum Node
				)
			},
			gasPrice: 29481110253, // 60 Gwei
			gas: 30000000,
			network_id: 5
		},

		mainnet: {
			provider: () => new HDWalletProvider([process.env.DEPLOYER_PRIVATE_KEY],
				`https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
				),
			network_id: 1,
			gas: 8000000,
			gasPrice: 20000000000,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true,
		  },

		matic: {
			provider: function () {
				return new HDWalletProvider(
					[process.env.DEPLOYER_PRIVATE_KEY],
					`https://polygon-rpc.com`
				)
			},
			network_id: 137
		}
	},

	contracts_directory: './src/contracts/',
	contracts_build_directory: './src/abis/',

	compilers: {
		solc: {
			version: '0.8.9',
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},

	plugins: [
		'truffle-plugin-verify'
	],

	api_keys: {
		etherscan: process.env.ETHERSCAN_API_KEY
	}
}
