const Counter = artifacts.require('Counter');

module.exports = async  function() {
  const counter = await Counter.deployed();

  await counter.count();
};