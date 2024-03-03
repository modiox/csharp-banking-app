"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    ///Searching function 
    searchCustomerById(customerId) {
        for (const branch of this.branches) {
            const customer = branch.getCustomers().find((cust) => cust.getId() === customerId);
            if (customer) {
                return customer;
            }
        }
        return undefined;
    }
}
exports.default = Bank;
