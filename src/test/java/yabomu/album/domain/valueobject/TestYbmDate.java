package yabomu.album.domain.valueobject;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TestYbmDate {

	@Test
	void testYbmDateStringFmtPtn_nonmark() {
		YbmDate testdate = new YbmDate("20210228", YbmDate.FmtPtn.NONMARK_DATE);
		assertEquals("2021-02-28", testdate.toString());
		assertEquals("20210228", testdate.toNonmarkDate());
		assertEquals("2021-02-28", testdate.toHyphenDate());
		assertEquals("2021年02月28日", testdate.toJpDate());
		assertEquals("2021/02/28", testdate.toSlashDate());
	}
	@Test
	void testYbmDateStringFmtPtn_hyphen() {
		YbmDate testdate = new YbmDate("2021-02-28", YbmDate.FmtPtn.HYPHEN_DATE);
		assertEquals("2021-02-28", testdate.toString());
		assertEquals("20210228", testdate.toNonmarkDate());
		assertEquals("2021-02-28", testdate.toHyphenDate());
		assertEquals("2021年02月28日", testdate.toJpDate());
		assertEquals("2021/02/28", testdate.toSlashDate());
	}
	@Test
	void testYbmDateStringFmtPtn_jp() {
		YbmDate testdate = new YbmDate("2021年02月28日", YbmDate.FmtPtn.JP_DATE);
		assertEquals("2021-02-28", testdate.toString());
		assertEquals("20210228", testdate.toNonmarkDate());
		assertEquals("2021-02-28", testdate.toHyphenDate());
		assertEquals("2021年02月28日", testdate.toJpDate());
		assertEquals("2021/02/28", testdate.toSlashDate());
	}
	@Test
	void testYbmDateStringFmtPtn_slash() {
		YbmDate testdate = new YbmDate("2021/02/28", YbmDate.FmtPtn.SLASH_DATE);
		assertEquals("2021-02-28", testdate.toString());
		assertEquals("20210228", testdate.toNonmarkDate());
		assertEquals("2021-02-28", testdate.toHyphenDate());
		assertEquals("2021年02月28日", testdate.toJpDate());
		assertEquals("2021/02/28", testdate.toSlashDate());
	}

	@Test
	void testYbmDateLocalDateFmtPtn() {
		YbmDate testdate = new YbmDate(LocalDate.of(2021, 2, 28));
		assertEquals("2021-02-28", testdate.toString());
		assertEquals("20210228", testdate.toNonmarkDate());
		assertEquals("2021-02-28", testdate.toHyphenDate());
		assertEquals("2021年02月28日", testdate.toJpDate());
		assertEquals("2021/02/28", testdate.toSlashDate());
	}

	@Test
	void testLocalDateEqualsString() {
		YbmDate localdate = new YbmDate(LocalDate.of(2021, 2, 28));
		YbmDate slashdate = new YbmDate("2021/02/28", YbmDate.FmtPtn.SLASH_DATE);
		YbmDate hyphendate = new YbmDate("2021-02-28", YbmDate.FmtPtn.HYPHEN_DATE);
		YbmDate jpdate = new YbmDate("2021年02月28日", YbmDate.FmtPtn.JP_DATE);
		YbmDate nonmarkdate = new YbmDate("20210228", YbmDate.FmtPtn.NONMARK_DATE);
		assertTrue(localdate.equals(slashdate));
		assertTrue(localdate.equals(hyphendate));
		assertTrue(localdate.equals(jpdate));
		assertTrue(localdate.equals(nonmarkdate));
	}

	@Test
	void testValueOf() {
		YbmDate testdate = new YbmDate(LocalDate.of(2021, 2, 28));
		assertEquals("2021-02-28", testdate.valueOf(YbmDate.FmtPtn.HYPHEN_DATE));
		assertEquals("20210228", testdate.valueOf(YbmDate.FmtPtn.NONMARK_DATE));
		assertEquals("2021年02月28日", testdate.valueOf(YbmDate.FmtPtn.JP_DATE));
		assertEquals("2021/02/28", testdate.valueOf(YbmDate.FmtPtn.SLASH_DATE));
	}


}
