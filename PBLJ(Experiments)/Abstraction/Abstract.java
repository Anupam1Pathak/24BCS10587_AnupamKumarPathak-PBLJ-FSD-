abstract class Bank {
    private int balance = 1000;

    public int getBalance() {
        return balance;
    }

    public void setBalance(int val) {
        balance = val;
    }
}

class Sbi extends Bank {
    public void debit(int bal) {
        int currVal = getBalance();
        currVal -= bal;
        setBalance(currVal);
        System.out.println("After debit of " + bal + ": " + getBalance());
    }

    public void credit(int bal) {
        int currVal = getBalance();
        currVal += bal;
        setBalance(currVal);
        System.out.println("After credit of " + bal + ": " + getBalance());
    }
}

public class Abstract {
    public static void main(String[] args) {
        Sbi account = new Sbi();
        System.out.println("Initial balance: " + account.getBalance());
        account.debit(200);
        account.credit(500);
        System.out.println("Final balance: " + account.getBalance());
    }
}
