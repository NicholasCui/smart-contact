require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("counter", "Prints current counter")
  .addParam('address', 'The counter\'s address')
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.address;
    let counter = await ethers.getContractAt("Counter", contractAddr);

    let currValue = await counter.counter();

    console.log('current counter value: ', currValue);
  });


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "goerli",
  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/98c0068578374398b563ab30e11e8ecb",
      accounts: ['0x3a565a3bb9c3f07816d3e0ba93731096c1a2ef67ced84e8a308189122e103440']
    }
  },
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}
