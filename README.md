### 后台管理API

提供后台管理相关API和定时任务

### 规范与使用参照egg

 [EGG官网](https://eggjs.org/zh-cn/)
 
 
 
### 安装与启动

    npm install
    
    node server.js
    或
    pm2 start package.json
    
    
### 请求访问

   http://localhost:7001

### 调试

    npm run dev
    
    
### 同步mysql数据库

    npm run auto
    
    
### 测试

    npm run test-local

### 服务依赖

* 阿里云oss

### 接口

#### 用户模块

##### 获取登录二维码

请求地址
    
    GET /user/qrcode
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.key | string | 登录请求使用的key |
  | data.url | string | 登录二维码URL地址 |

##### 登录

请求地址
    
    POST /user/login
    
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | key | string | Y | 登录二维码返回的key |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.exp | number | 过期时间 |
  | data.token | string | 授权token |
  
  
  
##### 获取用户信息

请求地址
    
    GET /user/info
    
    
##### 获取用户信息


头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |

    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.headimgurl | string | 微信头像 |
  | data.nickname | string | 微信昵称 |
  | data.openid | string | 微信openid |

#### 主体模块

##### 根据主体渠道分组查询主体列表

请求地址
    
    GET /subject/channel/group

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
    
    
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data[].id | number | 渠道ID |
  | data[].name | string | 渠道名称 |
  | data[].xSubjects | array | 主体数组 |
  | data[].xSubjects[].channelId | number | 渠道ID |
  | data[].xSubjects[].id | number | 主体ID |
  | data[].xSubjects[].name | string | 主体名称 |
  
  
  
  

#### 场景模块

##### 添加场景

请求地址
    
    POST /scene/add

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | title | string | Y | 场景标题 |
 | subjectId | number | Y | 主体ID |
 | useTypeId | number | Y | 使用类型ID |
 | putType | number | Y | 场景投放类型 1：批次投放 2：按未知点投放 3：按已知点投放 |
 | qrcodeType | string | Y | 二维码类型 TEMP：临时二维码  FIXED：永久二维码 |      
 | batchCount | number | N | 批次数量 putType不为3时为必填项 |
 | batchQrCount | number | N | 每个批次二维码数量 putType不为3时为必填项 |
 | putNames | string | N | 投放小店名称，多个小店用逗号隔开 putType为3时为必填项  |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | qrDateType | number | Y | 每码每周期类型 0:无限制 1：天 2：周 3：月 |
 | qrDateCount | number | N | 每码每周期发放数量 |
 | qrMaxCount | number | Y | 每码最大发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 | allCount | number | Y | 场景最大发放数量 |
 | eventId | number | Y | 活动ID |
 | remark | string | N | 场景备注 |
 | customNews | array | Y | 自动回复消息内容 |
 | customNews[].title | string | Y | 标题 |
 | customNews[].picUrl | string | Y | 图片地址 |
 | customNews[].remark | string | N | 摘要 |
    
    
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | string | 场景ID |
  | data.title | string | 场景标题 |
  | data.subjectId | number | 主体ID |
  | data.useTypeId | number | 使用类型ID |
  | data.putType | number | 场景投放类型 1：批次投放 2：按未知点投放 3：按已知点投放 |
  | data.qrcodeType | string | 二维码类型 TEMP：临时二维码  FIXED：永久二维码 |      
  | data.batchCount | number | 批次数量 putType不为3时为必填项 |
  | data.batchQrCount | number | 每个批次二维码数量 putType不为3时为必填项 |
  | data.putNames | string | 投放小店名称，多个小店用逗号隔开 putType为3时为必填项  |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number | 每人每周期发放数量 |
  | data.qrDateType | number | 每码每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.qrDateCount | number | 每码每周期发放数量 |
  | data.qrMaxCount | number | 每码最大发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.allCount | number | 场景最大发放数量 |
  | data.remark | string | 场景备注 |
  
  
  
  
##### 删除场景

请求地址
    
    GET /scene/remove

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 场景ID |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | bool | code为0时,返回true |
  
  
  
  
##### 修改场景

请求地址
    
    POST /scene/edit

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 场景ID |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | qrDateType | number | Y | 每码每周期类型 0:无限制 1：天 2：周 3：月 |
 | qrDateCount | number | N | 每码每周期发放数量 |
 | qrMaxCount | number | Y | 每码最大发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 | allCount | number | Y | 场景最大发放数量 |
 | customNews | array | Y | 自动回复消息内容 |
 | customNews[].id | number | Y | 自动回复ID |
 | customNews[].title | string | Y | 标题 |
 | customNews[].picUrl | string | Y | 图片地址 |
 | customNews[].remark | string | N | 摘要 |
    
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | bool | code为0时,返回true |
  
  
  
##### 获取场景详情

请求地址
    
    GET /scene/info

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 场景ID |
    
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | string | 场景ID |
  | data.title | string | 场景标题 |
  | data.subjectId | number | 主体ID |
  | data.useTypeId | number | 使用类型ID |
  | data.putType | number | 场景投放类型 1：批次投放 2：按未知点投放 3：按已知点投放 |
  | data.qrcodeType | string | 二维码类型 TEMP：临时二维码  FIXED：永久二维码 |      
  | data.batchCount | number | 批次数量 putType不为3时为必填项 |
  | data.batchQrCount | number | 每个批次二维码数量 putType不为3时为必填项 |
  | data.putNames | string | 投放小店名称，多个小店用逗号隔开 putType为3时为必填项  |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number | 每人每周期发放数量 |
  | data.qrDateType | number | 每码每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.qrDateCount | number | 每码每周期发放数量 |
  | data.qrMaxCount | number | 每码最大发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.allCount | number | 场景最大发放数量 |
  | data.remark | string | 场景备注 |
  | data.eventId | number | 活动ID |
  | data.eventName | string | 活动名称 |
  | data.eventType | string | 活动类型 |
  | data.customNews | array | 自动回复消息内容 |
  | data.customNews[].id | number | 自动回复ID |
  | data.customNews[].title | string | 标题 |
  | data.customNews[].picUrl | string | 图片地址 |
  | data.customNews[].remark | string | 摘要 |
  | data.customNews[].appid | string | 微信appid |

##### 查询场景列表

请求地址
    
    GET /scene/list

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data[].id | string | 场景ID |
  | data[].sceneTitle | string | 场景标题 |
  | data[].subjectId | number | 主体ID | 
  | data[].subjectName | string | 主体名称 | 
  | data[].channelName | string | 主体渠道名称 | 
  | data[].customNewsTitle | string | 回复内容标题 | 
  | data[].useTypeName | string | 使用类别名称 | 
  | data[].memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data[].memberDateCount | number | 每人每周期发放数量 |
  | data[].qrDateType | number | 每码每周期类型 0:无限制 1：天 2：周 3：月 |
  | data[].qrDateCount | number | 每码每周期发放数量 |
  | data[].qrMaxCount | number | 每码最大发放数量 |
  | data[].memberMaxCount | number | 每人最大发放数量 |
  | data[].allCount | number | 场景最大发放数量 |
  | data[].remark | string | 场景备注 |
  | data[].eventId | number | 活动ID |
  | data[].eventName | string | 活动名称 |
  | data[].eventType | string | 活动类型 | 

#### 积分兑换模块

##### 创建积分兑换

请求地址
    
    POST /point/add

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | title | string | Y | 积分兑换标题 |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 | pointCount | number | Y | 兑换需要积分数量 |
 | eventId | number | Y | 活动ID |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 积分兑换ID |
  | data.title | number | 每人每周期最多发放 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number | 每人每周期最多发放 |
  | data.memberMaxCount | number | 每人最大发放 |
  | data.pointCount | number | 兑换比例 |
   
  
  
  
##### 删除积分兑换

请求地址
    
    GET /point/remove

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 积分兑换ID |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | bool | code为0时，返回true |
  
  
  
  
##### 编辑积分兑换

请求地址
    
    POST /point/edit

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 积分兑换ID |
 | title | string | Y | 积分兑换标题 |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 | pointCount | number | Y | 兑换需要积分数量 |
 | eventId | number | Y | 活动ID |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 积分兑换ID |
  | data.title | number | 积分兑换名称 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number | 每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.pointCount | number | 积分兑换比例 |
  | data.relEventPoint | object | 活动积分关联信息 |
  | data.relEventPoint.eventId | number | 活动ID |
  | data.relEventPoint.id | number | 关联ID |
  | data.relEventPoint.pointId | number | 积分ID |
  | data.relEventPoint.xEvent | object | 活动信息 |
  | data.relEventPoint.xEvent.name | number | 活动名称 |
  | data.relEventPoint.xEvent.eventType | number | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动  |
  | data.relEventPoint.xEvent.status | number |  是否启用 0 停用 1 启用  |
 
  
  
  
##### 获取积分兑换详情

请求地址
    
    GET /point/info

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 积分兑换ID |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 积分兑换ID |
  | data.title | number | 积分兑换名称 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number | 每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.pointCount | number | 积分兑换比例 |
  | data.relEventPoint | object | 活动积分关联信息 |
  | data.relEventPoint.eventId | number | 活动ID |
  | data.relEventPoint.id | number | 关联ID |
  | data.relEventPoint.pointId | number | 积分ID |
  | data.relEventPoint.xEvent | object | 活动信息 |
  | data.relEventPoint.xEvent.name | number | 活动名称 |
  | data.relEventPoint.xEvent.eventType | number | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动  |
  | data.relEventPoint.xEvent.status | number |  是否启用 0 停用 1 启用  |
 
 
  
  
##### 获取积分兑换列表

请求地址
    
    GET /point/list

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data[].id | number | 积分兑换ID |
  | data[].title | number | 积分兑换名称 |
  | data[].memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data[].memberDateCount | number | 每人每周期发放数量 |
  | data[].memberMaxCount | number | 每人最大发放数量 |
  | data[].pointCount | number | 积分兑换比例 |
  | data[].relEventPoint | object | 活动积分关联信息 |
  | data[].relEventPoint.eventId | number | 活动ID |
  | data[].relEventPoint.id | number | 关联ID |
  | data[].relEventPoint.pointId | number | 积分ID |
  | data[].relEventPoint.xEvent | object | 活动信息 |
  | data[].relEventPoint.xEvent.name | number | 活动名称 |
  | data[].relEventPoint.xEvent.eventType | number | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动  |
  | data[].relEventPoint.xEvent.status | number |  是否启用 0 停用 1 启用  |
 
 
  
  
##### 获取积分兑换记录

请求地址
    
    GET /point/exchange

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | offset | number | N | 跳过条数 |
 | limit | number | N | 查询条数 |
 | beginTime | number | N | 开始时间 |
 | endTime | number | N | 结束时间 |
 | pointId | number | N | 积分兑换ID |
 | eventId | number | N | 活动ID |
 | download | number | N | 是否为下载EXECL 0:否 1：下载 |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.limit | number |  查询条数 |
  | data.offset | number | 跳过条数  |
  | data.count | number | 查询总数  |
  | data.list | array | 积分兑换列表  | 
  | data.list[].pointId | number |  积分兑换ID |
  | data.list[].pointTitle | string | 积分兑换名称 |
  | data.list[].pointCount | number |  消耗积分 |
  | data.list[].eventId | number | 活动ID |
  | data.list[].name | string | 活动名称 |
  | data.list[].eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.list[].nickname | string | 微信粉丝昵称 |
  | data.list[].openid | number |  微信粉丝openid  |
  | data.list[].headimgurl | string | 微信粉丝头像 |
  | data.list[].subscribe | number | 微信粉丝是否关注 0 未关注  1 已关注 |
 
  
  
##### 获取积分统计结果

请求地址
    
    GET /point/statistics

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.eventId | number | 活动ID |
  | data.eventName | number | 活动名称 |
  | data.eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动 |
  | data.pointId | number | 积分兑换ID |
  | data.pointTitle | string | 积分兑换标题 |
  | data.pointPv | number | 积分兑换次数 |
  | data.pointUv | number | 积分兑换人数 |
  | data.sumPointCount | number | 积分兑换消耗总积分 |
  
  
#### 活动模块

##### 添加活动

请求地址
    
    POST /event/add

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | name | string | Y | 活动名称 |
 | eventType | string | Y | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
 | beginTime | string | Y | 活动开始时间 |
 | endTime | string | Y | 活动结束时间 |
 | sceneId | number | N | 场景ID |
 | remark | string | N| 活动备注 |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 活动ID |
  | data.name | string | 活动名称 |
  | data.eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.beginTime | string | 活动开始时间 |
  | data.endTime | string | 活动结束时间 |
  | data.sceneId | number |  场景ID |
  | data.remark | string | 活动备注 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number |  每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.status | number | 是否启用 0 停用 1 启用 |
  
  
##### 删除活动

请求地址
    
    GET /event/remove

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 活动id |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 活动ID |
  | data.name | string | 活动名称 |
  | data.eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.beginTime | string | 活动开始时间 |
  | data.endTime | string | 活动结束时间 |
  | data.sceneId | number |  场景ID |
  | data.remark | string | 活动备注 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number |  每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.status | number | 是否启用 0 停用 1 启用 |
  
  
##### 修改活动

请求地址
    
    POST /event/edit

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 活动id |
 | name | string | N  | 活动名称 |
 | eventType | string | N  | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
 | beginTime | string | N | 活动开始时间 |
 | endTime | string | N  | 活动结束时间 |
 | sceneId | number | N | 场景ID |
 | status | number | N| 是否启用 0是停用 1是启用 |
 | memberDateType | number | Y | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
 | memberDateCount | number | N | 每人每周期发放数量 |
 | memberMaxCount | number | Y | 每人最大发放数量 |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 活动ID |
  | data.name | string | 活动名称 |
  | data.eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.beginTime | string | 活动开始时间 |
  | data.endTime | string | 活动结束时间 |
  | data.sceneId | number |  场景ID |
  | data.remark | string | 活动备注 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number |  每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.status | number | 是否启用 0 停用 1 启用 |
  
  
  
  
##### 查询活动

请求地址
    
    GET /event

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 积分兑换ID |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 活动ID |
  | data.name | string | 活动名称 |
  | data.eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.beginTime | string | 活动开始时间 |
  | data.endTime | string | 活动结束时间 |
  | data.sceneId | number |  场景ID |
  | data.remark | string | 活动备注 |
  | data.memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.memberDateCount | number |  每人每周期发放数量 |
  | data.memberMaxCount | number | 每人最大发放数量 |
  | data.status | number | 是否启用 0 停用 1 启用 |

  
  
  
##### 查询没有关联的活动

请求地址
    
    GET /event/list/nojoin

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data[].eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动  |
  | data[].id | number | 活动类型  |
  | data[].name | number | 活动名称  |
  
  
  

##### 查询活动列表

请求地址
    
    GET /event/list

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
请求参数：
 
  | 字段 | 类型 | 必填 | 描述 |
  |:----: |:----:|:----:|:----:|
  | offset | number | N | 跳过条数 |
  | limit | number | N | 查询条数 |
  
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.limit | number |  查询条数 |
  | data.offset | number | 跳过条数  |
  | data.count | number | 查询总数  |
  | data.list | array | 活动列表  | 
  | data.list[].id | number | 活动ID |
  | data.list[].name | string | 活动名称 |
  | data.list[].eventType | string | 活动类型  PRIZE:抽奖活动 SCANWIN：领券活动|
  | data.list[].beginTime | string | 活动开始时间 |
  | data.list[].endTime | string | 活动结束时间 |
  | data.list[].sceneId | number |  场景ID |
  | data.list[].remark | string | 活动备注 |
  | data.list[].memberDateType | number | 每人每周期类型 0:无限制 1：天 2：周 3：月 |
  | data.list[].memberDateCount | number |  每人每周期发放数量 |
  | data.list[].memberMaxCount | number | 每人最大发放数量 |
  | data.list[].status | number | 是否启用 0 停用 1 启用 |
  | data.list[].commitCount | number | 提交量 |
  
  
  
##### 投放奖品

请求地址
    
    POST /event/addPrize

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|     
 | eventId | number | Y | 活动ID |
 | prizeType | string | N | 奖品类型 目前只有CARD |
 | prizeId | number | Y | 奖品ID | 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data.id | number | 投放ID |
  | data.eventId | number | 活动ID |
  | data.lockStock | number | 锁定库存 |
  | data.prizeId | number | 奖品ID |
  | data.prizeType | string | 奖品类型 CARD:卡券 目前只有卡券类型 |
  | data.winRate | number | 中奖率 |
  | data.status | number | 是否启用 0 停用 1 启用 |
   
 
 
 
  
  
##### 活动奖品列表

请求地址
    
    GET /event/prizeList

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|     
 | eventId | number | Y | 活动ID | 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data[].id | number | 投放ID |
  | data[].eventId | number | 活动ID |
  | data[].lockStock | number | 锁定库存 |
  | data[].outCount | number | 已经发放数量 |
  | data[].prizeId | number | 奖品ID |
  | data[].prizeType | string | 奖品类型 CARD:卡券 目前只有卡券类型 |
  | data[].surplusCount | number | 奖品剩余库存 |
  | data[].winRate | number | 中奖率 |
  | data[].status | number | 是否启用 0 停用 1 启用 |

  
  
##### 删除活动奖品

请求地址
    
    POST /event/deletePrize

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|     
 | id | number | Y | 投放ID |
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | bool | code为0时，返回true |
 
 
 
  
  
  
##### 投放奖品

请求地址
    
    POST /event/editPrize

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|     
 | eventId | number | Y | 活动ID |
 | prizes | array | Y | 奖品 |
 | prizes[].id | number | Y | 投放ID | 
 | prizes[].winRate | number | N | 中奖概率 | 
 | prizes[].status | number | N | 奖品状态 0停用 1启用 | 
 | prizes[].addLockStock | number | Y | 奖品数量  正数增加  负数是减少 | 
 
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | book | code为0时，返回true |
 
 
 
   
   
   
   
#### 卡券模块
  
##### 添加卡券
  
请求地址
    
    POST /card/create

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | title | string | Y | 卡券标题 |
 | subTitle | string | Y | 卡券副标题|
 | count | number | Y | 卡券数量 |
 | cardType | string | Y | 卡券类型 VOUCHER:代金券 |
 | img | string | Y  | 卡券图片 |
 | putType | string | Y | 发放方式 FREE: 免费 PAY：付费 |
 | offerDesc | string | Y | 优惠描述 |
 | useDesc | string | Y  | 使用描述 |
 | rule | object | Y | 卡券规则 |
 | rule.goodType | string | Y | 关联商品类型 SKU 根据SKU关联 TYPE 根据商品类型关联 |
 | rule.offerPrice | number | Y | 每人最大发放数量 |
 | rule.validTimeType | string | Y | 过期时间类型 ABSOLUTE：指定时间段类型 RELATIVE：相对时间|
 | rule.absoluteBeginTime | string | N | 绝对时间开始日期 |
 | rule.absoluteEndTime | string | N | 绝对时间结束日期 |
 | rule.relativeOffsetNum | number | N | 获取卡券后卡券生效时间（秒） |
 | rule.relativeNum | number | N | 获取卡券后卡券有效时间（秒） |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 卡券ID |
  | data.title | string | 卡券标题 |
  | data.subTitle | string | 卡券副标题|
  | data.count | number | 卡券数量 |
  | data.prePutCount | number | 预投放数量 |
  | data.cardType | string | 卡券类型 VOUCHER:代金券 |
  | data.img | string |  卡券图片 |
  | data.putType | string | 发放方式 FREE: 免费 PAY：付费 |
  | data.offerDesc | string | 优惠描述 |
  | data.useDesc | string |  使用描述 |
  | data.rule | object | 卡券规则 |
  | data.rule.cardId | number | 卡券ID |
  | data.rule.goodType | string  | 关联商品类型 SKU 根据SKU关联 TYPE 根据商品类型关联 |
  | data.rule.offerPrice | number | 每人最大发放数量 |
  | data.rule.validTimeType | string | 过期时间类型 ABSOLUTE：指定时间段类型 RELATIVE：相对时间|
  | data.rule.absoluteBeginTime | string | 绝对时间开始日期 |
  | data.rule.absoluteEndTime | string | 绝对时间结束日期 |
  | data.rule.relativeOffsetNum | number | 获取卡券后卡券生效时间（秒） |
  | data.rule.relativeNum | number | 获取卡券后卡券有效时间（秒） |

##### 库存获取
  
请求地址
    
    GET /card/stock/info

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券ID | 
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.availableCount | number | 可用库存 |
  | data.currentCount | number | 当前库存 |
  | data.expiredCount | number | 过期库存 |
  | data.handOutCount | number | 已发放库存 |
  | data.prePutCount | number | 预投放库存 |
  | data.settledCount | number | 已结算库存 |
  | data.totalCount | number | 总库存 |
  | data.usedCount | number | 已核销库存 |
    
    
    
##### 库存修改
  
请求地址
    
    POST /card/stock/edit

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券ID | 
 | count | number | Y | 库存数量 | 
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.count | number | 更改后卡券数量 |
  
    
    
    
    
##### 查询卡券
  
请求地址
    
    GET /card/info

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券ID | 
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number | 卡券ID |
  | data.title | string | 卡券标题 |
  | data.subTitle | string | 卡券副标题|
  | data.count | number | 卡券数量 |
  | data.prePutCount | number | 预投放数量 |
  | data.cardType | string | 卡券类型 VOUCHER:代金券 |
  | data.img | string |  卡券图片 |
  | data.putType | string | 发放方式 FREE: 免费 PAY：付费 |
  | data.offerDesc | string | 优惠描述 |
  | data.useDesc | string |  使用描述 |
  | data.rule | object | 卡券规则 |
  | data.rule.cardId | number | 卡券ID |
  | data.rule.goodType | string  | 关联商品类型 SKU 根据SKU关联 TYPE 根据商品类型关联 |
  | data.rule.offerPrice | number | 每人最大发放数量 |
  | data.rule.validTimeType | string | 过期时间类型 ABSOLUTE：指定时间段类型 RELATIVE：相对时间|
  | data.rule.absoluteBeginTime | string | 绝对时间开始日期 |
  | data.rule.absoluteEndTime | string | 绝对时间结束日期 |
  | data.rule.relativeOffsetNum | number | 获取卡券后卡券生效时间（秒） |
  | data.rule.relativeNum | number | 获取卡券后卡券有效时间（秒） |


  
  
  
  
##### 查询卡券列表
  
请求地址
    
    GET /card/list

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | offset | number | N | 跳过条数 |
 | limit | number | N | 查询条数 |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.limit | number |  查询条数 |
  | data.offset | number | 跳过条数  |
  | data.count | number | 查询总数  |
  | data.cardList | array | 卡券列表信息  | 
  | data.cardList[].id | number | 卡券ID |
  | data.cardList[].title | string | 卡券标题 |
  | data.cardList[].prePutCount | number | 预投放数量 |
  | data.cardList[].availableCount | number | 可以卡券数量 |
  | data.cardList[].expiredCount | number | 已过期卡券数量 |
  | data.cardList[].handOutCount | number | 已发放卡券数量 |
  | data.cardList[].totalCount | number | 卡券总数量 |
  | data.cardList[].usedCount | number | 已核销卡券数量 |
  | data.cardList[].settledCount | number | 已结算卡券数量 |
  | data.cardList[].subTitle | string | 卡券副标题|
  | data.cardList[].count | number | 卡券总数量 |
  | data.cardList[].cardType | string | 卡券类型 VOUCHER:代金券 |
  | data.cardList[].img | string |  卡券图片 |
  | data.cardList[].putType | string | 发放方式 FREE: 免费 PAY：付费 |
  | data.cardList[].offerDesc | string | 优惠描述 |
  | data.cardList[].useDesc | string |  使用描述 |
  | data.cardList[].rule | object | 卡券规则 |
  | data.cardList[].rule.cardId | number | 卡券ID |
  | data.cardList[].rule.goodType | string  | 关联商品类型 SKU 根据SKU关联 TYPE 根据商品类型关联 |
  | data.cardList[].rule.offerPrice | number | 每人最大发放数量 |
  | data.cardList[].rule.validTimeType | string | 过期时间类型 ABSOLUTE：指定时间段类型 RELATIVE：相对时间|
  | data.cardList[].rule.absoluteBeginTime | string | 绝对时间开始日期 |
  | data.cardList[].rule.absoluteEndTime | string | 绝对时间结束日期 |
  | data.cardList[].rule.relativeOffsetNum | number | 获取卡券后卡券生效时间（秒） |
  | data.cardList[].rule.relativeNum | number | 获取卡券后卡券有效时间（秒） |
  
    
    

##### 卡券发放记录
  
请求地址
    
    GET /card/pullList

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | offset | number | N | 跳过条数 |
 | limit | number | N | 查询条数 |
 | cardId | number | N | 卡券id |
 | cardNo | string | N | 会员卡编号 |
 | title | number | N | 卡券标题 |
 | subTitle | string | N | 卡券副标题 |
 | memberCardStatus | number | N | 会员卡卡券状态 0:停用 1:已发放 2:核销 3:失效 4:已结算 5:作废 默认为1 |
 | cardType | number | N | 卡券类型 VOUCHER:代金券 |
 | putId | number | N | 投放编号 |
 | putPrizeId | number | N | 查询条数 |
 | putBeginTime | string | N | 投放开始时间 |
 | putEndTime | string | N | 投放结束时间 |
 | outBeginTime | string | N | 发放开始时间 |
 | outEndTime | string | N | 发放结束时间 |
 | useBeginTime | string | N | 核销开始时间 |
 | useEndTime | string | N | 核销结束时间 |
 | expiredBeginTime | string | N | 过期的开始时间 |
 | expiredEndTime | string | N | 过期的结束时间 |
 | storeName | string | N | 核销人 |
 | queryType | string | N | 是否为下载 query:查询 download: 下载 |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 |
  | data.limit | number |  查询条数 |
  | data.offset | number | 跳过条数  |
  | data.count | number | 查询总数  |
  | data.list | array | 发放卡券列表  | 
  | data.list[].cardId | number | 卡券ID  | 
  | data.list[].cardNo | string | 卡券编号  | 
  | data.list[].cardTitle | string | 卡券标题  | 
  | data.list[].cardSubTitle | string | 卡券副标题  | 
  | data.list[].checkTime | number | 核销时间  | 
  | data.list[].eventId | number | 活动ID  | 
  | data.list[].expiredTime | number | 失效时间  | 
  | data.list[].offerPrice | number | 优惠金额  |   
  | data.list[].goodType | string  | 关联商品类型 SKU 根据SKU关联 TYPE 根据商品类型关联 |
  | data.list[].outBy | number | 卡券ID  | 
  | data.list[].outTime | number | 领取时间  | 
  | data.list[].outUserName | number | 领取人  | 
  | data.list[].putPrizeId | number | 投放ID  | 
  | data.list[].status | number | 会员卡卡券状态 0:停用 1:已发放 2:核销 3:失效 4:已结算 5:作废  | 
  | data.list[].storeId | number | 店铺ID  | 
  | data.list[].storeName | number | 核销人  | 
  | data.list[].user | number | 领取人openid  | 
  
  
    
    
##### 查询卡券操作记录
  
请求地址
    
    GET /card/edit/logs

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券ID | 
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.cardId | number | 卡券ID |
  | data.count | number | 操作数量 |
  | data.operateType | string | 操作类型 CREATE:创建库存 INCREASE：添加库存 DECREASE：减少库存 |
  | data.createdBy | string | 操作人openid |
  | data.createdAt | string | 操作时间 |
  
  
  
##### 查询卡券结算统计列表
    
  请求地址
      
      GET /card/settled/list
  
  头部参数：
  
   | 字段 | 类型 | 必填 | 描述 |
   |:----: |:----:|:----:|:----:|
   | Authorization | string | Y | 授权token |
   
   
  请求参数：
  
   | 字段 | 类型 | 必填 | 描述 |
   |:----: |:----:|:----:|:----:|
   | cardId | number | N | 卡券ID | 
   | cardTitle | string | N | 卡券标题 | 
   | checkBeginTime | string | N | 核销开始时间 | 
   | checkEndTime | string | N | 核销结束时间 | 
   | storeName | string | N | 小店名称 | 
   | ddStoreId | number | N | 小店ID | 
      
  返回:
  
    | 字段 | 类型 | 描述 |
    |:----: |:----:|:----:|
    | code | number | 0为成功，其他为失败 |
    | message | string | 处理信息 |
    | data | object | code为0时，返回以下信息 |
    | data.cardId | number | 卡券ID |
    | data.cardTitle | string | 卡券标题 |
    | data.checkCount | number | 核销数量 |
    | data.checkPrice | float | 核销价格 |
    | data.ddStoreId | number | 小店ID |
    | data.storeName | string | 小店名称 |
    
    
##### 下载卡券结算EXECL
    
  请求地址
      
      GET /card/settled/list
  
  头部参数：
  
   | 字段 | 类型 | 必填 | 描述 |
   |:----: |:----:|:----:|:----:|
   | Authorization | string | Y | 授权token |
   
   
  请求参数：
  
   | 字段 | 类型 | 必填 | 描述 |
   |:----: |:----:|:----:|:----:|
   | cardId | number | N | 卡券ID | 
   | cardTitle | string | N | 卡券标题 | 
   | checkBeginTime | string | N | 核销开始时间 | 
   | checkEndTime | string | N | 核销结束时间 | 
   | storeName | string | N | 小店名称 | 
   | ddStoreId | number | N | 小店ID | 
      
  返回: execl文件
    
    
##### 创建卡券投放
  
请求地址
    
    GET /card/put/add

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | cardId | number | Y | 卡券ID |
 | putType | string | Y | 投放类型 COOPERATION：合作投放 目前只有合作投放 |
 | putBy | string | Y | 投放方 |
 | putCount | number | Y | 投放数量 |
 | beginTime | string | Y | 合作开始时间 |
 | endTime | string | Y | 合作结束时间 |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number |  卡券投放ID |
  | data.cardId | number | 卡券ID  |
  | data.putType | string | 投放类型 COOPERATION：合作投放 目前只有合作投放  |
  | data.putBy | string | 投放方  |
  | data.putCount | number | 投放数量  |
  | data.beginTime | string | 合作开始时间  |
  | data.endTime | string | 合作结束时间  |
  | data.status | number | 投放状态 0：初始化 1：卡券创建中 2：创建完成 3: 启用中  |

 
 
##### 删除卡券投放
  
请求地址
    
    GET /card/put/delete

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券投放ID |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | bool | code为0时，返回true |
  

##### 启用卡券投放
  
请求地址
    
    GET /card/put/enable

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券投放ID |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number |  卡券投放ID |
  | data.cardId | number | 卡券ID  |
  | data.putType | string | 投放类型 COOPERATION：合作投放 目前只有合作投放  |
  | data.putBy | string | 投放方  |
  | data.putCount | number | 投放数量  |
  | data.beginTime | string | 合作开始时间  |
  | data.endTime | string | 合作结束时间  |
  | data.status | number | 投放状态 0：初始化 1：卡券创建中 2：创建完成 3: 启用中  |
  

##### 获取卡券投放详情
  
请求地址
    
    GET /card/put/info

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | id | number | Y | 卡券投放ID |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.id | number |  卡券投放ID |
  | data.cardId | number | 卡券ID  |
  | data.putType | string | 投放类型 COOPERATION：合作投放 目前只有合作投放  |
  | data.putBy | string | 投放方  |
  | data.putCount | number | 投放数量  |
  | data.beginTime | string | 合作开始时间  |
  | data.endTime | string | 合作结束时间  |
  | data.status | number | 投放状态 0：初始化 1：卡券创建中 2：创建完成 3: 启用中  |
  | data.xcard | object | 卡券详情  |
  | data.xcard.title | string | 标题  |
 
 
 
##### 获取卡券投放列表
  
请求地址
    
    GET /card/put/list

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | offset | number | N | 跳过条数 |
 | limit | number | N | 查询条数 |
    
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 |
  | data.offset | number |  跳过条数 |
  | data.limit | number |  查询条数 |
  | data.count | number |  总条数 |
  | data.list | array |  卡券突发列表 |
  | data.list[].id | number |  卡券投放ID |
  | data.list[].cardId | number | 卡券ID  |
  | data.list[].putType | string | 投放类型 COOPERATION：合作投放 目前只有合作投放  |
  | data.list[].putBy | string | 投放方|
  | data.list[].putCount | number | 投放数量  |
  | data.list[].checkCount | number | 核销数量  |
  | data.list[].beginTime | string | 合作开始时间  |
  | data.list[].endTime | string | 合作结束时间  |
  | data.list[].status | number | 投放状态 0：初始化 1：卡券创建中 2：创建完成 3: 启用中  |
  | data.list[].xcard | object | 卡券详情  |
  | data.list[].xcard.title | string | 标题  |
 
 
##### 获取卡券投放详情
  
请求地址
    
    GET /card/put/down

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
 
请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | putCardId | number | Y | 卡券投放ID |
    
返回EXECL文件
   
  

#### 报表模块
  
##### 获取概况
  
请求地址
    
    GET /report/scan

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 | 
  | data.scan30Count | number | 最近30天扫码次数 | 
  | data.scanCount | number | 扫码总次数 | 
  | data.scanMember30Count | number | 最近30天扫码人数 | 
  | data.scanMemberCount | number | 扫码总人数 | 
  | data.subscribe30Count | number | 最近30天关注次数 | 
  | data.subscribeCount | number | 关注总人数 | 

##### 获取主体扫码报表数据
  
请求地址
    
    GET /report/subject/scan

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |



请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | beginTime | string | Y | 开始时间 |
 | endTime | string | Y | 结束时间 |
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 | 
  | data.subjectScanMemberRecs | array | 扫码人数数据 | 
  | data.subjectScanMemberRecs[].count | number | 扫码人数 | 
  | data.subjectScanMemberRecs[].rptDate | string | 统计日期 | 
  | data.subjectScanMemberRecs[].name | string | 主体名称 | 
  | data.subjectScanMemberRecs[].subjectId | number | 主体Id | 
  | data.subjectScanRecs | array | 扫码次数数据 | 
  | data.subjectScanRecs[].count | number | 扫码次数 | 
  | data.subjectScanRecs[].rptDate | string | 统计日期 | 
  | data.subjectScanRecs[].name | string | 主体名称 | 
  | data.subjectScanRecs[].subjectId | number | 主体Id | 
  | data.subjectSubscribeRecs | array | 关注人数数据 | 
  | data.subjectSubscribeRecs[].count | number | 关注人数 | 
  | data.subjectSubscribeRecs[].rptDate | string | 统计日期 | 
  | data.subjectSubscribeRecs[].name | string | 主体名称 | 
  | data.subjectSubscribeRecs[].subjectId | number | 主体Id | 
  
  
  
  
##### 获取投放点报表
  
请求地址
    
    GET /report/batch/scan

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |



请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | beginTime | string | Y | 开始时间 |
 | endTime | string | Y | 结束时间 |
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 | 
  | data[].scanCount | number | 扫码次数 | 
  | data[].scanMemberCount | number | 扫码人数 | 
  | data[].batchId | number | 投放点ID | 
  | data[].batchName | string | 投放点名称 | 
  | data[].subscribeCount | number | 关注人数 | 

##### 获取场景报表
  
请求地址
    
    POST /report/scan/sum

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |



请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | beginTime | string | Y | 开始时间 |
 | endTime | string | Y | 结束时间 |
 | sceneId | number | N | 场景ID |


返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 | 
  | data[].scanCount | number | 扫码次数 | 
  | data[].scanMemberCount | number | 扫码人数 | 
  | data[].sceneId | number | 场景ID | 
  | data[].sceneTitle | string | 场景标题 | 
  | data[].subscribeCount | number | 关注人数 | 

##### 获取批次报表
  
请求地址
    
    POST /report/batch/scan/sum

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |



请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | beginTime | string | Y | 开始时间 |
 | endTime | string | Y | 结束时间 |
 | sceneId | number | N | 场景ID |
 | batchName | string | N | 批次名称 |
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | array | code为0时，返回以下信息 | 

#### 上传模块
  
##### 上传图片
  
请求地址
    
    POST /upload/image

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |
 
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | string | code为0时，返回图片地址url | 


##### 创建任务
  
请求地址
    
    POST /task/create

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |

请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | task | object | Y | 任务详情 |
 | task.name | string | Y | 任务名称 |
 | task.partnerName | string | Y | 合作伙伴 |
 | task.beginTime | string | Y | 开始时间 |
 | task.endTime | string | Y | 结束时间 |
 | task.rebateType | number | Y | 返利方式 0:立返, 3:1-3日返, 7:4-7日返, 30:月结 |
 | task.orderSubmitCount | number | Y | 限制交单总次数，0为不限制 |
 | task.orderSubmitType | number | Y | 交单方式 0:一次交单 1:多次交单 |
 | task.orderSubmitStep | number | Y | 交单步骤 默认1步 |
 | task.orderRepeat | number | Y | 重复完成 0:否 1:是 |
 | task.spreadType | number | Y | 0:固定连接, 1:海报推广 2:每人连接 |
 | task.spreadQrcode | string | Y | 推广二维码 |
 | task.spreadPoster | string | Y | 推广海报 |
 | task.content | string | Y | 任务内容 |
 | fields | array | Y | 自定义字段 |
 | fields[].orderStep | number | Y | 步骤 默认为1 |
 | fields[].fieldTitle | string | Y | 字段名称 |
 | fields[].fieldType | number | Y | 字段类型 0:字符串类型 1:数字类型 2:图片类型 |
 | fields[].fieldOptions | string | N | 字段参数 用于有选项的类型，这里放置选项 通过|分割 |
 | rebates | array | Y | 不同等级返利金额 |
 | rebates[].rebateLevel | number | Y | 返利级别 0:全部级别 1:一级 2:二级 3:三级 |
 | rebates[].price | number | Y | 返利金额 |
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 | 
  | data.task | object | 任务详情 |
  | data.task.id | number | 任务ID |
  | data.task.name | string | 任务名称 |
  | data.task.partnerName | string | 合作伙伴 |
  | data.task.beginTime | string | 开始时间 |
  | data.task.endTime | string | 结束时间 |
  | data.task.rebateType | number | 返利方式 0:立返, 3:1-3日返, 7:4-7日返, 30:月结 |
  | data.task.orderSubmitCount | number | 限制交单总次数，0为不限制 |
  | data.task.orderSubmitType | number | 交单方式 0:一次交单 1:多次交单 |
  | data.task.orderSubmitStep | number | 交单步骤 默认1步 |
  | data.task.orderRepeat | number | 重复完成 0:否 1:是 |
  | data.task.spreadType | number | 0:固定连接, 1:海报推广 2:每人连接 |
  | data.task.spreadQrcode | string | 推广二维码 |
  | data.task.spreadPoster | string | 推广海报 |
  | data.task.content | string | 任务内容 |
  | data.fields | array | 自定义字段 |
  | data.fields[].id | number | 自定义字段ID |
  | data.fields[].orderStep | number | 步骤 默认为1 |
  | data.fields[].fieldTitle | string | 字段名称 |
  | data.fields[].fieldType | number | 字段类型 0:字符串类型 1:数字类型 2:图片类型 |
  | data.fields[].fieldOptions | string | 字段参数 用于有选项的类型，这里放置选项 通过|分割 |
  | data.rebates | array | 不同等级返利金额 |
  | data.rebates[].id | number | 返利金额ID |
  | data.rebates[].rebateLevel | number | 返利级别 0:全部级别 1:一级 2:二级 3:三级 |
  | data.rebates[].price | number | 返利金额 |


##### 修改任务
  
请求地址
    
    POST /task/update

头部参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | Authorization | string | Y | 授权token |

请求参数：

 | 字段 | 类型 | 必填 | 描述 |
 |:----: |:----:|:----:|:----:|
 | task | object | Y | 任务详情 |
 | task.id | number | Y | 任务ID |
 | task.name | string | N | 任务名称 |
 | task.partnerName | string | N | 合作伙伴 |
 | task.beginTime | string | N | 开始时间 |
 | task.endTime | string | N | 结束时间 |
 | task.rebateType | number | N | 返利方式 0:立返, 3:1-3日返, 7:4-7日返, 30:月结 |
 | task.orderSubmitCount | number | N | 限制交单总次数，0为不限制 |
 | task.orderSubmitType | number | N | 交单方式 0:一次交单 1:多次交单 |
 | task.orderSubmitStep | number | N | 交单步骤 默认1步 |
 | task.orderRepeat | number | N | 重复完成 0:否 1:是 |
 | task.spreadType | number | N | 0:固定连接, 1:海报推广 2:每人连接 |
 | task.spreadQrcode | string | N | 推广二维码 |
 | task.spreadPoster | string | N | 推广海报 |
 | task.content | string | N | 任务内容 |
 | fields | array | Y | 自定义字段 |
 | fields[].id | number | Y | 自定义字段ID |
 | fields[].orderStep | number | N | 步骤 默认为1 |
 | fields[].fieldTitle | string | N | 字段名称 |
 | fields[].fieldType | number | N | 字段类型 0:字符串类型 1:数字类型 2:图片类型 |
 | fields[].fieldOptions | string | N | 字段参数 用于有选项的类型，这里放置选项 通过|分割 |
 | fields[].isDelete | number | N | 是否删除 |
 | rebates | array | Y | 不同等级返利金额 |
 | rebates[].id | number | Y | 返利金额ID |
 | rebates[].rebateLevel | number | Y | 返利级别 0:全部级别 1:一级 2:二级 3:三级 |
 | rebates[].price | number | Y | 返利金额 |
  
返回:

  | 字段 | 类型 | 描述 |
  |:----: |:----:|:----:|
  | code | number | 0为成功，其他为失败 |
  | message | string | 处理信息 |
  | data | object | code为0时，返回以下信息 | 
  | data.task | object | 任务详情 |
  | data.task.id | number | 任务ID |
  | data.task.name | string | 任务名称 |
  | data.task.partnerName | string | 合作伙伴 |
  | data.task.beginTime | string | 开始时间 |
  | data.task.endTime | string | 结束时间 |
  | data.task.rebateType | number | 返利方式 0:立返, 3:1-3日返, 7:4-7日返, 30:月结 |
  | data.task.orderSubmitCount | number | 限制交单总次数，0为不限制 |
  | data.task.orderSubmitType | number | 交单方式 0:一次交单 1:多次交单 |
  | data.task.orderSubmitStep | number | 交单步骤 默认1步 |
  | data.task.orderRepeat | number | 重复完成 0:否 1:是 |
  | data.task.spreadType | number | 0:固定连接, 1:海报推广 2:每人连接 |
  | data.task.spreadQrcode | string | 推广二维码 |
  | data.task.spreadPoster | string | 推广海报 |
  | data.task.content | string | 任务内容 |
  | data.fields | array | 自定义字段 |
  | data.fields[].id | number | 自定义字段ID |
  | data.fields[].orderStep | number | 步骤 默认为1 |
  | data.fields[].fieldTitle | string | 字段名称 |
  | data.fields[].fieldType | number | 字段类型 0:字符串类型 1:数字类型 2:图片类型 |
  | data.fields[].fieldOptions | string | 字段参数 用于有选项的类型，这里放置选项 通过|分割 |
  | data.rebates | array | 不同等级返利金额 |
  | data.rebates[].id | number | 返利金额ID |
  | data.rebates[].rebateLevel | number | 返利级别 0:全部级别 1:一级 2:二级 3:三级 |
  | data.rebates[].price | number | 返利金额 |

### 版本更新内容
 
##### v1.1.3

 * 卡券领取记录查询接口增加卡券停用状态查询
 * 使用execljs重写卡券领取记录导出Execl功能
 * 卡券领取记录导出Execl增加导出小店卡券结算统计和小店结算统计数据
 * 新增、修改场景不在设置自动回复消息跳转链接，采用通过活动类型判断自动生成跳转链接
 * 接口调用间隔为10秒更改为3秒
 * 新增积分兑换增加、删除、修改、查询列表，查询详情，积分兑换统计接口，积分兑换统计详情列表接口
 * 删除七牛相关配置
 * 删除活动中uv和pv的统计
 
 
 
##### v1.1.4
 
 * 卡券规则新增商品关联类型
 * 会员卡券新增商品关联类型
 * 新增卡券sku关联表
 * 新增合作发放过期任务
 * 新增生成合作卡券任务
 * 新增投放管理
 
 
 
##### v1.1.5
  
  * propTypes设置获取类型方法
  * 去除中间件query 字符串转数字的方法，通过router层routerConfig的propTypes来设置query类型
  * execl创建单元格增加合并单元格和根据keys排序
  * 增加结算查询接口
  * 增加结算导出接口
  * 创建任务接口
  * 启用任务
  * 修改任务
  * 获取任务列表
  * 获取交单详情列表
 