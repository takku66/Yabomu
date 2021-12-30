package yabomu.trip.presentation.todolist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
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

	private final TodoListService todoListService;
	private final YbmSession session;
	private final SimpMessageSendingOperations messagingTemplate;

	@Autowired
	public TodoListController(TodoListService todoListService,
								YbmSession session,
								SimpMessageSendingOperations messagingTemplate) {
		this.todoListService = todoListService;
		this.session = session;
		this.messagingTemplate = messagingTemplate;
	}

	@RequestMapping(path=YbmUrls.TODOLIST, method= RequestMethod.POST)
	public ModelAndView init(final ModelAndView mv,
								final TodoListForm todolistForm) {

		// 全TODOリストを取得する
		TodoList todolist = todoListService.findAll();

		// view用のデータに変換する
		List<TodoListForm> convertedTodolist = TodoListViewConverter.toView(todolist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", convertedTodolist);
		mv.addObject("reminderNoticeTimeList", ReminderNoticeTime.values());
		mv.addObject("reminderRepeatList", ReminderRepeat.values());

		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

	@MessageMapping(YbmUrls.TODOLIST + "/{id}/save")
	public void save(final @RequestBody TodoListForm todolistForm,
						final @PathVariable("id") String todoId) {

		if(StringUtils.isEmptyOrWhitespace(todolistForm.getEventId())) {
			messagingTemplate.convertAndSend("sub" + YbmUrls.TODOLIST + "/{id}/save", "ERROR");
		}
		// Domain用のオブジェクトに変換する
		Todo todo = TodoListViewConverter.toDomain(todolistForm);
		// TODO情報を保存する
		int savedCnt = todoListService.save(todo);
		// View用に変換する
		TodoListForm savedTodoForm = TodoListViewConverter.toView(todo);

		// TODO:今のままだと全てのユーザーに共有されてしまう。イベントごとのTODO画面へ返せるようにする
		messagingTemplate.convertAndSend("/sub" + YbmUrls.TODOLIST + "/eventId/save", savedTodoForm);

	}

}
