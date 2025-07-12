// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum Status { Created, InTransit, Delivered }

    struct StatusEvent {
        Status status;
        uint256 timestamp;
    }

    struct Product {
        uint256 id;
        string name;
        string origin;
        uint256 createdAt;
        Status currentStatus;
        StatusEvent[] history;
    }

    mapping(uint256 => Product) public products;
    uint256 public nextId;

    event ProductCreated(uint256 indexed id, string name, uint256 timestamp);
    event StatusUpdated(uint256 indexed id, Status status, uint256 timestamp);

    function createProduct(string calldata name, string calldata origin) external {
        Product storage p = products[nextId];
        p.id = nextId;
        p.name = name;
        p.origin = origin;
        p.createdAt = block.timestamp;
        p.currentStatus = Status.Created;
        p.history.push(StatusEvent(Status.Created, block.timestamp));

        emit ProductCreated(nextId, name, block.timestamp);
        nextId++;
    }

    function updateStatus(uint256 id, Status status) external {
        require(id < nextId, "Invalid product id");
        Product storage p = products[id];
        p.currentStatus = status;
        p.history.push(StatusEvent(status, block.timestamp));
        emit StatusUpdated(id, status, block.timestamp);
    }

    // Getter for history arrays
    function getHistory(uint256 id) external view returns (Status[] memory, uint256[] memory) {
        Product storage p = products[id];
        uint len = p.history.length;
        Status[] memory statuses = new Status[](len);
        uint256[] memory times = new uint256[](len);
        for (uint i = 0; i < len; i++) {
            statuses[i] = p.history[i].status;
            times[i] = p.history[i].timestamp;
        }
        return (statuses, times);
    }
}
