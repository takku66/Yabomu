package yabomu.trip.presentation.album.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;

/**
 * <pre>
 * home用のコントローラー
 * </pre>
 * @version 1.0
 */
@Controller
public class AlbumController {

	final private YbmSession session;

	@Autowired
	public AlbumController (YbmSession session) {
		this.session = session;
	}

	@RequestMapping(path=YbmUrls.ALBUM, method= {RequestMethod.POST})
	public ModelAndView init(ModelAndView mv) {
		mv.setViewName("album.html");
		return mv;
	}
}
