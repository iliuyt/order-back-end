/*
 Navicat Premium Data Transfer

 Source Server         : docker
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : x_test

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 23/09/2019 22:37:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rel_client_order
-- ----------------------------
DROP TABLE IF EXISTS `rel_client_order`;
CREATE TABLE `rel_client_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `client_id` int(11) NOT NULL DEFAULT '0' COMMENT '客户id',
  `order_date` varchar(50) NOT NULL DEFAULT '' COMMENT '预约日期',
  `subject_time_id` int(11) NOT NULL DEFAULT '0' COMMENT '预约课程时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for rel_client_order_history
-- ----------------------------
DROP TABLE IF EXISTS `rel_client_order_history`;
CREATE TABLE `rel_client_order_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `client_id` int(11) NOT NULL DEFAULT '0' COMMENT '客户id',
  `order_date` varchar(50) NOT NULL DEFAULT '' COMMENT '预约日期',
  `subject_time_id` int(11) NOT NULL DEFAULT '0' COMMENT '预约课程时间',
  `action` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0取消 1预约',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for rel_role_privilegs
-- ----------------------------
DROP TABLE IF EXISTS `rel_role_privilegs`;
CREATE TABLE `rel_role_privilegs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_id` int(50) NOT NULL DEFAULT '0' COMMENT '角色id',
  `privileg_id` int(50) NOT NULL DEFAULT '0' COMMENT '权限ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_client
-- ----------------------------
DROP TABLE IF EXISTS `tb_client`;
CREATE TABLE `tb_client` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '客户名称',
  `weapp_openid` varchar(50) NOT NULL DEFAULT '' COMMENT '微信小程序openid',
  `is_order` int(11) NOT NULL DEFAULT '0' COMMENT '是否可以预约 0否 1是',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_privileg
-- ----------------------------
DROP TABLE IF EXISTS `tb_privileg`;
CREATE TABLE `tb_privileg` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '权限名称',
  `description` varchar(50) NOT NULL DEFAULT '' COMMENT '权限描述',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT '权限code',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '角色名称',
  `description` varchar(255) NOT NULL DEFAULT '',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='描述';

-- ----------------------------
-- Table structure for tb_subject
-- ----------------------------
DROP TABLE IF EXISTS `tb_subject`;
CREATE TABLE `tb_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '课程名称',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_subject_date
-- ----------------------------
DROP TABLE IF EXISTS `tb_subject_date`;
CREATE TABLE `tb_subject_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_date` varchar(50) NOT NULL DEFAULT '' COMMENT '预约日期',
  `subject_templete_id` varchar(50) NOT NULL DEFAULT '' COMMENT '模版ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_subject_templete
-- ----------------------------
DROP TABLE IF EXISTS `tb_subject_templete`;
CREATE TABLE `tb_subject_templete` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '模版名称',
  `code` varchar(50) NOT NULL DEFAULT '' COMMENT '模版code',
  `subject_time_ids` varchar(4000) NOT NULL DEFAULT '' COMMENT '课程模版ID',
  `is_default` int(50) NOT NULL DEFAULT '0' COMMENT '是否默认模版 0否 1是',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_subject_time
-- ----------------------------
DROP TABLE IF EXISTS `tb_subject_time`;
CREATE TABLE `tb_subject_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `subject_id` int(50) NOT NULL DEFAULT '0' COMMENT '课程ID',
  `subject_name` varchar(50) NOT NULL DEFAULT '' COMMENT '课程名称',
  `teacher_id` int(50) NOT NULL DEFAULT '0' COMMENT '教师ID',
  `teacher_name` varchar(50) NOT NULL DEFAULT '' COMMENT '老师名称',
  `subject_time` int(50) NOT NULL DEFAULT '0' COMMENT '课程时间长度(分钟)',
  `order_time` varchar(50) NOT NULL DEFAULT '' COMMENT '预约时间',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_teacher
-- ----------------------------
DROP TABLE IF EXISTS `tb_teacher`;
CREATE TABLE `tb_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '老师名称',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '描述',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_by` varchar(255) NOT NULL DEFAULT '' COMMENT '修改人',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_id` int(11) NOT NULL DEFAULT '0' COMMENT '角色ID',
  `username` varchar(50) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(50) NOT NULL DEFAULT '' COMMENT '密码',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
