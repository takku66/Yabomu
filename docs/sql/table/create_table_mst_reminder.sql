-- マスタ系は他のマスタともコード体系をあわせたい
-- 一旦インメモリ内でマスタ情報を保持しておき、形がある程度決まったらDBへ移行させる

DROP table mst_reminder;

CREATE TABLE mst_reminder (
	type char(1),
	code char(),
	description varchar(50),
	primary key (code)
);

comment on table mst_reminder is 'リマインダー';
comment on column mst_reminder.code is 'コード';
comment on column mst_reminder.description is '説明';