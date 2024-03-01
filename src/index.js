var Transaction = /** @class */ (function () {
    function Transaction(amount) {
        this.amount = amount;
        this.date = new Date(); //creates the date automatically
    }
    return Transaction;
}());
//Customer Class
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransaction = function () {
        ///returns transaction array
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (total, transactions) { return total + transactions.amount; }, 0);
        //adding the zero makes it 'start' from zero,, it starts from zero by default but keep this in mind moe, you can add any starting number this way
    };
    Customer.prototype.addTransactions = function (amount) {
        //create a transaction by initializing an object
        var trans = new Transaction(amount);
        var result = this.transactions.push(trans);
        if (result > 0) {
            return true;
        }
        else {
            return false;
        }
        //or simpley use -> return result > 0 ? true : false;
    };
    return Customer;
}());
//creating a customer and add it to transaction()
var c1 = new Customer("moe", 404);
c1.addTransactions(550);
//Branch class
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getBranchName = function (name) {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        //class Customer is the type here
        if (!this.customers.includes(customer)) {
            var result = this.customers.push(customer);
            return result > 0 ? true : false;
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerID, amount) {
        var customer = this.customers.find(function (customer) { return customer.id === customerID; });
        if (customer) {
            customer.addTransactions(amount);
            return true;
        }
        else
            return false;
    };
    return Branch;
}());
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        //the type is Branch class
        // Description: Adds the branch to the branches array. Each branch should only be added once.
        if (!this.branches.includes(branch)) {
            var result = this.branches.push(branch);
            return true;
        }
        else
            return false;
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.branches.includes(branch)) {
            var result = branch.addCustomer(customer);
            if (result) {
                return true;
            }
        }
        return false;
    };
    Bank.prototype.findBranchByName = function (branchName) {
        return this.branches.find(function (branch) { return branch.name === branchName; });
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        var targetBranch = this.findBranchByName(branch.name);
        if (targetBranch) {
            targetBranch.addCustomerTransaction(customerId, amount);
            return true;
        }
        else {
            return false;
        }
    };
    Bank.prototype.checkBranch = function (branch) {
        return this.branches.includes(branch);
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        var branchCustomers = branch.getCustomers();
        var customerList = [];
        // Iterate through customers of the specified branch
        for (var _i = 0, branchCustomers_1 = branchCustomers; _i < branchCustomers_1.length; _i++) {
            var customer = branchCustomers_1[_i];
            var customerInfo = "Name: ".concat(customer.getName(), ", ID: ").concat(customer.getId());
            if (includeTransactions) {
                // Include transactions if specified
                var transactions = customer.getTransaction();
                var transactionAmounts = transactions.map(function (transaction) { return transaction.amount; });
                var totalBalance = transactions.reduce(function (total, transaction) { return total + transaction.amount; }, 0);
                customerInfo += ", Transactions: ".concat(transactionAmounts.join(", "), ", Total Balance: ").concat(totalBalance);
            }
            customerList.push(customerInfo);
        }
        return customerList;
    };
    return Bank;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
// arizonaBank.findBranchByName("bank");
// arizonaBank.findBranchByName("sun");
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
customer1.addTransactions(1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
