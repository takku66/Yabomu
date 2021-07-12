package yabomu.trip.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class TodoEntity {
	private Integer eventId;
	private Integer todoId;
	private LocalDateTime createDateTime;
	private String createUser;
	private LocalDateTime updateDateTime;
	private String updateUser;
	private String title;
	private String content;
	private Integer checkListId;
	private String reminderType;
	private LocalDateTime scheduledStartDateTime;
	private Integer reminderTime;
	private Integer reminderRepeat;
	private List<CheckItemEntity> checkList;
}
