//const SimpleStorage = artifacts.require("SimpleStorage");
//const TutorialToken = artifacts.require("TutorialToken");
//const ComplexStorage = artifacts.require("ComplexStorage");
const BlackDeedRepository = artifacts.require("BlackDeedRepository");
const BlackAuctionRepository = artifacts.require("BlackAuctionRepository");
//const Counter = artifacts.require("Counter");
//const ERC20MinerReward = artifacts.require("ERC20MinerReward");
//const TimelockController = artifacts.require("TimelockController");
const BlackToken = artifacts.require("BlackToken");
const BlackFaucet = artifacts.require("BlackFaucet");
//const BlackGovernor = artifacts.require("BlackGovernor");

module.exports = function(deployer, network, accounts) {
  console.log("network", network);
  console.log("accounts", accounts);
  
  const owner = accounts[0];
  //const minDelay = 0;
  //const proposers = accounts;
  //const executors = accounts;

  //deployer.deploy(SimpleStorage);
  //deployer.deploy(TutorialToken);
  //deployer.deploy(ComplexStorage);
  deployer.deploy(BlackDeedRepository);
  deployer.deploy(BlackAuctionRepository);
  //deployer.deploy(Counter);
  //deployer.deploy(ERC20MinerReward);

  deployer.deploy(BlackToken, {from: owner})
    .then(() => BlackToken.deployed())
    .then(() => deployer.deploy(BlackFaucet, BlackToken.address, owner))
    //.then(() => deployer.deploy(TimelockController, minDelay, proposers, executors))
    //.then(() => TimelockController.deployed())
    //.then(() => deployer.deploy(BlackGovernor, BlackToken.address, TimelockController.address))
  ;
};
