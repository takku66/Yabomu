DROP TABLE IF EXISTS authorizations;

CREATE TABLE IF NOT EXISTS authorizations (
	user_id bigint,
	create_date_time timestamp(3),
	create_user bigint,
	update_date_time timestamp(6),
	update_user bigint,
	password varchar(500),
	primary key (user_id)
);

comment on table authorizations is '認証情報';
comment on column authorizations.user_id is 'ユーザーID';
comment on column authorizations.create_date_time is '作成日時';
comment on column authorizations.create_user is '作成者';
comment on column authorizations.update_date_time is '更新日時';
comment on column authorizations.update_user is '更新者';
comment on column authorizations.password is 'パスワード';
