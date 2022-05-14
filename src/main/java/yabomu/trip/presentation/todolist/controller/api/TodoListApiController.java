package yabomu.trip.presentation.todolist.controller.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.util.StringUtils;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.valueobject.TodoId;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;
import yabomu.trip.usecase.todolist.TodoListService;

@RestController
@RequestMapping("api")
@CrossOrigin
public class TodoListApiController {
	final private TodoListService todoListService;
	ObjectMapper mapper;

	@Autowired
	public TodoListApiController(TodoListService todoListService,
									ObjectMapper mapper) {
		this.todoListService = todoListService;
		this.mapper = mapper;
	}

	@RequestMapping(path=YbmUrls.TODOLIST + "/{todoId}", method= RequestMethod.GET)
	public String getTodo(final @PathVariable("todoId") String todoId) {

		// 指定されたTODOを取得する
		Todo todo = todoListService.findTodoOf(new TodoId(todoId));

		// view用のデータに変換する
		TodoListForm viewTodo = TodoListViewConverter.toView(todo);

		// レスポンス用にパラメータを設定する
		String json = "{}";
		try {
			json = mapper.writeValueAsString(viewTodo);
		}catch(JsonProcessingException e) {
			json = "{\"message\":\"データの取得に失敗しました。\"}";
		}

		return json;
	}

	@RequestMapping(path=YbmUrls.TODOLIST + "/{id}/save", method= RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public String save(final @RequestBody TodoListForm todolistForm,
						final @PathVariable("id") String todoId) {

		if(StringUtils.isEmptyOrWhitespace(todolistForm.getEventId())) {
			return "{"
					+ "\"savedCnt\": " + "\"0\""
					+ ",\"error\": " + "\"true\""
					+ "}";
		}
		// Domain用のオブジェクトに変換する
		Todo todo = TodoListViewConverter.toDomain(todolistForm);
		// 全TODOリストを取得する
		int savedCnt = todoListService.save(todo);
		// view用のデータに変換する
		TodoList todolist = todoListService.findAll();
		return "{"
				+ "\"message\": " + "\"" + savedCnt + "件の保存が完了しました。\""
				+ "}";
	}
}
