package yabomu.trip.shared;

public enum TransactionCodes {
    CM00001_I("TL00001_I", "保存しました。"),
    CM00001_E("TL00001_E", "保存できませんでした。");

    String code;
    String message;

    TransactionCodes(String code, String message){
        this.code = code;
        this.message = message;
    }

    public String code(){
        return this.code;
    }
    public String message(){
        return this.message;
    }

}
