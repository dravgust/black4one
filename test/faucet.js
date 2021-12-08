const ERC20MinerReward = artifacts.require("ERC20MinerReward");
const truffleAssert = require('truffle-assertions');

contract("ERC20MinerReward", function (/* accounts */) {

    it("should return correct description", async () => {
  
      const instance = await ERC20MinerReward.deployed();
  
      const delivered = await instance._reward();
  
      truffleAssert.eventEmitted(delivered, 'LogNewAlert', (event) => {
        console.log(event);
        return event.description == '_rewarded';
      })
    });
  
  });
