package yabomu.trip.infrastructure.entity;

import lombok.Data;

@Data
public class CheckItemEntity {
	private String todoId;
	private Integer seq;
	private String content;
	private String completed;

}
