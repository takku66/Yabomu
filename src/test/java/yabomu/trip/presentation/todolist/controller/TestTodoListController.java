package yabomu.trip.presentation.todolist.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import yabomu.trip.domain.repository.todolist.ICheckListRepository;
import yabomu.trip.domain.repository.todolist.ITodoListRepository;
import yabomu.trip.presentation.YbmUrls;
import yabomu.trip.presentation.session.YbmSession;
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

	@Test
	void testInitOk() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST_EDIT))
					.andDo(print())
					.andExpect(status().isOk())
					.andExpect(view().name("todolist.html"))
					.andReturn();
	}

	@Test
	void testInitInValidMethodGet() throws Exception {
		MvcResult mvcResult = mockMvc.perform(get(YbmUrls.TODOLIST_EDIT))
					.andDo(print())
					.andExpect(status().is4xxClientError())
					.andReturn();
	}

	@Test
	void testInitInValidUrl() throws Exception {
		MvcResult mvcResult = mockMvc.perform(post(YbmUrls.TODOLIST_EDIT + "a"))
					.andDo(print())
					.andExpect(status().is4xxClientError())
					.andReturn();
	}

}
