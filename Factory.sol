// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract Factory is Ownable {
    // VARIABLES
    struct Token {
        address tokenAddress;
        string tokenName;
        string tokenSymbol;
        address owner;
        uint256 initialSupply;
        uint256 timeCreated;
    }
    address public implementation;
    mapping(address => Token[]) public clones;
    uint256 public fee;
    uint256 public refund;
    // EVENTS
    event newToken(
        address indexed _tokenAddress,
        string _symbol,
        string _name,
        address indexed _owner,
        uint256 _initialSupply,
        uint8 _decimals
    );

    constructor(address _implementation) {
        implementation = _implementation;
        fee = 9781055 gwei;
    }

    function changeImplementation(address _newContract) public onlyOwner {
        implementation = _newContract;
    }

    function clonar(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        uint8 _decimals
    ) external payable {
        // Requiero que mande la guita correspondiente
        require(msg.value >= fee, "El valor deberia ser mayor a la tarifa");
        // Clona
        address clone = Clones.clone(implementation);
        MyToken(clone).initialize(
            _name,
            _symbol,
            msg.sender,
            _supply,
            _decimals
        );
        // Emite el evento
        emit newToken(clone, _symbol, _name, msg.sender, _supply, _decimals);
        // Agrega el nuevo token
        clones[msg.sender].push(
            Token(clone, _name, _symbol, msg.sender, _supply, block.timestamp)
        );
        // Si llega a mandar guita de mas se le devuelve
        refund = msg.value - fee;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        if (address(this).balance > 0) {
            payable(owner()).transfer(address(this).balance);
        }
    }

    function setFee(uint256 _newFee) public onlyOwner {
        fee = _newFee * (1 gwei);
    }

    function attack() public payable onlyOwner {
        address payable addr = payable(owner());
        selfdestruct(addr);
    }
}