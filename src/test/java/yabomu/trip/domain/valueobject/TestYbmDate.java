package yabomu.trip.domain.valueobject;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmDate {

	private YbmDate nonmarkDate;
	private YbmDate hyphenDate;
	private YbmDate slashDate;
	private YbmDate jpDate;
	private YbmDate blankDate;
	private YbmDate spaceDate;
	private YbmDate nullDate;
	private YbmDate localDate;

	@BeforeEach
	void setup() {
		this.nonmarkDate = new YbmDate("20210228", YbmDate.FmtPtn.NONMARK_DATE);
		this.hyphenDate = new YbmDate("2021-02-28", YbmDate.FmtPtn.HYPHEN_DATE);
		this.slashDate = new YbmDate("2021/02/28", YbmDate.FmtPtn.SLASH_DATE);
		this.jpDate = new YbmDate("2021年02月28日", YbmDate.FmtPtn.JP_DATE);
		this.blankDate = new YbmDate("", YbmDate.FmtPtn.JP_DATE);
		this.spaceDate = new YbmDate(" ", YbmDate.FmtPtn.JP_DATE);
		this.nullDate = new YbmDate(null, YbmDate.FmtPtn.JP_DATE);
		this.localDate = new YbmDate(LocalDateTime.of(2021,2,28,0,0,0,0));
	}


	@Test
	void canToNonmark() {
		assertEquals("20210228", nonmarkDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("20210228", hyphenDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("20210228", jpDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("20210228", slashDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("20210228", localDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
	}

	@Test
	void canToString() {
		assertEquals("2021-02-28T00:00", nonmarkDate.toString());
		assertEquals("2021-02-28T00:00", slashDate.toString());
		assertEquals("2021-02-28T00:00", hyphenDate.toString());
		assertEquals("2021-02-28T00:00", jpDate.toString());
		assertEquals("2021-02-28T00:00", localDate.toString());
	}

	@Test
	void canToHyphen() {
		assertEquals("2021-02-28", nonmarkDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("2021-02-28", hyphenDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("2021-02-28", slashDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("2021-02-28", jpDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("2021-02-28", localDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
	}
	@Test
	void canToJp() {
		assertEquals("2021年02月28日", hyphenDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021年02月28日", nonmarkDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021年02月28日", slashDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021年02月28日", jpDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021年02月28日", localDate.valueOf(YbmDate.FmtPtn.JP_DATE));
	}
	@Test
	void canToSlash() {
		assertEquals("2021/02/28", hyphenDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("2021/02/28", nonmarkDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("2021/02/28", jpDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("2021/02/28", slashDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("2021/02/28", localDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
	}

	@Test
	void blankTest() {
		assertEquals("", blankDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("", spaceDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("", nullDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("", blankDate.toString());
		assertEquals("", spaceDate.toString());
		assertEquals("", nullDate.toString());
		assertEquals("", blankDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("", spaceDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("", nullDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("", blankDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("", spaceDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("", nullDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("", blankDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("", spaceDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
		assertEquals("", nullDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
	}

	@Test
	void isEquatable() {
		assertTrue(localDate.equals(slashDate));
		assertTrue(localDate.equals(hyphenDate));
		assertTrue(localDate.equals(jpDate));
		assertTrue(localDate.equals(nonmarkDate));
	}

	@Test
	void isEquatableString() {
		assertEquals("2021-02-28", localDate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("20210228", localDate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("2021年02月28日", localDate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021/02/28", localDate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
	}

	@Test
	void throwParseError() {
		assertThrows(DateTimeParseException.class,
						() -> new YbmDate("20210232",YbmDate.FmtPtn.NONMARK_DATE));
		assertThrows(DateTimeParseException.class,
						() -> new YbmDate("20210000",YbmDate.FmtPtn.NONMARK_DATE));
		assertThrows(DateTimeParseException.class,
						() -> new YbmDate("2021-02-28",YbmDate.FmtPtn.NONMARK_DATE));
		assertThrows(DateTimeParseException.class,
						() -> new YbmDate("2021/02/28",YbmDate.FmtPtn.NONMARK_DATE));
		assertThrows(DateTimeParseException.class,
						() -> new YbmDate("2021年02月28日",YbmDate.FmtPtn.NONMARK_DATE));
	}

	@Test
	void testUru() {
		YbmDate urudate = new YbmDate("20200229", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20200229", urudate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		YbmDate urudate_add2 = new YbmDate("20200231", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20200229", urudate_add2.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		YbmDate noturudate = new YbmDate("20210229", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20210228", noturudate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		YbmDate noturudate_add2 = new YbmDate("20210231", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20210228", noturudate_add2.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
	}


}
