package yabomu.trip.domain.valueobject;

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
		this.newUserId_1 = new UserId((long)123);
		this.newUserId_2 = new UserId((long)145);
		this.copyUserId = new UserId(newUserId_1.value());
	}

	@Test
	void isCreatable() {
		assertEquals(999, new UserId((long)999).value());
		assertEquals(0, new UserId((long)0).value());
		assertEquals(Long.MAX_VALUE, new UserId((long)Long.MAX_VALUE).value());
		assertEquals(Long.MIN_VALUE, new UserId((long)Long.MIN_VALUE).value());
	}

	@Test
	void isEquatable() {
		assertTrue(newUserId_1.equals(copyUserId));
		assertFalse(newUserId_1.equals(newUserId_2));
	}

	@Test
	void throwBlankError() {
		assertThrows(IllegalArgumentException.class, () -> new UserId(null));
	}


}
