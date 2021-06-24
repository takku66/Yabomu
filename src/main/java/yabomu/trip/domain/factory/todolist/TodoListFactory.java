package yabomu.trip.domain.factory.todolist;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import yabomu.trip.domain.model.todolist.CheckItem;
import yabomu.trip.domain.model.todolist.ReminderConfig;
import yabomu.trip.domain.model.todolist.Todo;
import yabomu.trip.domain.model.user.YbmUser;
import yabomu.trip.domain.valueobject.UserId;
import yabomu.trip.domain.valueobject.UserName;
import yabomu.trip.domain.valueobject.YbmDate;

public class TodoListFactory {

	public static final List<Todo> createTodoListForTest(){
		List<Todo> testlist = new ArrayList<Todo>();
		for(int i = 0; i < 10; i++) {
			List<CheckItem> clvaList = new ArrayList<CheckItem>();
			for(int j = 0; j < 10; j++) {
				CheckItem clva = new CheckItem(
									String.format("0000", i) + String.format("00", j),
									"内容" + i + "-" + j,
									i+j%3==0);
				clvaList.add(clva);
			}

			Todo todo = new Todo(String.format("0000", i),
								"タイトル" + i,
								"内容" + i,
								clvaList,
								ReminderConfig.Time.selectBy(i*5),
								ReminderConfig.Repeat.selectBy(i),
								new YbmUser(new UserId(UUID.randomUUID().toString()),
											new UserName("登録者名前" + i)),
								new YbmUser(new UserId(UUID.randomUUID().toString()),
											new UserName("更新者名前" + i)),
								new YbmDate(LocalDate.now().plusDays(i)),
								new YbmDate(LocalDate.now().plusDays(i)),
								new YbmDate(LocalDate.now().plusDays(i)));
			testlist.add(todo);
		}
		return testlist;
	}
}
