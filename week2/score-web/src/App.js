import Web3 from 'web3';
import { useState } from 'react';
import scoreABI from './abi/score.json'

import './App.css';

let web3;
let contract;

function initProject() {
  web3 = new Web3(Web3.givenProvider);
  contract = new web3.eth.Contract(scoreABI.abi, scoreABI.address)
}

function App() {
  const [account, setAccount] = useState();
  const [id, setId] = useState();
  const [score, setScore] = useState();

  const [scoreGetter, setScoreGetter] = useState();
  const connect = async () => {
    initProject();
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  }

  const onAddStudent = async () => {
    const res = await contract.methods.addStudentScore(id, score).send({
      from: account
    });
    console.log(res);
  }

  const onGetScore = async () => {
    const res = await contract.methods.getScore(id).call({
      from: account
    });
    console.log(res);
  }

  const onSetScore = async () => {
    const res = await contract.methods.setScore(id, score).send({
      from: account
    });
    console.log(res);
  }

  return (
    <div className="App">
      <p>Account: {account}</p>
      <button onClick={connect}>Connect Wallet</button>
      <p></p>
      <input value={id} onChange={(e) => {
        setId(e.target.value);
      }} placeholder='id'/>
      <input value={score} onChange={(e) => {
        setScore(e.target.value);
      }} placeholder='score'/>
      <button onClick={onAddStudent}>Add Student</button>
      <button onClick={onGetScore}>Get Score</button>
      <p>Score: {scoreGetter}</p>
      <br></br>
      <button onClick={onSetScore}>Set Score</button>
    </div>
  );
}

export default App;
