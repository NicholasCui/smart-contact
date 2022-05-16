import { useState } from 'react';
import { ethers } from "ethers";

import ATokenABI from './abi/aToken.json';
import VaultABI from './abi/vault.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const aTokenContract = new ethers.Contract(ATokenABI.address, ATokenABI.abi, provider).connect(signer);
const vaultContract = new ethers.Contract(VaultABI.address, VaultABI.abi, provider).connect(signer);

function App() {
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);

  const [amount, setAmount] = useState();

  const connect = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    setAccount(account);
    updateBalance();
  }

  const desposite = async () => {
    const res = await aTokenContract.approve(VaultABI.address, account);
    async function isMined (txHash) {
      const txResult = await provider.getTransaction(res.hash);
      console.log(txResult);
      if (!txResult.blockNumber) {
        return false
      }

      const receipt = await provider.getTransactionReceipt(txHash)
      clearInterval(timer);
      if (!receipt.status) {
        throw Error('TX status reverted')
      }

      await vaultContract.desposite(amount);
      updateBalance();
    }
    let timer = setInterval(() => {
      isMined(res.hash);
    }, [3000]);
  }

  const withdraw = async () => {
    await vaultContract.withdraw();
    updateBalance();
  }

  const [token, setToken] = useState();
  const [toAddress, setToAddress] = useState();

  const updateBalance = async () => {
    if (!account) {
      return
    }
    const balance = await aTokenContract.balanceOf(account);
    setBalance(balance.toNumber());
  }

  return (
    <div className="App">
      <p>Account: {account}</p>
      <p>Balance: {balance}</p>
      <button onClick={connect}>connect</button>
      <br />
      <input placeholder='amount' value={amount} onChange={
        (e) => {
          setAmount(e.target.value);
        }
      }/>
      <button onClick={desposite}>Desposite</button>
      <button onClick={withdraw}>Withdraw</button>
    </div>
  );
}

export default App;
