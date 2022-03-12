package yabomu.trip.presentation.todolist.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.todolist.TodoList;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.domain.valueobject.EventId;
import yabomu.trip.domain.valueobject.ReminderNoticeTime;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
import yabomu.trip.presentation.todolist.converter.TodoListViewConverter;
import yabomu.trip.presentation.todolist.viewadapter.TodoListForm;
import yabomu.trip.usecase.todolist.TodoListService;

@SpringBootTest
class TestTodoListController {

	private MockMvc mockMvc;

	// テスト用のリポジトリ ----------
	@Autowired
	@Qualifier("Test-TodoList")
	ITodoListRepository todoListRepository;
	@Autowired
	@Qualifier("Test-CheckList")
	ICheckListRepository checkListRepository;

	// テスト対象のコントローラー ----------
	TodoListController controller;

	// コントローラー生成に必要なコンポーネント ----------
	@Autowired
	SimpMessageSendingOperations messagingTemplate;
	YbmSession session;
	TodoListService todoListService;

	// WebSocketテストに必要なコンポーネント ----------
	BlockingQueue<String> blockingQueue;
	WebSocketStompClient stompClient;


    @BeforeEach
    public void setUp() {

    	session = new YbmSession();
		YbmUser loginUser = YbmUser.builder()
									.id(new UserId(1234567890L))
									.name(new UserName("JUnit テスト 太郎"))
									.email("test.ybm@aaa.bbb.ccc")
									.tellNo("000-1111-2222")
									.build();
		session.setLoginUserInfo(loginUser);
    	todoListService = new TodoListService(todoListRepository, checkListRepository);
    	controller = new TodoListController(todoListService, session, messagingTemplate);
    	mockMvc = MockMvcBuilders.standaloneSetup(controller).build();

    	blockingQueue = new LinkedBlockingDeque<>();
    	stompClient = new WebSocketStompClient(new SockJsClient(Arrays.asList(new WebSocketTransport(new StandardWebSocketClient()))));
    }

    /**
	 * <pre>
	 * (テストメソッド)
	 * init
	 *
	 * (事前条件)
	 * POSTメソッドで、/todolistへアクセス
	 *
	 * (確認事項)
	 * ステータスコード200で、todolist.htmlのviewが返されること。
	 * </pre>
	 */
	@Test
	void init() throws Exception {
		TodoList todolist = todoListRepository.findAll();
		EventId eventId = todolist.get(0).eventId();
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST + "/" + eventId.toString()))
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
	 * GETメソッドで、/todolistにアクセス
	 *
	 * (確認事項)
	 * ステータスコードが4XX系エラーとなること。
	 * </pre>
	 */
	@Test
	void init_withInValidMethod() throws Exception {
		MvcResult mvcResult = mockMvc.perform(get(YbmUrls.TODOLIST))
					.andDo(print())
					.andExpect(status().is4xxClientError())
					.andReturn();
		mvcResult = mockMvc.perform(head(YbmUrls.TODOLIST))
				.andDo(print())
				.andExpect(status().is4xxClientError())
				.andReturn();
		mvcResult = mockMvc.perform(put(YbmUrls.TODOLIST))
				.andDo(print())
				.andExpect(status().is4xxClientError())
				.andReturn();
		mvcResult = mockMvc.perform(delete(YbmUrls.TODOLIST))
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
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST + "a"))
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
	 * TODOリストに必要なキー情報が存在していない場合
	 * 
	 * (確認事項)
	 * 登録処理が正常に終了し、登録内容が反映されている。
	 * </pre>
	 */
	@Test
	void save_regist() throws Exception {
		// インメモリ内に格納されているTODOリストをテストデータとして使用する。
		TodoListForm form = new TodoListForm();
		EventId eventId = todoListRepository.findAll().get(0).eventId();
		form.setEventId(eventId.toString());
		form.setTodoId("");
		form.setTitle("タイトル登録テスト");
		form.setContent("内容登録テスト");
		form.setTodoStartDate("2022-10-10");
		form.setTodoStartTime("00:00");
		form.setTodoEndDateTime("2022-01-01 00:00");
		form.setReminderNoticeTime(ReminderNoticeTime.BEFORE_15M);
		form.setReminderRepeat(ReminderRepeat.REPEAT_EVERY_DAY);
		form.setCreateDateTime("2022-01-01 00:00:00.000000");
		form.setCreateUserId("1");
		form.setCreateUserName("testUser1");
		form.setUpdateDateTime("2022-02-01 00:00:00.000000");
		form.setUpdateUserId("2");
		form.setUpdateUserName("testUser2");

		// 指定のURLはJSONで受け付けるため、JSONへの変換処理を行う。
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(form);
		MvcResult mvcResult = mockMvc.perform((post(YbmUrls.TODOLIST + "/save"))
					.contentType(MediaType.APPLICATION_JSON)
					.content(json))
					.andDo(print())
					.andExpect(status().isOk())
					.andReturn();

		String returnStr = mvcResult.getResponse().getContentAsString();
		
		// 更新されたかどうかを確認する。
		System.out.println("戻り値" + returnStr);
		// Todo registedTodo = todoListService.findById(Long.valueOf(form.getTodoId()));
		// assertEquals(form.getTitle(), registedTodo.title());
		// assertEquals(form.getContent(), registedTodo.content());
		
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
	void save_update() throws Exception {
		// インメモリ内に格納されているTODOリストをテストデータとして使用する。
		TodoList todolist = todoListService.findAll();
		Todo todo = todolist.get(0);
		TodoListForm form = TodoListViewConverter.toView(todo);
		form.setTitle("タイトル更新テスト");

		// 指定のURLはJSONで受け付けるため、JSONへの変換処理を行う。
		ObjectMapper mapper = new ObjectMapper();
		String json = mapper.writeValueAsString(form);
		MvcResult mvcResult = mockMvc.perform((post(YbmUrls.TODOLIST + "/" + todo.eventId() + "/" + todo.todoId() + "/save"))
					.contentType(MediaType.APPLICATION_JSON)
					.content(json))
					.andDo(print())
					.andExpect(status().isOk())
					.andReturn();

		// 更新されたかどうかを確認する。
		Todo updatedTodo = todoListService.findTodoOf(todo.todoId());
		assertEquals("タイトル更新テスト", updatedTodo.title());
		
	}

	// TODO WebSocket用テスト未実装。どこまでテストするか検討が必要

}
