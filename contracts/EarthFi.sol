// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

contract EarthFi {
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

    constructor() {
        owner = msg.sender;
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

    function viewAssetDetails(
        uint256 _index
    )
        external
        view
        returns (
            string memory title_,
            string memory location_,
            uint256 weight_,
            uint256 amount_,
            bool available_
        )
    {
        require(msg.sender != address(0), "Zero address not allowed!");
        require(_index < products.length, "Out of bound!");

        ListedProducts memory singleProduct = products[_index];

        title_ = singleProduct.title;
        location_ = singleProduct.location;
        weight_ = singleProduct.weight;
        amount_ = singleProduct.amount;
        available_ = singleProduct.available;
    }

    function getAllProducts() external view returns (ListedProducts[] memory) {
        return products;
    }
}
