package yabomu.trip.presentation.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.domain.model.todolist.ReminderConfig;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
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
		List<TodoListViewAdapter> todolistView = TodoListViewConverter.toViewTodoList(testlist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", todolistView);
		mv.addObject("reminderTimeList", ReminderConfig.Time.values());
		mv.addObject("reminderRepeatList", ReminderConfig.Repeat.values());

		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

	@RequestMapping(path=YbmUrls.TODOLIST_EDIT + "/{id}/save", method= RequestMethod.POST)
	public ModelAndView save(final ModelAndView mv,
								final TodoListViewAdapter todolistViewAdapter,
								final @PathVariable("id") String topicsId) {
		// Domain用のオブジェクトに変換する
		Todo todo = TodoListViewConverter.toDomainTodoList(todolistViewAdapter);
		// 全TODOリストを取得する
		List<Todo> testlist = todoListService.save(todo);

		// view用のデータに変換する
		List<TodoListViewAdapter> todolistView = TodoListViewConverter.toViewTodoList(testlist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", todolistView);
		mv.addObject("reminderTimeList", ReminderConfig.Time.values());
		mv.addObject("reminderRepeatList", ReminderConfig.Repeat.values());

		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

}
