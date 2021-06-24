package yabomu.trip.presentation.traffic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.presentation.NavigationForm;
import yabomu.trip.presentation.session.YbmSession;

/**
 * <pre>
 * home用のコントローラー
 * </pre>
 * @version 1.0
 */
@Controller
public class TrafficController {

	final private YbmSession session;

	@Autowired
	public TrafficController (YbmSession session) {
		this.session = session;
	}

	@RequestMapping(path="/traffic/edit", method= {RequestMethod.POST})
	public ModelAndView init(ModelAndView mv,
			final @ModelAttribute("navForm") NavigationForm navForm) {
			this.session.setNowShowingItem(navForm.getNowShowingItem());
			mv.addObject("navForm", navForm);
		mv.setViewName("traffic.html");
		return mv;
	}
}
