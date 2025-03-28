"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bank_1 = __importDefault(require("./Bank"));
const Branch_1 = __importDefault(require("./Branch"));
const Customer_1 = __importDefault(require("./Customer"));
//creating a customer and add it to transaction()
const c1 = new Customer_1.default("moe", 404);
c1.addTransactions(550);
c1.getName();
console.log(c1);
const arizonaBank = new Bank_1.default("Arizona");
const westBranch = new Branch_1.default("West Branch");
const sunBranch = new Branch_1.default("Sun Branch");
const customer1 = new Customer_1.default("John", 1);
const customer2 = new Customer_1.default("Anna", 2);
const customer3 = new Customer_1.default("John", 3);
const customer4 = new Customer_1.default("Moe", 44);
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
const foundCustomer = arizonaBank.searchCustomerById(1);
if (foundCustomer) {
    console.log("Customer found:", foundCustomer.getName());
}
else {
    console.log("Customer not found");
}
