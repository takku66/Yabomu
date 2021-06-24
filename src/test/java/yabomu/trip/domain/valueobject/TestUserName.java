package yabomu.trip.domain.valueobject;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestUserName {

	private UserName kanjiName;
	private UserName hiraganaName;
	private UserName kanaName;
	private UserName hankanaName;
	private UserName engName;

	@BeforeEach
	void setup() {
		this.kanjiName = new UserName("漢字　太郎");
		this.hiraganaName = new UserName("てすと　たろう");
		this.kanaName = new UserName("テスト　タロウ");
		this.hankanaName = new UserName("ﾃｽﾄ ﾀﾛｳ");
		this.engName = new UserName("test tarou");
	}

	@Test
	void canCreatedKanji() {
		assertEquals("漢字　太郎", kanjiName.value());
	}
	@Test
	void canCreatedHiragana() {
		assertEquals("てすと　たろう", hiraganaName.value());
	}
	@Test
	void canCreatedKana() {
		assertEquals("テスト　タロウ", kanaName.value());
	}
	@Test
	void canCreatedHankana() {
		assertEquals("ﾃｽﾄ ﾀﾛｳ", hankanaName.value());
	}
	@Test
	void canCreatedEng() {
		assertEquals("test tarou", engName.value());
	}

	@Test
	void isEquatable() {
		assertThrows(IllegalArgumentException.class, () -> new UserName(""));
		assertThrows(IllegalArgumentException.class, () -> new UserName(" "));
		assertThrows(IllegalArgumentException.class, () -> new UserName("　"));
		assertThrows(IllegalArgumentException.class, () -> new UserName(null));
	}

	@Test
	void throwBlankError() {
		assertThrows(IllegalArgumentException.class, () -> new UserName(""));
		assertThrows(IllegalArgumentException.class, () -> new UserName(" "));
		assertThrows(IllegalArgumentException.class, () -> new UserName("　"));
		assertThrows(IllegalArgumentException.class, () -> new UserName(null));
	}


}
