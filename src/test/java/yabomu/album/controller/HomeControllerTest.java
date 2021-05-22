package yabomu.album.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import yabomu.album.presentation.home.controller.HomeController;

@SpringBootTest
class HomeControllerTest {

	private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
    	mockMvc = MockMvcBuilders.standaloneSetup(new HomeController()).build();
    }

	@Test
	void testInit() throws Exception {
		 MvcResult mvcResult = mockMvc.perform(get("/home"))
				 							.andDo(print())
				 							.andExpect(status().isOk())
//				 							.andExpect(view().name("あえて違うやつ"))
				 							.andExpect(view().name("home.html"))
				 							.andReturn();
	}

}
