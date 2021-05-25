package yabomu.album.presentation.todolist.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.album.domain.model.todolist.ReminderConfig;
import yabomu.album.domain.model.todolist.Todo;
import yabomu.album.presentation.YbmUrls;
import yabomu.album.presentation.todolist.converter.TodoListViewConverter;
import yabomu.album.presentation.todolist.viewadapter.CheckItemViewAdapter;
import yabomu.album.presentation.todolist.viewadapter.TodoListViewAdapter;
import yabomu.album.usecase.todolist.TodoListService;

/**
 * <pre>
 * コントローラー
 * TODOリストページ
 * </pre>
 * @author takku66
 * @version 1.0
 */
@Controller
public class TodoListController {

	final private TodoListService todoListService;

	@Autowired
	public TodoListController(TodoListService todoListService) {
		this.todoListService = todoListService;
	}

	@RequestMapping(path=YbmUrls.TODOLIST_EDIT, method= RequestMethod.POST)
	public ModelAndView init(final ModelAndView mv,
								final TodoListViewAdapter todolistViewAdapter) {
		List<Todo> testlist = todoListService.findAll();
		List<TodoListViewAdapter> todolistView = TodoListViewConverter.convert(testlist);
		mv.addObject("formlist", todolistView);
		mv.addObject("reminderTimeList", ReminderConfig.Time.values());
		mv.addObject("reminderRepeatList", ReminderConfig.Repeat.values());
		mv.setViewName("todolist.html");
		return mv;
	}

	private List<TodoListViewAdapter> createTestList(){
		List<TodoListViewAdapter> testlist = new ArrayList<TodoListViewAdapter>();
		for(int i = 0; i < 10; i++) {
			TodoListViewAdapter todolistViewAdapter = new TodoListViewAdapter();
			todolistViewAdapter.setTodoId(String.format("0000", i));
			todolistViewAdapter.setTitle("タイトル" + i);
			todolistViewAdapter.setContent("内容" + i);
			List<CheckItemViewAdapter> clvaList = new ArrayList<CheckItemViewAdapter>();
			for(int j = 0; j < 10; j++) {
				CheckItemViewAdapter clva = new CheckItemViewAdapter();
				clva.setCheckListId(String.format("0000", i) + String.format("00", j));
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
