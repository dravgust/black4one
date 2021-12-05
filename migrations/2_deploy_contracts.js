const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const ApocalypseDesign = artifacts.require("ApocalypseDesign");
const Counter = artifacts.require("Counter");

const TimelockController = artifacts.require("TimelockController");
const BlackToken = artifacts.require("BlackToken");
const BlackGovernor = artifacts.require("BlackGovernor");


module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);
  deployer.deploy(ApocalypseDesign);
  deployer.deploy(Counter);

  deployer.deploy(BlackToken)
    .then(() => BlackToken.deployed())
    .then(() => deployer.deploy(TimelockController, 0, ["0x1192aAa5F07ABD4F23939A1219a7165230D035d3"], ["0x1192aAa5F07ABD4F23939A1219a7165230D035d3"]))
    .then(() => TimelockController.deployed())
    .then(() => deployer.deploy(BlackGovernor, BlackToken.address, TimelockController.address))

  ;
};
