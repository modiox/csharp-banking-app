import Bank from "./Bank";
import Branch from "./Branch";
import Customer from "./Customer";
import Transaction from "./Transaction";
//creating a customer and add it to transaction()
const c1 = new Customer("moe", 404);
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


const foundCustomer = arizonaBank.searchCustomerById(1);
if (foundCustomer) {
  console.log("Customer found:", foundCustomer.getName());
} else {
  console.log("Customer not found");
}
