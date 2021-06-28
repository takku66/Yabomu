package yabomu.trip.presentation.todolist.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.domain.model.todolist.ReminderConfig;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.CheckItemViewAdapter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListViewAdapter;
import yabomu.trip.usecase.todolist.TodoListService;

/**
 * <pre>
 * コントローラー
 * TODOリストページ
 * </pre>
 * @version 1.0
 */
@Controller
public class TodoListController {

	final private TodoListService todoListService;
	final private YbmSession session;

	@Autowired
	public TodoListController(TodoListService todoListService,
								YbmSession session) {
		this.todoListService = todoListService;
		this.session = session;
	}

	@RequestMapping(path=YbmUrls.TODOLIST_EDIT, method= RequestMethod.POST)
	public ModelAndView init(final ModelAndView mv,
								final TodoListViewAdapter todolistViewAdapter) {

		// 全TODOリストを取得する
		List<Todo> testlist = todoListService.findAll();

		// view用のデータに変換する
		List<TodoListViewAdapter> todolistView = TodoListViewConverter.convert(testlist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", todolistView);
		mv.addObject("reminderTimeList", ReminderConfig.Time.values());
		mv.addObject("reminderRepeatList", ReminderConfig.Repeat.values());

		// 遷移先のhtml名を設定する
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
