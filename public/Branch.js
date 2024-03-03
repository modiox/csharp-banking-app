"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Branch;
