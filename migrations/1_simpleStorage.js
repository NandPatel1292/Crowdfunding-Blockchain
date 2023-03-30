var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(depolyer){
    depolyer.deploy(SimpleStorage);
}