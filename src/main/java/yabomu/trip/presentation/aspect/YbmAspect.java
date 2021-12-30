package yabomu.trip.presentation.aspect;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import yabomu.trip.presentation.session.YbmSession;

@Component
@Aspect
public class YbmAspect {

	final private String EXEC_ALL_CONTROLLER = "execution(* *..*Controller.*(..))";

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
}
