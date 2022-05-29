package yabomu.trip.presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SPAController {
    

	@RequestMapping(path="/spa/*", method= {RequestMethod.GET,RequestMethod.POST})
	public String login() {
		return "index.html";
	}

}
