package yabomu.album.presentation.home.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * <pre>
 * home用のコントローラー
 * </pre>
 * @author takku66
 * @version 1.0
 */
@Controller
public class HomeController {

	@RequestMapping(path="/home", method= {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView init(ModelAndView mv) {

		mv.setViewName("home.html");
		return mv;
	}
}
