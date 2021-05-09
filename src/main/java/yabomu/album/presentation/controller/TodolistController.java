package yabomu.album.presentation.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class TodolistController {

	@RequestMapping(path="/todolist/edit", method= RequestMethod.POST)
	public ModelAndView init(ModelAndView mv) {
		List<String> testlist = createTestList();
		mv.addObject("formlist", testlist);
		mv.setViewName("todolist.html");
		return mv;
	}

	private List<String> createTestList(){
		List<String> testlist = new ArrayList<String>();
		for(int i = 0; i < 10; i++) {
			testlist.add("test" + i);
		}
		return testlist;
	}
}
