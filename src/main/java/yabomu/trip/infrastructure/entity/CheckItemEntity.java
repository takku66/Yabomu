package yabomu.trip.infrastructure.entity;

import lombok.Data;

@Data
public class CheckItemEntity {

	private String checkListId;
	private String content;
	private boolean completed = false;

}
