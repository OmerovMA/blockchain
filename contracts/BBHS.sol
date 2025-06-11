// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
 
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool);
}
 
 
contract ERC20 is IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner, address indexed spender, uint256 value
    );

    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount)
        external
        returns (bool)
    {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(address to, uint256 amount) internal {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal {
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }

    // function checkBalance() external view returns (uint) {
    //     return balanceOf[msg.sender];
    // }
    
    // function giveRandomGift(address sender, address recipient)
    //     external
    //     returns (bool)
    // {
    //     uint256 amount = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 200;
    //     allowance[sender][msg.sender] -= amount;
    //     balanceOf[sender] -= amount;
    //     balanceOf[recipient] += amount;
    //     emit Transfer(sender, recipient, amount);
    //     return true;
    // }
}

contract BBHS is ERC20 {
    uint constant _initial_supply = 1000000;
    string constant _name = "Blood Bond";
    string constant _symbol = "BBHS";
    uint8 constant _decimals = 0;

    constructor() payable ERC20(_name, _symbol, _decimals)
    {
        _mint(address(this), _initial_supply);
    }
    
        function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "Transfer from zero address");
        require(to != address(0), "Transfer to zero address");
        require(balanceOf[from] >= amount, "Insufficient balance");
        
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
    }

    function sendTokens(address recipient, uint256 amount) external {
    require(balanceOf[address(this)] >= amount, "Not enough tokens in contract");
    _transfer(address(this), recipient, amount); // Перевод без approve
}
}