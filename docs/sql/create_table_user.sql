DROP table users;

CREATE TABLE users (
	user_id integer,
	created_at timestamp(3),
	updated_at timestamp(6),
	user_name varchar(200),
	email_address varchar(300),
	tell_no varchar(20),
	primary key (user_id)
);

comment on table users is 'ユーザー情報';
comment on column users.user_id is 'ユーザーID';
comment on column users.created_at is '作成日時';
comment on column users.updated_at is '更新日時';
comment on column users.user_name is 'ユーザー名';
comment on column users.email_address is 'メールアドレス';
comment on column users.tell_no is '電話番号';
