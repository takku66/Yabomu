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
		long l0 = 0;
		long l1 = 1234567890;
		long lmax = Long.MAX_VALUE;
		long lmin = Long.MIN_VALUE;
		assertThrows(IllegalArgumentException.class, () -> new UserId(l0));
		assertThrows(IllegalArgumentException.class, () -> new UserId(l1));
		assertThrows(IllegalArgumentException.class, () -> new UserId(lmax));
		assertThrows(IllegalArgumentException.class, () -> new UserId(lmin));
		assertThrows(IllegalArgumentException.class, () -> new UserId(null));
	}


}
