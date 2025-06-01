var BBHS = artifacts.require("BBHS.sol");

module.exports = function(deployer) {
  deployer.deploy(BBHS,   {
    value: web3.utils.toWei("0.1", "ether") // Отправляем 0.1 ETH
  });
};
