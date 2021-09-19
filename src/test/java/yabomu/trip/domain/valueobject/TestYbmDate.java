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
		assertEquals("20210228", nonmarkDate.toNonmarkDate());
		assertEquals("20210228", hyphenDate.toNonmarkDate());
		assertEquals("20210228", jpDate.toNonmarkDate());
		assertEquals("20210228", slashDate.toNonmarkDate());
		assertEquals("20210228", localDate.toNonmarkDate());
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
		assertEquals("2021-02-28", nonmarkDate.toHyphenDate());
		assertEquals("2021-02-28", hyphenDate.toHyphenDate());
		assertEquals("2021-02-28", slashDate.toHyphenDate());
		assertEquals("2021-02-28", jpDate.toHyphenDate());
		assertEquals("2021-02-28", localDate.toHyphenDate());
	}
	@Test
	void canToJp() {
		assertEquals("2021年02月28日", hyphenDate.toJpDate());
		assertEquals("2021年02月28日", nonmarkDate.toJpDate());
		assertEquals("2021年02月28日", slashDate.toJpDate());
		assertEquals("2021年02月28日", jpDate.toJpDate());
		assertEquals("2021年02月28日", localDate.toJpDate());
	}
	@Test
	void canToSlash() {
		assertEquals("2021/02/28", hyphenDate.toSlashDate());
		assertEquals("2021/02/28", nonmarkDate.toSlashDate());
		assertEquals("2021/02/28", jpDate.toSlashDate());
		assertEquals("2021/02/28", slashDate.toSlashDate());
		assertEquals("2021/02/28", localDate.toSlashDate());
	}

	@Test
	void blankTest() {
		assertEquals("", blankDate.toNonmarkDate());
		assertEquals("", spaceDate.toNonmarkDate());
		assertEquals("", nullDate.toNonmarkDate());
		assertEquals("", blankDate.toString());
		assertEquals("", spaceDate.toString());
		assertEquals("", nullDate.toString());
		assertEquals("", blankDate.toHyphenDate());
		assertEquals("", spaceDate.toHyphenDate());
		assertEquals("", nullDate.toHyphenDate());
		assertEquals("", blankDate.toJpDate());
		assertEquals("", spaceDate.toJpDate());
		assertEquals("", nullDate.toJpDate());
		assertEquals("", blankDate.toSlashDate());
		assertEquals("", spaceDate.toSlashDate());
		assertEquals("", nullDate.toSlashDate());
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
		assertEquals("20200229", urudate.toNonmarkDate());
		YbmDate urudate_add2 = new YbmDate("20200231", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20200229", urudate_add2.toNonmarkDate());
		YbmDate noturudate = new YbmDate("20210229", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20210228", noturudate.toNonmarkDate());
		YbmDate noturudate_add2 = new YbmDate("20210231", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("20210228", noturudate_add2.toNonmarkDate());
	}


}
