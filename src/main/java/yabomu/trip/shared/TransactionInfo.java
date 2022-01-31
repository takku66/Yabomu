package yabomu.trip.shared;


import lombok.Data;

@Data
public class TransactionInfo {
    private String code;
    private int count;
    private String message;
    private boolean isError = false;
}
