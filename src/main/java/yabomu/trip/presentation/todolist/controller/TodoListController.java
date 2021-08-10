package yabomu.trip.presentation.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.ReminderTime;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;
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
								final TodoListForm todolistForm) {

		// 全TODOリストを取得する
		TodoList todolist = todoListService.findAll();

		// view用のデータに変換する
		List<TodoListForm> convertedTodolist = TodoListViewConverter.toView(todolist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", convertedTodolist);
		mv.addObject("reminderTimeList", ReminderTime.values());
		mv.addObject("reminderRepeatList", ReminderRepeat.values());

		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

	@RequestMapping(path=YbmUrls.TODOLIST_EDIT + "/{id}/save", method= RequestMethod.POST)
	public ModelAndView save(final ModelAndView mv,
								final TodoListForm todolistForm,
								final @PathVariable("id") String topicsId) {
		// Domain用のオブジェクトに変換する
		Todo todo = TodoListViewConverter.toDomain(todolistForm);
		// 全TODOリストを取得する
		TodoList testlist = todoListService.save(todo);

		// view用のデータに変換する
		List<TodoListForm> convertedTodolist = TodoListViewConverter.toView(testlist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", convertedTodolist);
		mv.addObject("reminderTimeList", ReminderTime.values());
		mv.addObject("reminderRepeatList", ReminderRepeat.values());

		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

}
