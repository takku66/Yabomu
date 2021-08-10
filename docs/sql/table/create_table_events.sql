DROP table events;

CREATE TABLE events (
	event_id bigint,
	created_at timestamp(3),
	create_user varchar(30),
	updated_at timestamp(6),
	update_user varchar(30),
	event_name varchar(200),
	content varchar(2000),
	planed_start_date timestamp(0),
	planed_end_date timestamp(0),
	place varchar(500),
	primary key (event_id)
);

comment on table events is 'イベント情報';
comment on column events.event_id is 'イベントID';
comment on column events.created_at is '作成日時';
comment on column events.create_user is '作成者';
comment on column events.updated_at is '更新日時';
comment on column events.update_user is '更新者';
comment on column events.event_name is 'イベント名';
comment on column events.content is '内容';
comment on column events.planed_start_date is '予定開始日時';
comment on column events.planed_end_date is '予定終了日時';
comment on column events.place is '場所';
