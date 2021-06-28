package yabomu.trip.presentation.home.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@SpringBootTest
class TestHomeControllerTest {

	private MockMvc mockMvc;

	@Autowired
	HomeController controller;

    @BeforeEach
    public void setUp() {

    	mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
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
