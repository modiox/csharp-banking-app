import Transaction  from "./Transaction";
export default class Customer {
    name: string;
    id: number;
    transactions: Transaction[];
    constructor(name: string, id: number) {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }
  
    // Validation check for required name field
    static validateName(name: string): boolean {
      return !!name; // (!!) Checks if name is not empty
    }
  
    // Validation check for positive id
    static validateId(id: number): boolean {
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
      return this.transactions.reduce(
        (total, transactions) => total + transactions.amount,
        0
      );
      // it starts from zero by default but keep this in mind moe, you can add any starting number this way
    }
    addTransactions(amount: number) {
      //create a transaction by initializing an object
  
      const trans = new Transaction(amount);
      const result = this.transactions.push(trans);
      if (result > 0) {
        //validation checks here for the amount to be non-negative
        return true;
      } else if (result < 0) {
        return false;
        throw new Error("Amount must be non-negative");
      } //or simpley use -> return result > 0 ? true : false;
    }
  }