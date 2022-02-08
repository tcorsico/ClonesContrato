// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MyToken is Initializable, ERC20Upgradeable, AccessControlUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory _name, string memory _symbol, address owner, uint _supply) initializer public {
        __ERC20_init(_name, _symbol);
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _mint(owner, _supply);

        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(MINTER_ROLE, owner);
        _grantRole(UPGRADER_ROLE, owner);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyRole(UPGRADER_ROLE)
        override
    {}
}


contract Factory is Ownable {
    address public contratoAClonar;
    mapping (address => address) public clones;
    uint public immutable tarifa; 
    uint public refund;
    event enviado(uint _totalEnviado, address _receiver);
    event nuevoContrato(address indexed _nuevoToken, string _symbol, string _name, address indexed _owner);  


    constructor (address _implementation) {
        contratoAClonar = _implementation;
        tarifa = 9781055 gwei;
    }

    function cambiarContratoAClonar(address _nuevoContrato) public view onlyOwner{
        _nuevoContrato = contratoAClonar;
    }

    function clonar(string memory _name, string memory _symbol, uint _supply) payable external {
        require(msg.value >= tarifa, "El valor deberia ser mayor a la tarifa");
        address clone = Clones.clone(contratoAClonar);
        clones[msg.sender] = clone;
        MyToken(clone).initialize(_name, _symbol, msg.sender, _supply);
        emit nuevoContrato(clone, _symbol, _name, msg.sender);
        refund = msg.value - tarifa;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
            emit enviado(refund, msg.sender);
        }
        if (address(this).balance > 0) {
            emit enviado(address(this).balance, msg.sender);
            payable(owner()).transfer(address(this).balance);
            emit enviado(address(this).balance, msg.sender);
        }
    }


    function attack() public payable onlyOwner{
        // You can simply break the game by sending ether so that
        // the game balance >= 7 ether

        // cast address to payable
        address payable addr = payable(owner());
        selfdestruct(addr);
    }
}
