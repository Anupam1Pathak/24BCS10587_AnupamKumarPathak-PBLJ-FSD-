import java.io.Closeable;


class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String str) {
        super(str);
    }
}


class InvalidAmountException extends RuntimeException {
    public InvalidAmountException(String str) {
        super(str);
    }
}

class AuditLogger implements Closeable {
    public AuditLogger() {
        System.out.println("[LOG] Opening Audit Logger...");
    }

    public void logTransaction(String details) {
        System.out.println("[LOG] " + details);
    }

    @Override
    public void close() {
        System.out.println("[LOG] Closing Audit Logger...");
    }
}

class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void debit(double amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new InvalidAmountException("Amount must be positive!");
        }
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds for debit!");
        }
        balance -= amount;
        System.out.println(accountHolder + " debited: " + amount + " | New Balance: " + balance);
    }

    public void credit(double amount) {
        if (amount <= 0) {
            throw new InvalidAmountException("Amount must be positive!");
        }
        balance += amount;
        System.out.println(accountHolder + " credited: " + amount + " | New Balance: " + balance);
    }

    public void transfer(BankAccount target, double amount) {
        try (AuditLogger logger = new AuditLogger()) {
            logger.logTransaction("Initiating transfer of " + amount + " from " + accountHolder + " to " + target.accountHolder);
            debit(amount);
            target.credit(amount);
            logger.logTransaction("Transfer successful!");
        } catch (InsufficientFundsException e) {
            System.out.println("[ERROR] " + e.getMessage());
        } catch (InvalidAmountException e) {
            System.out.println("[ERROR] " + e.getMessage());
        }
    }
}


public class Main {
    public static void main(String[] args) {
        BankAccount acc1 = new BankAccount("Anupam", 1000);
        BankAccount acc2 = new BankAccount("Rohit", 500);

        System.out.println("Initial Balances:");
        System.out.println(acc1.getBalance());
        System.out.println(acc2.getBalance());
}
}
