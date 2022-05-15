const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.deployed();

    expect(await counter.counter()).to.equal(0);

    const countTx = await counter.count();

    // wait until the transaction is mined
    await countTx.wait();

    expect(await counter.counter()).to.equal(1);
  });
});
