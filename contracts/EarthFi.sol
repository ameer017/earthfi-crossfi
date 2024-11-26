// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EarthFi {
    address public owner;
    address public constant earthfiToken =
        0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;
    bool private locked;

    uint256 private nextProductId = 1;

    struct ListedProduct {
        uint256 id;
        string title;
        string location;
        uint256 weight;
        uint256 amount;
        address seller;
        bool available;
        string fileUrl;
    }

    struct AssetTransaction {
        uint256 timestamp;
        uint256 amount;
        address buyer;
        address seller;
    }

    ListedProduct[] public products;

    mapping(address => AssetTransaction[]) public userTransactions;
    mapping(uint256 => AssetTransaction[]) public assetTransactions;

    event AssetListed(string indexed title, string location, uint256 amount);
    event AssetBought(address indexed buyer, string title, uint256 amount);
    event AssetReceived(address indexed seller, string title, uint256 amount);
    event AssetPurchaseCancelled(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
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
        uint256 _amount,
        string memory _fileUrl
    ) external noReentrancy {
        require(msg.sender != address(0), "Zero address is not allowed");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_weight > 0, "Weight must be greater than zero");
        require(_amount > 0, "Amount must be greater than zero");
        require(bytes(_fileUrl).length > 0, "File URL is required");

        uint256 productId = nextProductId++;

        products.push(
            ListedProduct({
                id: productId,
                title: _title,
                location: _location,
                weight: _weight,
                amount: _amount,
                seller: msg.sender,
                available: true,
                fileUrl: _fileUrl
            })
        );

        assetTransactions[productId].push(
            AssetTransaction({
                timestamp: block.timestamp,
                amount: _amount,
                buyer: address(0),
                seller: msg.sender
            })
        );

        userTransactions[msg.sender].push(
            AssetTransaction({
                timestamp: block.timestamp,
                amount: _amount,
                buyer: address(0),
                seller: msg.sender
            })
        );

        emit AssetListed(_title, _location, _amount);
    }

    function viewAssetDetail(
        uint256 _id
    )
        external
        view
        returns (
            uint256 id_,
            string memory title_,
            string memory location_,
            uint256 weight_,
            uint256 amount_,
            bool available_,
            string memory fileUrl
        )
    {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProduct memory product;
        bool found = false;

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                product = products[i];
                found = true;
                break;
            }
        }

        require(found, "Asset does not exist");

        return (
            product.id,
            product.title,
            product.location,
            product.weight,
            product.amount,
            product.available,
            product.fileUrl
        );
    }

    function getAllProducts() external view returns (ListedProduct[] memory) {
        return products;
    }

    function buyAsset(uint256 _id) public noReentrancy returns (bool) {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProduct memory singleProduct;
        uint256 assetIndex;
        bool found = false;

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                singleProduct = products[i];
                assetIndex = i;
                found = true;
                break;
            }
        }

        require(found, "Product not found");
        require(
            singleProduct.available == true,
            "Product not available for sale"
        );

        uint256 userBal = IERC20(earthfiToken).balanceOf(msg.sender);
        require(userBal >= singleProduct.amount, "Your balance is not enough");

        require(
            IERC20(earthfiToken).transferFrom(
                msg.sender,
                address(this),
                singleProduct.amount
            ),
            "Transfer failed"
        );

        singleProduct.available = false;
        products[assetIndex] = singleProduct;

        AssetTransaction memory assetTransaction = AssetTransaction({
            timestamp: block.timestamp,
            amount: singleProduct.amount,
            buyer: msg.sender,
            seller: singleProduct.seller
        });

        assetTransactions[_id].push(assetTransaction);

        userTransactions[msg.sender].push(assetTransaction);
        userTransactions[singleProduct.seller].push(assetTransaction);

        emit AssetBought(msg.sender, singleProduct.title, singleProduct.amount);

        return true;
    }

    function confirmReceipt(uint256 _id) public noReentrancy returns (bool) {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProduct memory singleProduct;
        uint256 assetIndex;
        bool found = false;

        for (uint256 i = 0; i < products.length; i++) {
            if (products[i].id == _id) {
                singleProduct = products[i];
                assetIndex = i;
                found = true;
                break;
            }
        }

        require(found, "Product not found");
        require(
            singleProduct.available == false,
            "Product is still available for sale"
        );

        uint256 amountToTransfer = singleProduct.amount;
        require(
            IERC20(earthfiToken).transfer(
                singleProduct.seller,
                amountToTransfer
            ),
            "Transfer failed"
        );

        emit AssetReceived(
            singleProduct.seller,
            singleProduct.title,
            amountToTransfer
        );

        return true;
    }

    function getUserAllTransactions(
        address _user
    ) public view returns (AssetTransaction[] memory) {
        return userTransactions[_user];
    }
}
