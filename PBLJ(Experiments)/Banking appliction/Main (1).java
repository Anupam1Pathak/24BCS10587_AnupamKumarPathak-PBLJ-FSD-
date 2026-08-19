

 class BankAccount {
    private String accountNumber;
    private double balance;

    public BankAccount(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public void setBalance(double amount) {
        if (amount > 0) {
            balance = amount;
        }
    }

    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
        }
    }
   
    public void displayAccountInfo() {
        System.out.println("Account Number: " + accountNumber);
        System.out.println("Balance: " + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("12345", 1000);

        account.displayAccountInfo();

        account.deposit(500);
        System.out.println("After deposit: " + account.getBalance());

        account.withdraw(300);
        System.out.println("After withdrawal: " + account.getBalance());

        account.setBalance(2000);
        System.out.println("After setting balance: " + account.getBalance());
    }
}
