DROP table authorizations;

CREATE TABLE authorizations (
	user_id bigint,
	created_at timestamp(3),
	create_user bigint,
	updated_at timestamp(6),
	update_user bigint,
	password varchar(500),
	primary key (user_id)
);

comment on table authorizations is '認証情報';
comment on column authorizations.user_id is 'ユーザーID';
comment on column authorizations.created_at is '作成日時';
comment on column authorizations.create_user is '作成者';
comment on column authorizations.updated_at is '更新日時';
comment on column authorizations.update_user is '更新者';
comment on column authorizations.password is 'パスワード';
