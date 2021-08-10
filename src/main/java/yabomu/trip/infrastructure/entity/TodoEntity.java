package yabomu.trip.infrastructure.entity;

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
	private String createAt;
	private String updateAt;
	private String title;
	private String content;
	private List<CheckItemEntity> checkList;
	private String todoStartDateTime;
	private String todoEndDateTime;
	private String reminderType;
	private String reminderStartDateTime;
	private String reminderEndDateTime;
	private Integer reminderTime;
	private String reminderRepeat;
}
