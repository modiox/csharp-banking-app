"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("./Transaction"));
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
        const trans = new Transaction_1.default(amount);
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
exports.default = Customer;
