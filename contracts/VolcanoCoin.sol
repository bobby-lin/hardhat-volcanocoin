// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VolcanoCoin is ERC20("VolcanoCoin", "VOLC"), Ownable {
    uint256 public totalCoinSupply;

    mapping(address => uint256) public balances;
    mapping(address => Payment[]) payments;

    struct Payment {
        address recipient;
        uint256 amount;
    }

    event supplyChanged(uint256);
    event TransferEvent(address indexed, uint256);

    constructor() {
        totalCoinSupply = 10000;
        balances[msg.sender] = totalCoinSupply;
    }

    function updateTotalSupply() public onlyOwner {
        totalCoinSupply = totalCoinSupply + 1000;
        emit supplyChanged(totalCoinSupply);
    }

    function transferValue(address _recipient, uint256 _amount) public  {
        require(balances[msg.sender] >= _amount, "Insufficient Balance");
        balances[msg.sender] -= _amount;
        balances[_recipient] += _amount;
        payments[msg.sender].push(
            Payment({recipient: _recipient, amount: _amount})
        );
        emit TransferEvent(_recipient, _amount);
    }

    function getPayments(address _user) public view returns (Payment[] memory) {
        return payments[_user];
    }
}
