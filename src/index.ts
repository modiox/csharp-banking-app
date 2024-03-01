class Transaction {
  amount: number;
  date: Date;
  constructor(amount: number) {
    this.amount = amount;
    this.date = new Date(); //creates the date automatically
  }
}

//Customer Class

class Customer {
  name: string;
  id: number;
  transactions: Transaction[];
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
    this.transactions = [];
  }

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
      return true;
    } else {
      return false;
    }
    //or simpley use -> return result > 0 ? true : false;
  }
}

//creating a customer and add it to transaction()
const c1 = new Customer("moe", 404);
c1.addTransactions(550);

//Branch class

class Branch {
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
  }
  addCustomerTransaction(customerID: number, amount: number) {
    const customer = this.customers.find(
      (customer) => customer.id === customerID
    );
    if (customer) {
      customer.addTransactions(amount);
      return true;
    } else return false;
  }
}

class Bank {
  name: string;
  branches: Branch[];
  constructor(name: string) {
    this.name = name;
    this.branches = [];
  }

  addBranch(branch: Branch): boolean {
    //the type is Branch class
    // Description: Adds the branch to the branches array. Each branch should only be added once.
    if (!this.branches.includes(branch)) {
      const result = this.branches.push(branch);
      return true;
    } else return false;
  }

  addCustomer(branch: Branch, customer: Customer): boolean {
    if (this.branches.includes(branch)) {
      const result = branch.addCustomer(customer);
      if (result) {
        return true;
      }
    }
    return false;
  }

  findBranchByName(branchName: string) {
    return this.branches.find((branch) => branch.name === branchName);
  }

  addCustomerTransaction(branch: Branch, customerId: number, amount: number) {
    const targetBranch = this.findBranchByName(branch.name);
    if (targetBranch) {
      targetBranch.addCustomerTransaction(customerId, amount);
      return true;
    } else {
      return false;
    }
  }

  checkBranch(branch: Branch) {
    return this.branches.includes(branch);
  }

  listCustomers(branch: Branch, includeTransactions: boolean): string[] {
    const branchCustomers = branch.getCustomers();
    const customerList: string[] = [];
    // Iterate through customers of the specified branch
    for (const customer of branchCustomers) {
      let customerInfo = `Name: ${customer.getName()}, ID: ${customer.getId()}`;

      if (includeTransactions) {
        // Include transactions if specified
        const transactions = customer.getTransaction();
        const transactionAmounts = transactions.map(
          (transaction) => transaction.amount
        );
        const totalBalance = transactions.reduce(
          (total, transaction) => total + transaction.amount,
          0
        );
        customerInfo += `, Transactions: ${transactionAmounts.join(
          ", "
        )}, Total Balance: ${totalBalance}`;
      }

      customerList.push(customerInfo);
    }

    return customerList;
  }
}

const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branch");
const sunBranch = new Branch("Sun Branch");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("John", 3);

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
