drop table if exists branas.card;
drop table if exists branas.column;
drop table if exists branas.board;

create table branas.board (
	id_board serial primary key,
	name text
);

create table branas.column (
	id_column serial primary key,
	id_board integer references branas.board (id_board),
	name text,
	has_estimative boolean,
	index integer
);

create table branas.card (
	id_card serial primary key,
	id_column integer references branas.column (id_column),
	title text,
	estimative integer,
	index integer
);

insert into branas.board (name) values ('Projeto 1');
insert into branas.column (id_board, name, has_estimative) values (1, 'Coluna A', true);
insert into branas.column (id_board, name, has_estimative) values (1, 'Coluna B', true);
insert into branas.column (id_board, name, has_estimative) values (1, 'Coluna C', true);
insert into branas.card (id_column, title, estimative) values (1, 'Atividade 1', 3);
insert into branas.card (id_column, title, estimative) values (1, 'Atividade 2', 2);
insert into branas.card (id_column, title, estimative) values (1, 'Atividade 3', 1);