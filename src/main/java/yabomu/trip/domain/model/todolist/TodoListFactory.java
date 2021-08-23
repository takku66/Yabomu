package yabomu.trip.domain.model.todolist;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.ReminderRepeat;
import yabomu.trip.domain.valueobject.ReminderTime;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;

public class TodoListFactory {

	public static final List<Todo> createTodoListForTest(){
		List<Todo> testlist = new ArrayList<Todo>();
		for(int i = 0; i < 10; i++) {
			List<CheckItem> clvaList = new ArrayList<CheckItem>();
			for(int j = 0; j < 10; j++) {
				CheckItem clva = CheckItem.builder()
									.eventId((long)i*i)
									.todoId((long)i*i)
									.seq(i)
									.content("内容" + i + "-" + j)
									.completed(i+j%3==0)
									.createUserId(new UserId((long)i))
									.createDateTime(new YbmDate(LocalDate.now().plusDays(i)))
									.updateUserId(new UserId((long)i))
									.updateDateTime(new YbmDate(LocalDate.now().plusDays(i)))
									.build();
				clvaList.add(clva);
			}

			Todo todo = Todo.builder()
							.eventId((long)i)
							.todoId((long)i)
							.title("タイトル" + i)
							.content("内容" + i)
							.checkList(clvaList)
							.reminderTime(ReminderTime.selectBy(i*5))
							.reminderRepeat(ReminderRepeat.selectBy("D" + i))
							.createUser(new YbmUser(new UserId((long)i), new UserName("登録者名前" + i)))
							.createDateTime(new YbmDate(LocalDate.now().plusDays(i)))
							.updateUser(new YbmUser(new UserId((long)i), new UserName("更新者名前" + i)))
							.updateDateTime(new YbmDate(LocalDate.now().plusDays(i)))
							.todoStartDateTime(new YbmDate(LocalDate.now().plusDays(i)))
							.build();
			testlist.add(todo);
		}
		return testlist;
	}
}
