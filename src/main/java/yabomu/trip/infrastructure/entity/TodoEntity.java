package yabomu.trip.infrastructure.entity;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class TodoEntity {
	private Long eventId;
	private Long todoId;
	private Long createUserId;
	private String createUserName;
	private Long updateUserId;
	private String updateUserName;
	private LocalDateTime createDateTime;
	private LocalDateTime updateDateTime;
	private String title;
	private String content;
	private List<CheckItemEntity> checkList;
	private LocalDateTime todoStartDateTime;
	private LocalDateTime todoEndDateTime;
	private Integer reminderNoticeTime;
	private String reminderRepeat;
}
