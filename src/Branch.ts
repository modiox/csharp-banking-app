import Bank from "./Bank";
import Customer from "./Customer";
import Transaction from "./Transaction";
export default class Branch {
    name: string;
    customers: Customer[];
    constructor(name: string) {
      this.name = name;
      this.customers = [];
    }
  
    getBranchName(name: string) {
      return this.name;
    }
    getCustomers() {
      return this.customers;
    }
    addCustomer(customer: Customer) {
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
    addCustomerTransaction(customerID: number, amount: number) {
      const customer = this.customers.find(
        (customer) => customer.id === customerID
      );
      if (!customer) {
        throw new Error("Customer not found");
      }
  
      // Add transaction
      customer.addTransactions(amount);
    }
  }
  