DROP TABLE IF EXISTS todo_list;

CREATE TABLE IF NOT EXISTS todo_list (
	event_id bigint,
	todo_id bigint,
	create_date_time timestamp(3),
	create_user bigint,
	update_date_time timestamp(6),
	update_user bigint,
	title varchar(200),
	content varchar(2000),
	todo_start_date_time timestamp(0),
	todo_end_date_time timestamp(0),
	reminder_repeat char(4),
	reminder_notice_time integer,
	primary key (event_id, todo_id)
);

comment on table todo_list is 'TODOリスト';
comment on column todo_list.event_id is 'イベントID';
comment on column todo_list.todo_id is 'TODOID';
comment on column todo_list.create_date_time is '作成日時';
comment on column todo_list.create_user is '作成者';
comment on column todo_list.update_date_time is '更新日時';
comment on column todo_list.update_user is '更新者';
comment on column todo_list.title is 'タイトル';
comment on column todo_list.content is '内容';
comment on column todo_list.todo_start_date_time is 'TODO開始日時';
comment on column todo_list.todo_end_date_time is 'TODO終了日時';
comment on column todo_list.reminder_repeat is 'リピート設定';
comment on column todo_list.reminder_notice_time is 'リマインダー通知時間';