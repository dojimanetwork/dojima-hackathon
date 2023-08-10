import React, { Component } from "react";
import MyToken from "./abi/MyToken.json";
import MyTokenSale from "./abi/MyTokenSale.json";
import KycContract from "./abi/KycContract.json";
import getWeb3 from "./getWeb3";

import config from './config.json'

import "./App.css";

class App extends Component {
  state = { loaded: false, kycAddress: "0x1001D...", tokenSaleAddress: null, userTokens: 0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      //this.networkId = await this.web3.eth.net.getId(); <<- this doesn't work with MetaMask anymore
      this.networkId = await this.web3.eth.getChainId();
      console.log(this.networkId);
      console.log(this.accounts[0]);

      this.myToken = new this.web3.eth.Contract(
        MyToken,
        config.networks[this.networkId] && config.networks[this.networkId].MyToken.address,
        //MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
        //config[network.chainId].MyToken.address
      );

      this.myTokenSale = new this.web3.eth.Contract(
        MyTokenSale,
        config.networks[this.networkId] && config.networks[this.networkId].MyTokenSale.address,
        //MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );
      this.kycContract = new this.web3.eth.Contract(
        KycContract,
        config.networks[this.networkId] && config.networks[this.networkId].KycContract.address,
        //KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded: true, tokenSaleAddress: this.myTokenSale._address });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.MyToken.methods.balanceOf(this.accounts[0]).call();
    this.setState({ userTokens: userTokens });
    console.log(userTokens)
  }

  listenToTokenTransfer = () => {
    this.myToken.events.Transfer({ to: this.accounts[0] }).on("data", this.updateUserTokens);
  }

  handleBuyTokens = async () => {
    await this.myTokenSale.methods.buyTokens(this.accounts[0]).send({ from: this.accounts[0], value: this.web3.utils.toWei("0.000001", "Ether") });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycWhitelisting = async () => {
    await this.kycContract.methods.setKycCompleted(this.state.kycAddress).send({ from: this.accounts[0] });
    alert("KYC for " + this.state.kycAddress + " is completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Doji Token KYC Sale</h1>
        <p>Get your Doji Token today!</p>
        <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" placeholder={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button>
        <h2>Buy Doji Tokens</h2>
        <button type="button" onClick={this.handleBuyTokens}>Buy DOJI</button>
      </div>
    );
  }
}

export default App;
