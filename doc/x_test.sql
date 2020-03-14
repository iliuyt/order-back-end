# create database x_test;
# use x_test;


create table tb_user
(
  id         INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  role_id    INT(11)      NOT NULL DEFAULT '0' COMMENT '角色ID',
  username   VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '用户名',
  password   VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '密码',
  status     INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  deleted_at DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table tb_role
(
  id          INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  name        VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '角色名称',
  description VARCHAR(255) NOT NULL DEFAULT '' COMMENT '描述',
  status      INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at  DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table tb_privileg
(
  id          INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  parent_id   INT(11)      NOT NULL DEFAULT '0' COMMENT '父ID',
  name        VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '权限名称',
  description VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '权限描述',
  code        VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '权限code',
  status      INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at  DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table rel_role_privilegs
(
  id          INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  role_id     INT(50)      NOT NULL DEFAULT '0' COMMENT '角色id',
  privileg_id INT(50)      NOT NULL DEFAULT '0' COMMENT '权限ID',
  status      INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  deleted_at  DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);



create table tb_subject
(
  id          INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  name        VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '课程名称',
  description VARCHAR(255) NOT NULL DEFAULT '' COMMENT '描述',
  status      INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at  DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table tb_teacher
(
  id          INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  name        VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '老师名称',
  description VARCHAR(255) NOT NULL DEFAULT '' COMMENT '描述',
  status      INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by  VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at  DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);



create table tb_subject_time
(
  id           INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  subject_id   INT(50)      NOT NULL DEFAULT '0' COMMENT '课程ID',
  subject_name VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '课程名称',
  teacher_id   INT(50)      NOT NULL DEFAULT '0' COMMENT '教师ID',
  teacher_name VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '老师名称',
  subject_time INT(50)      NOT NULL DEFAULT '0' COMMENT '课程时间长度(分钟)',
  order_time   VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '预约时间',
  status       INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by   VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by   VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at   DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);



create table tb_subject_templete
(
  id               INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  name             VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '模版名称',
  code             VARCHAR(50)   NOT NULL DEFAULT '' COMMENT '模版code',
  subject_time_ids VARCHAR(4000) NOT NULL DEFAULT '' COMMENT '课程模版ID',
  is_default       INT(50)       NOT NULL DEFAULT '0' COMMENT '是否默认模版 0否 1是',
  status           INT(11)       NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by       VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '创建人',
  created_at       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by       VARCHAR(255)  NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at       DATETIME               DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table tb_subject_date
(
  id                  INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  order_date          VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '预约日期',
  subject_templete_id VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '模版ID',
  status              INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by          VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  deleted_at          DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table tb_client
(
  id           INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  name         VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '客户名称',
  weapp_openid VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '微信小程序openid',
  is_order     INT(11)      NOT NULL DEFAULT '0' COMMENT '是否可以预约 0否 1是',
  status       INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by   VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by   VARCHAR(255) NOT NULL DEFAULT '' COMMENT '修改人',
  updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  deleted_at   DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);


create table rel_client_order
(
  id              INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  client_id       INT(11)      NOT NULL DEFAULT '0' COMMENT '客户id',
  order_date      VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '预约日期',
  subject_time_id INT(11)      NOT NULL DEFAULT '0' COMMENT '预约课程时间',
  status          INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  created_by      VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  deleted_at      DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);

create table rel_client_order_history
(
  id              INT(11) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
  client_id       INT(11)      NOT NULL DEFAULT '0' COMMENT '客户id',
  order_date      VARCHAR(50)  NOT NULL DEFAULT '' COMMENT '预约日期',
  subject_time_id INT(11)      NOT NULL DEFAULT '0' COMMENT '预约课程时间',
  action          INT(11)      NOT NULL DEFAULT '0' COMMENT '状态 0取消 1预约',
  created_by      VARCHAR(255) NOT NULL DEFAULT '' COMMENT '创建人',
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  deleted_at      DATETIME              DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)'
);


CREATE TABLE tb_conf (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
	conf_key VARCHAR ( 50 ) NOT NULL DEFAULT '' COMMENT '配置key',
	conf_value VARCHAR ( 2000 ) NOT NULL DEFAULT '' COMMENT '配置value',
	created_by VARCHAR ( 255 ) NOT NULL DEFAULT '' COMMENT '创建人',
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	deleted_at DATETIME DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)' 
);


CREATE TABLE tb_client_order_checked (
	id INT ( 11 ) PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
	client_id int NOT NULL DEFAULT '0' COMMENT '客户ID',
	subject_time_id int NOT NULL DEFAULT '0' COMMENT '课程ID',
	created_by VARCHAR ( 255 ) NOT NULL DEFAULT '' COMMENT '创建人',
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
	deleted_at DATETIME DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)' 
);
