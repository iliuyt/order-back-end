-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: x_test
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rel_client_order`
--

DROP TABLE IF EXISTS `rel_client_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_client_order`
--

LOCK TABLES `rel_client_order` WRITE;
/*!40000 ALTER TABLE `rel_client_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `rel_client_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_client_order_history`
--

DROP TABLE IF EXISTS `rel_client_order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_client_order_history`
--

LOCK TABLES `rel_client_order_history` WRITE;
/*!40000 ALTER TABLE `rel_client_order_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `rel_client_order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rel_role_privilegs`
--

DROP TABLE IF EXISTS `rel_role_privilegs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rel_role_privilegs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_id` int(50) NOT NULL DEFAULT '0' COMMENT '角色id',
  `privileg_id` int(50) NOT NULL DEFAULT '0' COMMENT '权限ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_role_privilegs`
--

LOCK TABLES `rel_role_privilegs` WRITE;
/*!40000 ALTER TABLE `rel_role_privilegs` DISABLE KEYS */;
/*!40000 ALTER TABLE `rel_role_privilegs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_client`
--

DROP TABLE IF EXISTS `tb_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_client`
--

LOCK TABLES `tb_client` WRITE;
/*!40000 ALTER TABLE `tb_client` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_privileg`
--

DROP TABLE IF EXISTS `tb_privileg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_privileg`
--

LOCK TABLES `tb_privileg` WRITE;
/*!40000 ALTER TABLE `tb_privileg` DISABLE KEYS */;
INSERT INTO `tb_privileg` VALUES (1,0,'全部权限','','#_#',1,'','2019-09-16 15:24:13','','2019-09-16 15:24:13',NULL),(6,1,'111','111','111',1,'1','2019-09-16 16:35:44','1','2019-09-16 16:35:44','2019-09-16 17:05:29'),(7,6,'222','222','222',1,'1','2019-09-16 16:35:48','1','2019-09-16 16:35:48',NULL),(8,7,'333','333','333',1,'1','2019-09-16 16:38:03','1','2019-09-16 16:38:03',NULL),(9,7,'4444','444','4444',1,'1','2019-09-16 16:38:20','1','2019-09-16 16:38:20',NULL),(10,7,'555','555','555',1,'1','2019-09-16 16:38:30','1','2019-09-16 16:38:30',NULL);
/*!40000 ALTER TABLE `tb_privileg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_role`
--

DROP TABLE IF EXISTS `tb_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  COMMENT='描述';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_role`
--

LOCK TABLES `tb_role` WRITE;
/*!40000 ALTER TABLE `tb_role` DISABLE KEYS */;
INSERT INTO `tb_role` VALUES (2,'12311','123',1,'1','2019-09-16 14:22:18','1','2019-09-16 15:11:10',NULL),(3,'1231222','123',1,'1','2019-09-16 14:25:31','1','2019-09-16 15:11:23',NULL),(4,'12312','123123',1,'1','2019-09-16 22:59:52','1','2019-09-16 22:59:52',NULL);
/*!40000 ALTER TABLE `tb_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_subject`
--

DROP TABLE IF EXISTS `tb_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_subject`
--

LOCK TABLES `tb_subject` WRITE;
/*!40000 ALTER TABLE `tb_subject` DISABLE KEYS */;
INSERT INTO `tb_subject` VALUES (1,'大运动','fasf',1,'1','2019-09-16 23:01:44','1','2019-09-17 10:31:41',NULL);
/*!40000 ALTER TABLE `tb_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_subject_date`
--

DROP TABLE IF EXISTS `tb_subject_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tb_subject_date` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `order_date` varchar(50) NOT NULL DEFAULT '' COMMENT '预约日期',
  `subject_templete_id` varchar(50) NOT NULL DEFAULT '' COMMENT '模版ID',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态 0禁用 1启用',
  `created_by` varchar(255) NOT NULL DEFAULT '' COMMENT '创建人',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `deleted_at` datetime DEFAULT NULL COMMENT '逻辑删除(IS NULL判断)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_subject_date`
--

LOCK TABLES `tb_subject_date` WRITE;
/*!40000 ALTER TABLE `tb_subject_date` DISABLE KEYS */;
INSERT INTO `tb_subject_date` VALUES (1,'2019-09-03','1',1,'1','2019-09-17 15:37:25',NULL),(2,'2019-09-04','1',1,'1','2019-09-17 15:39:22',NULL),(3,'2019-09-25','1',1,'1','2019-09-17 15:39:51','2019-09-17 15:56:31'),(4,'2019-09-18','1',1,'1','2019-09-17 15:39:56','2019-09-17 15:56:28'),(5,'2019-09-25','1',1,'1','2019-09-17 15:55:52','2019-09-17 15:56:25');
/*!40000 ALTER TABLE `tb_subject_date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_subject_templete`
--

DROP TABLE IF EXISTS `tb_subject_templete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_subject_templete`
--

LOCK TABLES `tb_subject_templete` WRITE;
/*!40000 ALTER TABLE `tb_subject_templete` DISABLE KEYS */;
INSERT INTO `tb_subject_templete` VALUES (1,'123','123','4,2',0,1,'1','2019-09-17 15:06:07','1','2019-09-17 15:06:21',NULL);
/*!40000 ALTER TABLE `tb_subject_templete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_subject_time`
--

DROP TABLE IF EXISTS `tb_subject_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_subject_time`
--

LOCK TABLES `tb_subject_time` WRITE;
/*!40000 ALTER TABLE `tb_subject_time` DISABLE KEYS */;
INSERT INTO `tb_subject_time` VALUES (1,1,'大运动',1,'A老师',12,'09:40',1,'1','2019-09-17 10:46:48','1','2019-09-17 13:10:26',NULL),(2,1,'大运动',1,'A老师',100,'06:00',1,'1','2019-09-17 10:51:47','1','2019-09-17 10:51:47',NULL),(3,1,'大运动',1,'A老师',90,'06:40',1,'1','2019-09-17 10:52:39','1','2019-09-17 10:55:21',NULL),(4,1,'大运动',1,'A老师',12,'06:00',1,'1','2019-09-17 13:10:19','1','2019-09-17 13:10:19',NULL),(5,1,'大运动',1,'A老师',100,'06:10',1,'1','2019-09-17 13:36:45','1','2019-09-17 13:36:45',NULL);
/*!40000 ALTER TABLE `tb_subject_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_teacher`
--

DROP TABLE IF EXISTS `tb_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_teacher`
--

LOCK TABLES `tb_teacher` WRITE;
/*!40000 ALTER TABLE `tb_teacher` DISABLE KEYS */;
INSERT INTO `tb_teacher` VALUES (1,'A老师','132asdfasf',1,'1','2019-09-16 23:00:43','1','2019-09-17 10:31:32',NULL);
/*!40000 ALTER TABLE `tb_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_user`
--

DROP TABLE IF EXISTS `tb_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_user`
--

LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,2,'superadmin','e10adc3949ba59abbe56e057f20f883e',1,'','2019-09-16 17:29:49',NULL),(2,2,'admin','c4ca4238a0b923820dcc509a6f75849b',1,'1','2019-09-16 22:33:05',NULL);
/*!40000 ALTER TABLE `tb_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-17 16:02:22
