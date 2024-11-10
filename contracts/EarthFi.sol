// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract EarthFi is ERC721URIStorage {
    address public owner;

    bool private locked;

    struct ListedProducts {
        uint256 assetId;
        string title;
        string location;
        uint256 weight;
        uint256 amount;
        bool available;
    }

    ListedProducts[] public products;
    uint256[] private productIds;

    // create events relating to your functions
    event AssetListed(string indexed title, string location, uint256 amount);

    constructor() ERC721("EarthFi", "ETF") {
        owner = payable(msg.sender);
    }

    function generateProductId() internal view returns (uint256) {
        // remember to increament whenever a product is listed
        return productIds.length + 1;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrancy attack detected");
        locked = true;
        _;
        locked = false;
    }

    function listAsset(
        string memory _title,
        string memory _location,
        uint256 _weight,
        uint256 _amount
    ) external noReentrancy {
        require(msg.sender != address(0), "Zero address is not allowed");

        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_weight > 0, "Weight must be greater than zero");
        require(_amount > 0, "Amount must be greater than zero");

        uint256 assetId = generateProductId();
        ListedProducts memory listedProducts;

        listedProducts.assetId = assetId;
        listedProducts.title = _title;
        listedProducts.location = _location;
        listedProducts.weight = _weight;
        listedProducts.amount = _amount;
        listedProducts.available = true;

        products.push(listedProducts);

        productIds.push(assetId);

        emit AssetListed(_title, _location, _amount);
    }
}
