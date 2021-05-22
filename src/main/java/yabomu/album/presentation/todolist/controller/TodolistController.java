package yabomu.album.presentation.todolist.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.album.domain.model.todolist.ReminderConfig;
import yabomu.album.presentation.todolist.viewadapter.CheckListViewAdapter;
import yabomu.album.presentation.todolist.viewadapter.TodolistViewAdapter;

/**
 * <pre>
 * コントローラー
 * TODOリストページ
 * </pre>
 * @author takku66
 * @version 1.0
 */
@Controller
public class TodolistController {

	@RequestMapping(path="/todolist/edit", method= RequestMethod.POST)
	public ModelAndView init(final ModelAndView mv,
							final TodolistViewAdapter todolistViewAdapter) {
		List<TodolistViewAdapter> testlist = createTestList();
		mv.addObject("formlist", testlist);
		mv.addObject("reminderTimeList", ReminderConfig.Time.values());
		mv.addObject("reminderRepeatList", ReminderConfig.Repeat.values());
		mv.setViewName("todolist.html");
		return mv;
	}

	private List<TodolistViewAdapter> createTestList(){
		List<TodolistViewAdapter> testlist = new ArrayList<TodolistViewAdapter>();
		for(int i = 0; i < 10; i++) {
			TodolistViewAdapter todolistViewAdapter = new TodolistViewAdapter();
			todolistViewAdapter.setTodoId(String.format("0000", i));
			todolistViewAdapter.setTitle("タイトル" + i);
			todolistViewAdapter.setContent("内容" + i);
			List<CheckListViewAdapter> clvaList = new ArrayList<CheckListViewAdapter>();
			for(int j = 0; j < 10; j++) {
				CheckListViewAdapter clva = new CheckListViewAdapter();
				clva.setListId(String.format("0000", i) + String.format("00", j));
				clva.setContent("内容" + i + "-" + j);
				clva.setCompleted(i+j%3==0);
				clvaList.add(clva);
			}
			todolistViewAdapter.setCheckList(clvaList);
			todolistViewAdapter.setReminderTime(i*5);
			todolistViewAdapter.setReminderRepeat(i);
			todolistViewAdapter.setScheduledStartDateTime(Integer.toString(20000000 + i));
			testlist.add(todolistViewAdapter);
		}
		return testlist;
	}
}
