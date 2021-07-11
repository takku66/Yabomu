package yabomu.trip.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class TodoEntity {
	private String todoId;
	private String title;
	private String content;
	private List<CheckItemEntity> checkList;
	private Integer reminderTime;
	private Integer reminderRepeat;
	private String createUserId;
	private String updateUserId;
	private LocalDateTime createDateTime;
	private LocalDateTime updateDateTime;
	private LocalDateTime scheduledStartDateTime;
}
