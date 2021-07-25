package yabomu.trip.infrastructure.entity;

import java.util.List;

import lombok.Data;

@Data
public class TodoEntity {
	private String eventId;
	private String todoId;
	private String createUserId;
	private String createUserName;
	private String updateUserId;
	private String updateUserName;
	private String createAt;
	private String updateAt;
	private String title;
	private String content;
	private String checkListId;
	private List<CheckItemEntity> checkList;
	private String todoStartDateTime;
	private String todoEndDateTime;
	private String reminderType;
	private String reminderStartDateTime;
	private String reminderEndDateTime;
	private Integer reminderTime;
	private String reminderRepeat;
}
