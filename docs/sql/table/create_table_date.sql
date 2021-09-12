DROP TABLE IF EXISTS base_date;

CREATE TABLE IF NOT EXISTS base_date (
	base_date date,
	primary key (base_date)
);

comment on table base_date is '基準日';
comment on column base_date.base_date is '基準日';
