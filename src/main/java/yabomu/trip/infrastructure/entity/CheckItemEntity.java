package yabomu.trip.infrastructure.entity;

import java.time.LocalDateTime;

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
	private LocalDateTime createDateTime;
	private LocalDateTime updateDateTime;

}
