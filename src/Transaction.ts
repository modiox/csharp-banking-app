export default class Transaction {
    amount: number;
    date: Date;
    constructor(amount: number) {
      this.amount = amount;
      this.date = new Date(); //creates the date automatically
    }
  }