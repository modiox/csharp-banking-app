"use strict";
class Transaction {
    constructor(amount) {
        this.amount = amount;
        this.date = new Date(); //creates the date automatically
    }
}
//Customer Class
class Customer {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    // Validation check for required name field
    static validateName(name) {
        return !!name; // (!!) Checks if name is not empty
    }
    // Validation check for positive id
    static validateId(id) {
        return id > 0;
    }
    //Customer Validation ends here
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getTransaction() {
        ///returns transaction array
        return this.transactions;
    }
    getBalance() {
        return this.transactions.reduce((total, transactions) => total + transactions.amount, 0);
        // it starts from zero by default but keep this in mind moe, you can add any starting number this way
    }
    addTransactions(amount) {
        //create a transaction by initializing an object
        const trans = new Transaction(amount);
        const result = this.transactions.push(trans);
        if (result > 0) {
            //validation checks here for the amount to be non-negative
            return true;
        }
        else if (result < 0) {
            return false;
            throw new Error("Amount must be non-negative");
        } //or simpley use -> return result > 0 ? true : false;
    }
}
//Branch class
class Branch {
    constructor(name) {
        this.name = name;
        this.customers = [];
    }
    getBranchName(name) {
        return this.name;
    }
    getCustomers() {
        return this.customers;
    }
    addCustomer(customer) {
        //class Customer is the type here
        if (!this.customers.includes(customer)) {
            const result = this.customers.push(customer);
            return result > 0 ? true : false;
        }
        // Validation check for existing customer
        if (this.customers.includes(customer)) {
            throw new Error("Customer already exists");
        }
    }
    addCustomerTransaction(customerID, amount) {
        const customer = this.customers.find((customer) => customer.id === customerID);
        if (!customer) {
            throw new Error("Customer not found");
        }
        // Add transaction
        customer.addTransactions(amount);
    }
}
class Bank {
    constructor(name) {
        this.name = name;
        this.branches = [];
    }
    addBranch(branch) {
        //the type is Branch class
        // Description: Adds the branch to the branches array. Each branch should only be added once.
        if (!this.branches.includes(branch)) {
            const result = this.branches.push(branch);
            return true;
        }
        else
            return false;
        throw new Error("Branch already exists");
    }
    addCustomer(branch, customer) {
        if (this.branches.includes(branch)) {
            const result = branch.addCustomer(customer);
            if (result) {
                return true;
            }
        }
        return false;
        throw new Error("Branch not found"); //if its not included in branch return this error
    }
    findBranchByName(branchName) {
        return this.branches.find((branch) => branch.name === branchName);
    }
    addCustomerTransaction(branch, customerId, amount) {
        const targetBranch = this.findBranchByName(branch.name);
        if (targetBranch) {
            targetBranch.addCustomerTransaction(customerId, amount);
            return true;
        }
        else {
            return false;
        }
    }
    checkBranch(branch) {
        return this.branches.includes(branch);
    }
    listCustomers(branch, includeTransactions) {
        const branchCustomers = branch.getCustomers();
        const customerList = [];
        // Iterate through customers of the specified branch
        for (const customer of branchCustomers) {
            let customerInfo = `Name: ${customer.getName()}, ID: ${customer.getId()}`;
            if (includeTransactions) {
                // Include transactions if specified
                const transactions = customer.getTransaction();
                const transactionAmounts = transactions.map((transaction) => transaction.amount);
                const totalBalance = transactions.reduce((total, transaction) => total + transaction.amount, 0);
                customerInfo += `, Transactions: ${transactionAmounts.join(", ")}, Total Balance: ${totalBalance}`;
            }
            customerList.push(customerInfo);
        }
        return customerList;
    }
}
//creating a customer and add it to transaction()
const c1 = new Customer("Chris", 456);
c1.addTransactions(550);
c1.getName();
console.log(c1);
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);
const customer4 = new Customer("Moe", 44);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomer(westBranch, customer4);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(sunBranch, customer2.getId(), 3000);
customer1.addTransactions(1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
console.log(arizonaBank);
console.log(customer1);
console.log(sunBranch);
console.log(westBranch);
console.log(customer4);
console.log(c1);
