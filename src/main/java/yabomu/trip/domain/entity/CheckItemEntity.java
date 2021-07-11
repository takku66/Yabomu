package yabomu.trip.domain.entity;

import lombok.Data;

@Data
public class CheckItemEntity {
	private String checkListId;
	private String content;
	private boolean completed;
}
