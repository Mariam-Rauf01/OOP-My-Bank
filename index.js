#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Creadit Money
    deposit(amount) {
        if (amount >= 100) {
            amount -= 1; // $1 fee charged if more then deposit $100 is deposited.
            console.log(chalk.yellow.bold.italic("\n$1 fee charged\n"));
        }
        if (amount <= 0) {
            console.log(chalk.red.bold.italic("\nInvalid Amount\n"));
        }
        this.balance += amount;
        console.log(chalk.green.bold.italic(`\nDeposit of $${amount} successfull. Remaining balnace: $${this.balance}\n`));
    }
    //Debit Money
    withdraw(amount) {
        if (amount <= 0) {
            console.log(chalk.red.bold.italic("Invalid Amount"));
        }
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.green.bold.italic(`\nWithdrawl of $${amount} successfull. Remaining balnace: $${this.balance}\n`));
        }
        else {
            console.log(chalk.red.bold.italic("\nInsufficient Balance\n"));
        }
    }
    //Check Balance
    checkBalance() {
        console.log(chalk.green.bold.italic(`\nYour current balance is: $${this.balance}\n`));
    }
}
//Customer Class
class Customer {
    firstName;
    lastName;
    age;
    gender;
    mobileNumber;
    account;
    constructor(firstName, lastName, age, gender, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//Create Bank Account
const account = [
    new BankAccount(100052024, 1000),
    new BankAccount(100052025, 2000),
    new BankAccount(100052026, 3000),
];
//Create customer
const customers = [
    new Customer("Daniyal", "Inam", 27, "Male", 3323423790, account[0]),
    new Customer("Sheikh", "Hammad", 26, "Male", 3224543210, account[1]),
    new Customer("Syeda", "Fatima", 24, "Female", 3318977064, account[2]),
];
//Bank Functionality
async function services() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number",
        });
        const customer = customers.find((customer) => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(chalk.yellow.bold.italic(`\nWelcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt({
                name: "services",
                type: "list",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
                message: "Select your services",
            });
            switch (ans.services) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit",
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw",
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.yellow.bold.italic("\nExiting bank program...\n"));
                    console.log(chalk.yellow.bold.italic("Thank you for using our bank services. Have a great day!"));
                    process.exit();
            }
        }
        else {
            console.log(chalk.red.bold.italic("Invalid account number. Please try again."));
        }
    } while (true);
}
services();
