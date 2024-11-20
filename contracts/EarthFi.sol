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
        string[] fileUrls;
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
    mapping(address => mapping(uint256 => bool)) public withdrawalStatus;

    event AssetListed(string indexed title, string location, uint256 amount);
    event AssetBought(address indexed buyer, string title, uint256 amount);
    event AssetReceived(address indexed seller, string title, uint256 amount);
    event AssetPurchaseCancelled(
        address indexed user,
        uint256 assetId,
        uint256 amount
    );

    constructor(address _tokenAddress) {
        owner = msg.sender;
        earthfiToken = _tokenAddress;
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
        uint256 _amount,
        string[] memory _fileUrls
    ) external noReentrancy {
        require(msg.sender != address(0), "Zero address is not allowed");

        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(_weight > 0, "Weight must be greater than zero");
        require(_amount > 0, "Amount must be greater than zero");
        require(_fileUrls.length > 0, "At least one file must be uploaded");

        uint256 assetId = generateProductId();
        ListedProducts memory listedProduct;

        listedProduct.assetId = assetId;
        listedProduct.title = _title;
        listedProduct.location = _location;
        listedProduct.weight = _weight;
        listedProduct.amount = _amount;
        listedProduct.seller = msg.sender;
        listedProduct.available = true;
        listedProduct.fileUrls = _fileUrls;

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

    function viewAssetDetail(
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

    function buyAsset(uint256 _index) public noReentrancy returns (bool) {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProducts memory singleProduct = products[_index];
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

        products[_index] = singleProduct;

        AssetTransaction memory assetTransaction;
        assetTransaction.timestamp = block.timestamp;
        assetTransaction.amount = singleProduct.amount;
        assetTransaction.buyer = msg.sender;
        assetTransaction.seller = singleProduct.seller;
        assetTransaction.assetId = singleProduct.assetId;

        assetTransactions[singleProduct.assetId].push(assetTransaction);

        userTransactions[msg.sender].push(assetTransaction);
        userTransactions[singleProduct.seller].push(assetTransaction);

        emit AssetBought(msg.sender, singleProduct.title, singleProduct.amount);

        return true;
    }

    function confirmReceipt(uint256 _index) public noReentrancy returns (bool) {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProducts memory singleProduct = products[_index];
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

        products[_index] = singleProduct;

        withdrawalStatus[singleProduct.seller][singleProduct.assetId] = true;

        emit AssetReceived(
            singleProduct.seller,
            singleProduct.title,
            amountToTransfer
        );

        return true;
    }

    function getUserAllTransactions(
        // return an array of AssetTransaction structs for a given user, which includes both buy and sell transactions
        address _user
    ) public view returns (AssetTransaction[] memory) {
        return userTransactions[_user];
    }

    function getAssetTransactions(
        // returns an array of transactions for a specific asset ID
        uint256 _assetId
    ) public view returns (AssetTransaction[] memory) {
        return assetTransactions[_assetId];
    }

    function getUserBuyTransactions(
        // returns all buy txn of a user
        address _buyer
    ) public view returns (AssetTransaction[] memory) {
        AssetTransaction[] memory transactions = userTransactions[_buyer];
        AssetTransaction[] memory buyTransactions = new AssetTransaction[](
            transactions.length
        );
        uint256 index = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].buyer == _buyer) {
                buyTransactions[index++] = transactions[i];
            }
        }
        AssetTransaction[] memory result = new AssetTransaction[](index);
        for (uint256 i = 0; i < index; i++) {
            result[i] = buyTransactions[i];
        }
        return result;
    }

    function getUserSellTransactions(
        // returns all sell txn of a user
        address _seller
    ) public view returns (AssetTransaction[] memory) {
        AssetTransaction[] memory transactions = userTransactions[_seller];
        AssetTransaction[] memory sellTransactions = new AssetTransaction[](
            transactions.length
        );
        uint256 index = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].seller == _seller) {
                sellTransactions[index++] = transactions[i];
            }
        }
        AssetTransaction[] memory result = new AssetTransaction[](index);
        for (uint256 i = 0; i < index; i++) {
            result[i] = sellTransactions[i];
        }
        return result;
    }

    function generateSellBalance() public view returns (uint256) {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < userTransactions[msg.sender].length; i++) {
            if (userTransactions[msg.sender][i].seller == msg.sender) {
                totalAmount += userTransactions[msg.sender][i].amount;
            }
        }
        return totalAmount;
    }

    function generateBuyBalance() public view returns (uint256) {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < userTransactions[msg.sender].length; i++) {
            if (userTransactions[msg.sender][i].buyer == msg.sender) {
                totalAmount += userTransactions[msg.sender][i].amount;
            }
        }
        return totalAmount;
    }

    function cancelPurchase(uint256 _index) public noReentrancy {
        require(msg.sender != address(0), "Zero address not allowed!");

        ListedProducts memory singleProduct = products[_index];

        require(
            singleProduct.available == false,
            "Product is still available, cannot cancel purchase"
        );

        require(
            userTransactions[msg.sender].length > 0,
            "No transactions found for this user"
        );

        AssetTransaction[] storage transactions = assetTransactions[
            singleProduct.assetId
        ];
        bool found = false;
        uint256 transactionIndex = 0;

        for (uint256 i = 0; i < transactions.length; i++) {
            if (
                transactions[i].buyer == msg.sender &&
                transactions[i].assetId == singleProduct.assetId
            ) {
                found = true;
                transactionIndex = i;
                break;
            }
        }

        require(found, "No matching transaction found");

        singleProduct.available = true;
        products[_index] = singleProduct;

        require(
            IERC20(earthfiToken).transfer(msg.sender, singleProduct.amount),
            "Refund failed"
        );

        emit AssetPurchaseCancelled(
            msg.sender,
            singleProduct.assetId,
            singleProduct.amount
        );
    }
}
