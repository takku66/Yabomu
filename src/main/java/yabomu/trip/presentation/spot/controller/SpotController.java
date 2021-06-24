package yabomu.trip.presentation.spot.controller;

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
public class SpotController {

	final private YbmSession session;

	@Autowired
	public SpotController (YbmSession session) {
		this.session = session;
	}

	@RequestMapping(path="/spot/edit", method= {RequestMethod.POST})
	public ModelAndView init(ModelAndView mv,
							final @ModelAttribute("navForm") NavigationForm navForm) {
		this.session.setNowShowingItem(navForm.getNowShowingItem());
		mv.addObject("navForm", navForm);
		mv.setViewName("spot.html");
		return mv;
	}
}
