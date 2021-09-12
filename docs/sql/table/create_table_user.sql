DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
	user_id bigint,
	create_date_time timestamp(3),
	create_user bigint,
	update_date_time timestamp(6),
	update_user bigint,
	user_name varchar(200),
	email_address varchar(300),
	tell_no varchar(20),
	primary key (user_id)
);

comment on table users is 'ユーザー情報';
comment on column users.user_id is 'ユーザーID';
comment on column users.create_date_time is '作成日時';
comment on column users.create_user is '作成者';
comment on column users.update_date_time is '更新日時';
comment on column users.update_user is '更新者';
comment on column users.user_name is 'ユーザー名';
comment on column users.email_address is 'メールアドレス';
comment on column users.tell_no is '電話番号';
