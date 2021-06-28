package yabomu.trip.presentation.schedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.presentation.session.YbmSession;

/**
 * <pre>
 * home用のコントローラー
 * </pre>
 * @version 1.0
 */
@Controller
public class ScheduleController {

	final private YbmSession session;

	@Autowired
	public ScheduleController (YbmSession session) {
		this.session = session;
	}

	@RequestMapping(path="/schedule/edit", method= {RequestMethod.POST})
	public ModelAndView init(ModelAndView mv) {
		mv.setViewName("schedule.html");
		return mv;
	}
}
