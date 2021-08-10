DROP table check_list;

CREATE TABLE check_list (
	event_id bigint,
	todo_id bigint,
	check_list_seq integer,
	created_at timestamp(3),
	create_user bigint,
	updated_at timestamp(6),
	update_user bigint,
	content varchar(2000),
	is_completed char(1),
	primary key (event_id, todo_id, check_list_id)
);

comment on table check_list is 'TODOリスト';
comment on column check_list.event_id is 'イベントID';
comment on column check_list.todo_id is 'TODOID';
comment on column check_list.check_list_id is 'チェックリストID';
comment on column check_list.created_at is '作成日時';
comment on column check_list.create_user is '作成者';
comment on column check_list.updated_at is '更新日時';
comment on column check_list.update_user is '更新者';
comment on column check_list.content is '内容';
comment on column check_list.is_completed is '完了/未完了';