package yabomu.trip.shared;

import java.text.MessageFormat;

public enum YbmMessages {
    CM00001_I("CM00001_I", "保存しました。"),
    CM00002_I("CM00002_I", "削除しました。"),
    CM00001_E("CM00001_E", "保存できませんでした。"),
    TD00001_W("TD00001_E", "指定されたTODOは見つかりませんでした。[タイトル：{0}]"),
    ;


    String code;
    String message;

    YbmMessages(String code, String message){
        this.code = code;
        this.message = message;
    }

    public String code(){
        return this.code;
    }
    public String message(Object ...args){
        if(args == null || args.length == 0){
            return this.message;
        }
        return MessageFormat.format(this.message, args);
    }

}
