DROP table todo_list;

CREATE TABLE todo_list (
	event_id varchar(30),
	todo_id varchar(30),
	created_at timestamp(3),
	create_user varchar(30),
	updated_at timestamp(6),
	update_user varchar(30),
	title varchar(200),
	content varchar(2000),
	check_list_id varchar(30),
	todo_start_date timestamp(0),
	todo_end_date timestamp(0),
	reminder_type char(1),
	reminder_start_date timestamp(0),
	reminder_end_date timestamp(0),
	reminder_repeat char(4),
	reminder_notice_time integer,
	primary key (event_id, todo_id)
);

comment on table todo_list is 'TODOリスト';
comment on column todo_list.event_id is 'イベントID';
comment on column todo_list.todo_id is 'TODOID';
comment on column todo_list.created_at is '作成日時';
comment on column todo_list.create_user is '作成者';
comment on column todo_list.updated_at is '更新日時';
comment on column todo_list.update_user is '更新者';
comment on column todo_list.title is 'タイトル';
comment on column todo_list.content is '内容';
comment on column todo_list.check_list_id is 'チェックリストID';
comment on column todo_list.todo_start_date is 'TODO開始日時';
comment on column todo_list.todo_end_date is 'TODO終了日時';
comment on column todo_list.reminder_type is 'リマインド種類';
comment on column todo_list.reminder_start_date is 'リマインド開始日時';
comment on column todo_list.reminder_end_date is 'リマインド終了日時';
comment on column todo_list.reminder_repeat is 'リピート設定';
comment on column todo_list.reminder_notice_time is 'リマインダー通知時間';