package yabomu.trip.presentation.todolist.controller;

import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;
import yabomu.trip.shared.YbmMessages;
import yabomu.trip.shared.TransactionInfo;
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
	private final ObjectMapper mapper;

	@Autowired
	public TodoListController(TodoListService todoListService,
								YbmSession session,
								SimpMessageSendingOperations messagingTemplate) {
		this.todoListService = todoListService;
		this.session = session;
		this.messagingTemplate = messagingTemplate;
		this.mapper = new ObjectMapper();
	}

	@RequestMapping(path=YbmUrls.TODOLIST + "/{eventId}", method= RequestMethod.POST)
	public ModelAndView init(final ModelAndView mv, final TodoListForm todolistForm,
								final @PathVariable("eventId") String paramEventId) {

		// 全TODOリストを取得する
		EventId eventId;
		if(Objects.nonNull(paramEventId) && "".equals(paramEventId)){
			eventId = new EventId(paramEventId);
		}else{
			// TODO 暫定対応。正式にはエラーで返す。
			eventId = new EventId(1628434631798000001L);
		}
		 
		TodoList todolist = todoListService.findTodoOf(eventId);

		// view用のデータに変換する
		List<TodoListForm> convertedTodolist = TodoListViewConverter.toView(todolist);

		// レスポンス用にパラメータを設定する
		mv.addObject("formlist", convertedTodolist);
		mv.addObject("reminderNoticeTimeList", ReminderNoticeTime.values());
		mv.addObject("reminderRepeatList", ReminderRepeat.values());

		// TODO 暫定対応
		mv.addObject("selectedEventId", eventId);
		
		// 遷移先のhtml名を設定する
		mv.setViewName("todolist.html");
		return mv;
	}

	// TODO: charsetをつけないとJUnitテストの時になぜかISO8859-1に変換される
	@ResponseBody
	@RequestMapping(path = YbmUrls.TODOLIST + "/{eventId}/{todoId}/save", method = RequestMethod.POST)
	public String save(final @RequestBody TodoListForm todolistForm,
						final @PathVariable("eventId") String eventId,
						final @PathVariable("todoId") String todoId) throws JsonProcessingException {
		if(StringUtils.isEmptyOrWhitespace(eventId) || StringUtils.isEmptyOrWhitespace(todoId)) {
			messagingTemplate.convertAndSend("sub" + YbmUrls.TODOLIST + "/" + eventId, "情報の取得に失敗しました。");
		}
		String loginUserId = session.loginUserId().toString();
		if("new".equals(todoId)){
			todolistForm.setTodoId((new TodoId()).toString());
			todolistForm.setCreateUserId(loginUserId);
			todolistForm.setUpdateUserId(loginUserId);
		}
		todolistForm.getCheckList().stream()
		.forEach(item -> {
			// TODO: 本当はDBに保存されている値そのまま使うべき。user情報は引数に渡して、repository側で入れるか？
			item.setCreateUserId(loginUserId);
			item.setUpdateUserId(loginUserId);
		});
		// Domain用のオブジェクトに変換する
		Todo todo = TodoListViewConverter.toDomain(todolistForm);
		int savedCnt = todoListService.save(todo);
		
		var info = TransactionInfo.<TodoListForm>builder()
									.code(YbmMessages.CM00001_I.code())
									.message(savedCnt + "件" + YbmMessages.CM00001_I.message())
									.isError(false)
									.object(TodoListViewConverter.toView(todo))
									.build();
		return mapper.writeValueAsString(info);
	}


	@MessageMapping(YbmUrls.TODOLIST + "/{eventId}/{todoId}/publish")
	public void publish(final @DestinationVariable("eventId") String eventId,
						final @DestinationVariable("todoId") String todoId) {
		if(StringUtils.isEmptyOrWhitespace(eventId) || StringUtils.isEmptyOrWhitespace(todoId)) {
			messagingTemplate.convertAndSend("sub" + YbmUrls.TODOLIST + "/" + eventId, "情報の取得に失敗しました。");
		}
		Todo todo = todoListService.findTodoOf(new TodoId(todoId));
		TodoListForm todoform = TodoListViewConverter.toView(todo);

		var info = TransactionInfo.<TodoListForm>builder()
									.code(YbmMessages.CM00001_I.code())
									.isError(false)
									.object(todoform)
									.build();
		messagingTemplate.convertAndSend("/sub" + YbmUrls.TODOLIST + "/" + eventId, info);
	}

	@MessageMapping(YbmUrls.TODOLIST + "/{eventId}/{todoId}/publish/delete")
	public void publishDelete(final @DestinationVariable("eventId") String eventId,
						final @DestinationVariable("todoId") String todoId) {
		if(StringUtils.isEmptyOrWhitespace(eventId) || StringUtils.isEmptyOrWhitespace(todoId)) {
			messagingTemplate.convertAndSend("sub" + YbmUrls.TODOLIST + "/" + eventId, "情報の取得に失敗しました。");
		}

		Todo todo = todoListService.findTodoOf(new TodoId(todoId));
		if(todo == null){
			var info = TransactionInfo.<TodoListForm>builder()
									.code(YbmMessages.CM00001_I.code())
									.isError(false)
									.object(new TodoListForm())
									.build();
			messagingTemplate.convertAndSend("/sub" + YbmUrls.TODOLIST + "/" + eventId, info);	
		}
		int deleteCnt = todoListService.delete(todo);
		TodoListForm todoform = TodoListViewConverter.toView(todo);

		var info = TransactionInfo.<TodoListForm>builder()
									.code(YbmMessages.CM00001_I.code())
									.isError(false)
									.object(todoform)
									.method("delete")
									.build();
		messagingTemplate.convertAndSend("/sub" + YbmUrls.TODOLIST + "/" + eventId, info);
	}

}
