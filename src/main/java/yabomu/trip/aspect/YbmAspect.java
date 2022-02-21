package yabomu.trip.aspect;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import yabomu.trip.presentation.session.YbmSession;

@Component
@Aspect
public class YbmAspect {

	final private String EXEC_ALL_CONTROLLER = "execution(* yabomu*..*Controller.*(..))";
        private static final Logger LOGGER = LoggerFactory.getLogger(YbmAspect.class);
	
        @Autowired
	private YbmSession session;

	@Before(EXEC_ALL_CONTROLLER)
	public void beforeNav() {
                RequestAttributes reqAttributes = RequestContextHolder.getRequestAttributes();
                // TODO:websocketだとリクエスト情報がとれない。WebSocket通信と判定できる条件がほしい
                if(reqAttributes == null) {
                        return;
                }
                ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes)reqAttributes;
                HttpServletRequest request = servletRequestAttributes.getRequest();
                this.session.setNowShowingMenu(request.getParameter("nowShowingMenu"));
	}

        @AfterThrowing(value = EXEC_ALL_CONTROLLER, throwing = "ex")
        public void doRecoveryActions(Throwable ex) {
                LOGGER.error("", ex.getMessage());
                ex.printStackTrace();
        }
}
