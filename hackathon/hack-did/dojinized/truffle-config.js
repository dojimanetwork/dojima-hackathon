const path = require("path");
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      host: "127.0.0.1",
      network_id: 5777
    },
    ganache_local: {
      provider: function () {
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
  },
    dojimaTestnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC,
      `https://api-test.d11k.dojima.network:8545/`,
      AccountIndex
      ),
      network_id: 1001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.20"
    }
  }
};
