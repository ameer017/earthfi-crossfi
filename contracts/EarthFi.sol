// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EarthFi {
    address public owner;
    address earthfiToken;
    bool private locked;

    struct ListedProducts {
        uint256 assetId;
        string title;
        string location;
        uint256 weight;
        uint256 amount;
        address seller;
        bool available;
    }
    ListedProducts[] public products;
    uint256[] private productIds;

    struct AssetTransaction {
        uint256 timestamp;
        uint256 amount;
        address buyer;
        address seller;
        uint256 assetId;
    }

    mapping(address => AssetTransaction[]) public userTransactions;
    mapping(uint256 => AssetTransaction[]) public assetTransactions;

    // create events relating to your functions
    event AssetListed(string indexed title, string location, uint256 amount);
    event AssetBought(address indexed buyer, string title, uint256 amount);

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
        ListedProducts memory listedProduct;

        listedProduct.assetId = assetId;
        listedProduct.title = _title;
        listedProduct.location = _location;
        listedProduct.weight = _weight;
        listedProduct.amount = _amount;
        listedProduct.seller = msg.sender;
        listedProduct.available = true;

        products.push(listedProduct);

        productIds.push(assetId);

        AssetTransaction memory assetTransaction;
        assetTransaction.timestamp = block.timestamp;
        assetTransaction.amount = _amount;
        assetTransaction.buyer = address(0);
        assetTransaction.seller = msg.sender;
        assetTransaction.assetId = assetId;

        assetTransactions[assetId].push(assetTransaction);

        userTransactions[msg.sender].push(assetTransaction);

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

    function buyAsset(
        uint256 _index,
        uint256 _amount
    ) public noReentrancy returns (bool) {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProducts memory singleProduct = products[_index];
        require(
            singleProduct.available == true,
            "Product not available for sale"
        );

        uint256 userBal = IERC20(earthfiToken).balanceOf(msg.sender);

        require(userBal >= _amount, "Your balance is not enough");

        require(
            IERC20(earthfiToken).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "Transfer failed"
        );

        singleProduct.available = false;

        products[_index] = singleProduct;

        AssetTransaction memory assetTransaction;
        assetTransaction.timestamp = block.timestamp;
        assetTransaction.amount = _amount;
        assetTransaction.buyer = msg.sender;
        assetTransaction.seller = singleProduct.seller;
        assetTransaction.assetId = singleProduct.assetId;

        assetTransactions[singleProduct.assetId].push(assetTransaction);

        userTransactions[msg.sender].push(assetTransaction);
        userTransactions[singleProduct.seller].push(assetTransaction);

        emit AssetBought(msg.sender, singleProduct.title, _amount);
        
        return true;
    }
}