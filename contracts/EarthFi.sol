// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EarthFi is ERC721URIStorage {
    address public owner;

    struct ListedProduct {
        uint256 assetId;
        string title;
        string location;
        uint256 weight;
        uint256 amount;
        bool available;
    }

    struct Transaction {
        uint256 assetId;
        uint256 price;
        address seller;
        address buyer;
        uint256 timestamp;
        bool sold;
    }

    mapping(uint256 => ListedProduct) private products;

    mapping(address => Transaction[]) private userTransactions;

    uint256[] private productIds;

    // event ProductListed(uint256 assetId, string title, uint256 price);
    // event ProductSold(uint256 assetId, address buyer, uint256 price, uint256 timestamp);

    constructor() ERC721("Earthfi", "ETF") {
        owner = msg.sender;
    }

    function generateProductId() internal view returns (uint256) {
        return productIds.length + 1;
    }

    // List a product
    // function listProduct(
    //     uint256 assetId,
    //     string memory title,
    //     string memory location, 
    //     uint256 weight,
    //     uint256 amount
    // ) public {
    //     require(msg.sender == owner, "Only owner can list products");

    //     products[assetId] = ListedProduct({
    //         assetId: assetId,
    //         title: title,
    //         location: location,
    //         weight: weight,
    //         amount: amount,
    //         available: true
    //     });
    //     productIds.push(assetId);

    //     emit ProductListed(assetId, title, amount);
    // }

    // Buy a product
//   function buyProduct(uint256 assetId) public payable {
//     ListedProduct storage product = products[assetId];
//     require(product.available, "Product not available");
//     require(msg.value == product.amount, "Incorrect payment amount");

//     // Mark product as unavailable before making the payment to prevent reentrancy
//     product.available = false;

//     // Record the transaction in user's history
//     Transaction memory newTransaction = Transaction({
//         assetId: assetId,
//         price: msg.value,
//         seller: owner,
//         buyer: msg.sender,
//         timestamp: block.timestamp,
//         sold: true
//     });
//     userTransactions[msg.sender].push(newTransaction);  
//     userTransactions[owner].push(newTransaction);       

//     // Emit event before handling payment to avoid reentrancy issues
//     emit ProductSold(assetId, msg.sender, msg.value, block.timestamp);

//     // Transfer payment to the owner
//     (bool sent, ) = owner.call{value: product.amount}("");
//     require(sent, "Payment transfer to owner failed");
// }


    // Retrieve user's transaction history
    function getUserAssetsHistory() public view returns (Transaction[] memory) {
        return userTransactions[msg.sender];
    }
}
