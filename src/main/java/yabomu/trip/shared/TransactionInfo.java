package yabomu.trip.shared;


import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Component
@RequestScope
public class TransactionInfo<T> {
    private String code;
    private String message;
    @Builder.Default
    private boolean isError = false;
    private String method;
    private T object;

}
