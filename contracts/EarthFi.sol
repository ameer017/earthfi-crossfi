// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EarthFi is ERC721URIStorage {
    address public owner;

    struct ListedProducts {
        uint256 assetId;
        string title;
        string location;
        uint256 weight;
        uint256 amount;
        bool available;
    }

    mapping(uint256 => ListedProducts) private products;
    uint256[] private productIds;

    // create events relating to your functions

    constructor() ERC721("Earthfi", "ETF") {
        owner = payable(msg.sender);
    }

    function generateProductId() internal view returns (uint256) { // remember to increament whenever a product is listed
        return productIds.length + 1;
    }

    
}
