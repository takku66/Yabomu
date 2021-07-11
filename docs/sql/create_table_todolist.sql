DROP table todo_list;

CREATE TABLE todo_list (
	event_id integer,
	todo_id integer,
	created_at timestamp(3),
	updated_at timestamp(6),
	title varchar(200),
	content varchar(2000),
	check_list_id integer,
	reminder_type char(3),
	reminder_start_date timestamp(0),
	primary key (event_id, todo_id)
);

comment on table todo_list is 'TODOリスト';
comment on column todo_list.event_id is 'イベントID';
comment on column todo_list.todo_id is 'TODOID';
comment on column todo_list.created_at is '作成日時';
comment on column todo_list.created_user is '作成者';
comment on column todo_list.updated_at is '更新日時';
comment on column todo_list.updated_user is '更新者';
comment on column todo_list.title is 'タイトル';
comment on column todo_list.content is '内容';
comment on column todo_list.check_list_id is 'チェックリストID';
comment on column todo_list.reminder_type is 'リマインド種類';
comment on column todo_list.reminder_start_date is 'リマインド開始日時';
