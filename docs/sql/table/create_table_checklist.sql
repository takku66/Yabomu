DROP TABLE IF EXISTS check_list;

CREATE TABLE IF NOT EXISTS check_list (
	event_id bigint,
	todo_id bigint,
	seq integer,
	update_date_time timestamp(6),
	content varchar(2000),
	is_completed char(1),
	primary key (event_id, todo_id, seq)
);

comment on table check_list is 'チェックリスト';
comment on column check_list.event_id is 'イベントID';
comment on column check_list.todo_id is 'TODOID';
comment on column check_list.seq is '連番';
comment on column check_list.update_date_time is '更新日時';
comment on column check_list.content is '内容';
comment on column check_list.is_completed is '完了/未完了';