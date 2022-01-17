import {ICheckItemData} from "./ICheckItemData";

export interface ITodoData {
	eventId: string;
	todoId:	string;
	title: string;
	content: string;
	checkList: Array<ICheckItemData>;
	todoStartDate: string;
	todoStartTime: string;
	todoEndDateTime: string;
	reminderRepeat: string;
	reminderNoticeTime: string;
	createUserId: string;
	createUserName: string;
	createDatetime: string;
	updateUserId: string;
	updateUserName: string;
	updateDatetime: string;
}