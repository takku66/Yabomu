package yabomu.album.domain.valueobject;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestUserId {

	private UserId newUserId_1;
	private UserId newUserId_2;
	private UserId copyUserId;

	@BeforeEach
	void setup() {
		this.newUserId_1 = new UserId();
		this.newUserId_2 = new UserId();
		this.copyUserId = new UserId(newUserId_1.value());
	}


	@Test
	void isEquatable() {
		assertTrue(newUserId_1.equals(copyUserId));
		assertFalse(newUserId_1.equals(newUserId_2));
	}

	@Test
	void throwBlankError() {
		assertThrows(IllegalArgumentException.class, () -> new UserId(""));
		assertThrows(IllegalArgumentException.class, () -> new UserId(" "));
		assertThrows(IllegalArgumentException.class, () -> new UserId("　"));
		assertThrows(IllegalArgumentException.class, () -> new UserId(null));
	}


}
