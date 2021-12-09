const Faucet = artifacts.require("Faucet");
const truffleAssert = require('truffle-assertions');

contract("Faucet", function (accounts) {

  let instance;

  // Runs before all tests in this block.
  // Read about .new() VS .deployed() here:
  // https://twitter.com/zulhhandyplast/status/1026181801239171072
  before(async () => {
    instance = await Faucet.new();
  })

  it('...balance should starts with 0 ETH', async () => {
    let balance = await web3.eth.getBalance(instance.address);

    assert.equal(balance, 0);
  })

  it('...balance should has 0.1 ETH after deposit and throw event (Deposit) with amount', async () => {
    let one_eth = web3.utils.toWei('0.1', "ether");
    let tx = await web3.eth.sendTransaction({ from: accounts[1], to: instance.address, value: one_eth });
    let balance_wei = await web3.eth.getBalance(instance.address);
    let balance_ether = web3.utils.fromWei(balance_wei, "ether");

    assert.equal(balance_ether, 0.1);

    let result = await truffleAssert.createTransactionResult(instance, tx.transactionHash);
    truffleAssert.eventEmitted(result, 'Deposit', (event) => {
      return event.amount == one_eth;
    })
  })

  it('...balance should has 0 ETH after withdraw and throw event (Withdrawal) with amount', async () => {
    let one_eth = web3.utils.toWei('0.1', "ether");
    let tx = await instance.withdraw(one_eth, { from: accounts[1] });
    let balance = await web3.eth.getBalance(instance.address);

    assert.equal(balance, 0);

    let result = await truffleAssert.createTransactionResult(instance, tx.receipt.transactionHash);
    truffleAssert.eventEmitted(result, 'Withdrawal', (event) => {
      return event.amount == one_eth;
    })
  })

});
