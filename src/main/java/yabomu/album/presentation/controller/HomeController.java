package yabomu.album.presentation.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

	@RequestMapping(path="/", method= {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView init(ModelAndView mv) {

		mv.setViewName("index.html");
		return mv;
	}
}
