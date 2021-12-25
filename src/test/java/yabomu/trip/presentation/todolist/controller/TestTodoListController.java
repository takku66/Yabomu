package yabomu.trip.presentation.todolist.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;
import yabomu.trip.usecase.todolist.TodoListService;

@SpringBootTest
class TestTodoListController {

	private MockMvc mockMvc;

	@Autowired
	@Qualifier("Test-TodoList")
	ITodoListRepository todoListRepository;
	@Autowired
	@Qualifier("Test-CheckList")
	ICheckListRepository checkListRepository;
	TodoListService todoListService;
	TodoListController controller;
	YbmSession session;

    @BeforeEach
    public void setUp() {
    	session = new YbmSession();
    	todoListService = new TodoListService(todoListRepository, checkListRepository);
    	controller = new TodoListController(todoListService, session);
    	mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    /**
	 * <pre>
	 * (テストメソッド)
	 * init
	 *
	 * (事前条件)
	 * POSTメソッドで、/todolist/editへアクセス
	 *
	 * (確認事項)
	 * ステータスコード200で、todolist.htmlのviewが返されること。
	 * </pre>
	 */
	@Test
	void init() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST_EDIT))
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(view().name("todolist.html"))
					.andReturn();
	}

	/**
	 * <pre>
	 * (テストメソッド)
	 * init
	 *
	 * (事前条件)
	 * GETメソッドで、/todolist/editにアクセス
	 *
	 * (確認事項)
	 * ステータスコードが4XX系エラーとなること。
	 * </pre>
	 */
	@Test
	void init_withInValidMethod() throws Exception {
		MvcResult mvcResult = mockMvc.perform(get(YbmUrls.TODOLIST_EDIT))
					.andDo(print())
					.andExpect(status().is4xxClientError())
					.andReturn();
		mvcResult = mockMvc.perform(head(YbmUrls.TODOLIST_EDIT))
				.andDo(print())
				.andExpect(status().is4xxClientError())
				.andReturn();
		mvcResult = mockMvc.perform(put(YbmUrls.TODOLIST_EDIT))
				.andDo(print())
				.andExpect(status().is4xxClientError())
				.andReturn();
		mvcResult = mockMvc.perform(delete(YbmUrls.TODOLIST_EDIT))
				.andDo(print())
				.andExpect(status().is4xxClientError())
				.andReturn();

	}

	/**
	 * <pre>
	 * (テストメソッド)
	 * init
	 *
	 * (事前条件)
	 * POSTメソッドで、異常なURLにアクセスした場合
	 *
	 * (確認事項)
	 * ステータスコードが4XX系エラーとなること。
	 * </pre>
	 */
	@Test
	void init_withInValidUrl() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST_EDIT + "a"))
					.andDo(print())
					.andExpect(status().is4xxClientError())
					.andReturn();
	}

	/**
	 * <pre>
	 * (テストメソッド)
	 * save
	 *
	 * (事前条件)
	 * TODOリストに必要なキー情報が存在している場合
	 * タイトルが、「タイトル１」から「タイトル３」に変更した場合
	 * (確認事項)
	 * 更新処理が正常に終了し、タイトルの変更内容が反映されている。
	 * </pre>
	 */
	@Test
	void saveUpdate() throws Exception {
		// インメモリ内に格納されているTODOリストをテストデータとして使用する。
		TodoList todolist = todoListService.findAll();
		Todo todo = todolist.get(0);
		TodoListForm form = TodoListViewConverter.toView(todo);
		form.setTitle("タイトル更新テスト");

		// 指定のURLはJSONで受け付けるため、JSONへの変換処理を行う。
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(form);
		MvcResult mvcResult = mockMvc.perform((post(YbmUrls.TODOLIST_EDIT + "/" + todo.todoId() + "/save"))
					.contentType(MediaType.APPLICATION_JSON)
					.content(json))
					.andDo(print())
					.andExpect(status().isOk())
					.andReturn();

		// 更新されたかどうかを確認する。
		Todo updatedTodo = todoListService.findById(todo.todoId());
		assertEquals("タイトル更新テスト", updatedTodo.title());
	}

}
