package yabomu.trip.infrastructure.entity;

import lombok.Data;

@Data
public class CheckItemEntity {
	private Long eventId;
	private Long todoId;
	private Integer seq;
	private String content;
	private String completed;
	private Long createUserId;
	private Long updateUserId;
	private String createDateTime;
	private String updateDateTime;

}
