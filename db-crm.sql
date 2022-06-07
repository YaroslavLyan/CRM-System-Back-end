CREATE DATABASE "2msCrm"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

create table admins (
	id serial Primary key,
	name char(30) DEFAULT 'Not name' not null,
	passw char(30) not null,
	rule smallint DEFAULT 100 not null,
	active smallint DEFAULT 0,
	tel char(12) DEFAULT '380-------' not null,
	email char(50)
);

create index ind_admins_tel on admins using hash (tel);
create index ind_admins_passw on admins using hash (passw);
create index ind_admins_active on admins using hash (active);

CREATE FUNCTION check_email_and_password(l_email CHARACTER VARYING, l_pass CHARACTER VARYING) RETURNS boolean AS
$$
SELECT EXISTS(SELECT * FROM admins WHERE admins.email = l_login AND admins.pass = l_pass );
$$
LANGUAGE sql;

INSERT INTO admins (id, name, passw, rule, active, tel, email) VALUES
	 (1,'Test','123',100,1,'380555555555','test@test.ua');
	 
create table incoming_time (
	id serial Primary key,
	data date not null,
	admin_id smallint not null,
	ip_addr varchar(50) not null,
	comment text,
	
	constraint fk_incoming_admins foreign key (admin_id) references admins(id)
);

create table clients (
	id serial Primary key,
	fio char(100) not null,
	tel char(12) default '380-------' not null,
	email char(50),
	site char(50),
	messanger text,
	card_num char(10) default 'Not',
	card_summ smallint default 0,
	comment text
);

create index ind_clients_tel on clients (tel);


create table list_values (
	id serial Primary key,
	param varchar(50) not null,
	param_name char(50) not null,
	value text,
	sys smallint default 0 not null,
	icon char(30)	
);

create index ind_list_values_param on list_values (param);

INSERT INTO list_values (id, param,param_name,value,sys,icon) VALUES
	 (1,'status','Статус','Лид',1,'fiber_new'),
	 (2,'status','Статус','Сделка',1,'emoji_people'),
	 (3,'status','Статус','Торги',1,'attach_money'),
	 (4,'status','Статус','Старт',1,'directions_run'),
	 (5,'status','Статус','Финал',1,'outlined_flag'),
	 (23,'delete_reason','Причина удаления','Дубль заказа',1,NULL),
	 (7,'state','Состояние','В работе',1,'next_week'),
	 (8,'state','Состояние','Ожидание',1,'hourglass_empty'),
	 (9,'state','Состояние','Удален',1,'cancel'),
	 (10,'state','Состояние','Завершен',1,'assignment_turned_in'),
	 (11,'object_type','Тип объекта','Офис',1,'account_balance'),
	 (12,'object_type','Тип объекта','Квартира',1,'apartment'),
	 (13,'object_type','Тип объекта','Дом',1,'house'),
	 (14,'service','Вид услуги','Мойка окон',0,NULL),
	 (15,'service','Вид услуги','Генеральная уборка',0,NULL),
	 (16,'service','Вид услуги','Послестроительная уборка',0,NULL),
	 (17,'service','Вид услуги','Поддерживающая уборка',0,NULL),
	 (18,'service','Вид услуги','Химчистка',0,NULL),
	 (19,'payment_type','Форма оплаты','Наличные',1,'money'),
	 (20,'payment_type','Форма оплаты','Безнал',1,'payment'),
	 (21,'payment','Тип оплаты','Предоплата',1,'next_plan'),
	 (22,'payment','Тип оплаты','Постоплата',1,'offline_pin'),
	 (24,'delete_reason','Причина удаления','Спам',1,NULL),
	 (25,'delete_reason','Причина удаления','Случайно создан',1,NULL),
	 (26,'delete_reason','Причина удаления','Другое',1,NULL),
	 (27,'delete_reason','Причина удаления','Дорого',1,NULL),
	 (28,'delete_reason','Причина удаления','Заказали у конкурентов',1,NULL),
	 (29,'delete_reason','Причина удаления','Не подошли сроки',1,NULL),
	 (30,'delete_reason','Причина удаления','Сверх срочность',1,NULL),
	 (31,'delete_reason','Причина удаления','Вид оплат',1,NULL),
	 (32,'delete_reason','Причина удаления','Не выполнимо',1,NULL),
	 (33,'delete_reason','Причина удаления','Передумал',1,NULL);

create table payment (
	id serial Primary key,
	param char(50) not null,
	param_name char(50) not null,
	value text,
	sys smallint default 0 not null,
	icon char(30)	
);
INSERT INTO payment (id, param,param_name,value,sys,icon) VALUES
	 (19,'payment_type','Форма оплаты','Наличные',1,'money'),
	 (20,'payment_type','Форма оплаты','Безнал',1,'payment'),
	 (21,'payment','Тип оплаты','Предоплата',1,'next_plan'),
	 (22,'payment','Тип оплаты','Постоплата',1,'offline_pin');
	
create index ind_payment_param on payment (param);



create table orders (
	id serial Primary key,
	name char(200),
	create_date smallint not null,
	status smallint default 0 not null,
	state smallint default 7 not null,
	addr char(200),
	client_id smallint default 0 not null,
	object_type smallint default 13 not null,
	service text,
	description text,
	calc_summ int default 0 not null,
	recived_summ int default 0 not null,
	payment text,
	payment_type smallint default 19 not null,
	manager_id smallint default 0 not null,
	executor_id smallint default 0 not null,
	rating_date date,
	start_date date,
	final_date date,
	details text,
	future_contact_date date,
	satisfaction_rating smallint default 0 not null,
	resume text,
	base_summ int default 0 not null,
	base_summ_details text,
	close_date date,
	delete_reason text,
	card_num char(25),
	card_summ int default 0 not null,
	mmb_pay int default 0 not null,
	
	constraint fk_orders_list_values_status foreign key (status) references list_values (id),
	constraint fk_orders_list_values_state foreign key (state) references list_values (id),
	constraint fk_orders_list_values_object_type foreign key (object_type) references list_values (id),
	constraint fk_orders_list_values_payment_type foreign key (payment_type) references list_values (id),
	constraint fk_orders_clients foreign key (client_id) references clients (id),
	constraint fk_orders_admins foreign key (manager_id) references admins(id)
);

create index ind_orders_status on orders (status);
create index ind_orders_state on orders (state);
create index ind_orders_client_id on orders (client_id);
create index ind_orders_service on orders (service);
create index ind_orders_manager_id on orders (manager_id);
create index ind_orders_rating_date on orders (rating_date);
create index ind_orders_start_date on orders (start_date);
create index ind_orders_final_date on orders (final_date);
create index ind_orders_future_contact_date on orders (future_contact_date);
create index ind_orders_satisfaction_rating on orders (satisfaction_rating);
create index ind_orders_close_date on orders (close_date);
create index ind_orders_delete_reason on orders (delete_reason);
create index ind_orders_mmb_pay on orders (mmb_pay);

