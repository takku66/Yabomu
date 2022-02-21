package yabomu.trip.presentation.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.presentation.session.YbmSession;

@Controller
public class LoginController {
    
    final private YbmSession session;

	@Autowired
	public LoginController (YbmSession session) {
		this.session = session;
	}

	@RequestMapping(path="/ybmlogin", method= {RequestMethod.GET,RequestMethod.POST})
	public String init() {
        YbmUser loginUser = new YbmUser(new UserId(1234567890L), new UserName("テスト"), "test.ybm@aaa.bbb.ccc", "000-1212-3434");
		this.session.setLoginUserInfo(loginUser);
		return "forward:/home";
	}
}
