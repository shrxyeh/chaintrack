// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../contracts/SupplyChain.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();
        SupplyChain supplyChain = new SupplyChain();
        vm.stopBroadcast();

        console.log("SupplyChain deployed to:", address(supplyChain));
    }
}
