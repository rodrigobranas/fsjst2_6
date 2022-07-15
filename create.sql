drop table branas.card;
drop table branas.column;
drop table branas.board;

create table branas.board (
	id_board serial primary key,
	name text
);

create table branas.column (
	id_column serial primary key,
	id_board integer references branas.board (id_board),
	name text,
	has_estimative boolean
);

create table branas.card (
	id_card serial primary key,
	id_column integer references branas.column (id_column),
	title text,
	estimative integer
);

insert into branas.board (id_board, name) values (1, 'Projeto 1');
insert into branas.column (id_column, id_board, name, has_estimative) values (1, 1, 'Coluna A', true);
insert into branas.column (id_column, id_board, name, has_estimative) values (2, 1, 'Coluna B', true);
insert into branas.column (id_column, id_board, name, has_estimative) values (3, 1, 'Coluna C', true);
insert into branas.card (id_card, id_column, title, estimative) values (1, 1, 'Atividade 1', 3);
insert into branas.card (id_card, id_column, title, estimative) values (2, 1, 'Atividade 2', 2);
insert into branas.card (id_card, id_column, title, estimative) values (3, 1, 'Atividade 3', 1);