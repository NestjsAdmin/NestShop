<div align=center>
<img src="https://api.jnsq.gzkz.cn/uploads/file/3b43f61b8c147b3338c1c6c7514ce848_20230905184447.png" width="401.75" height="284.5" />
</div>
<div align=center>
<img src="https://img.shields.io/npm/v/npm.svg?logo=nodedotjs"/>
<img src="https://camo.githubusercontent.com/201001d3863fd1289755941ad181743b97a80f96a8c3cb15741e77ff7c9a05fa/68747470733a2f2f696d672e736869656c64732e696f2f646973636f72642f3532303632323831323734323831313639383f7374796c653d666c61742d737175617265266c6f676f3d6e6573746a7326636f6c6f723d613631623361"/>
<img src="https://img.shields.io/badge/element--plus-2.3.8-green"/>
<img src="https://img.shields.io/badge/vue-3.3.4-brightgreen"/>
</div>


## 前言

一个基于NestAdmin框架开发的连锁商城系统，采用Nunapp+Vue3+Nest.js技术栈，后台管理系统包含广告管理、门店管理、商品管理、订单管理、库存管理、权限管理、用户管理等模块。本商城致力于为连锁型企业打造一个功能完整、易于维护的连锁商城系统现，目前已有多位合伙商投入正式使用，并为其提供技术支持。

## 开源版目录说明

- server：后端
- vue-admin：后台前端
- wx-mini：微信小程序

## 系统部署后 API 地址

| 服务                                                 | 地址                    |
| ---------------------------------------------------- |-----------------------|
| mall4cloud-gatway 网关服务                           | http://127.0.0.1:8000 |
| mall4cloud-auth  授权校验服务                        | http://127.0.0.1:9101 |
| mall4cloud-biz     业务代码服务（如图片上传/短信等） | http://127.0.0.1:9000 |
| mall4cloud-leaf   基于美团leaf的生成id服务           | http://127.0.0.1:9100 |
| mall4cloud-multishop 商家服务                        | http://127.0.0.1:9103 |
| mall4cloud-order         订单服务                    | http://127.0.0.1:9106 |
| mall4cloud-payment   支付服务                        | http://127.0.0.1:9113 |
| mall4cloud-product    商品服务                       | http://127.0.0.1:9114 |
| mall4cloud-rbac          用户角色服务                | http://127.0.0.1:9102 |
| mall4cloud-search      搜索服务                      | http://127.0.0.1:9108 |
| mall4cloud-user          用户服务                    | http://127.0.0.1:9105 |

## 目录结构

```
mall4cloud
├─mall4cloud-api -- 内网接口
│  ├─mall4cloud-api-auth  -- 授权对内接口
│  ├─mall4cloud-api-biz  -- biz对内接口
│  ├─mall4cloud-api-leaf  -- 美团分布式id生成接口
│  ├─mall4cloud-api-multishop  -- 店铺对内接口
│  ├─mall4cloud-api-order  -- 订单对内接口
│  ├─mall4cloud-api-platform  -- 平台对内接口
│  ├─mall4cloud-api-product  -- 商品对内接口
│  ├─mall4cloud-api-rbac  -- 用户角色权限对内接口
│  ├─mall4cloud-api-search  -- 搜索对内接口
│  └─mall4cloud-api-user  -- 用户对内接口
├─mall4cloud-auth  -- 授权校验模块
├─mall4cloud-biz  -- mall4cloud 业务代码。如图片上传/短信等
├─mall4cloud-common -- 一些公共的方法
│  ├─mall4cloud-common-cache  -- 缓存相关公共代码
│  ├─mall4cloud-common-core  -- 公共模块核心（公共中的公共代码）
│  ├─mall4cloud-common-database  -- 数据库连接相关公共代码
│  ├─mall4cloud-common-order  -- 订单相关公共代码
│  ├─mall4cloud-common-product  -- 商品相关公共代码
│  ├─mall4cloud-common-rocketmq  -- rocketmq相关公共代码
│  └─mall4cloud-common-security  -- 安全相关公共代码
├─mall4cloud-gateway  -- 网关
├─mall4cloud-leaf  -- 基于美团leaf的生成id服务
├─mall4cloud-multishop  -- 商家端
├─mall4cloud-order  -- 订单服务
├─mall4cloud-payment  -- 支付服务
├─mall4cloud-platform  -- 平台端
├─mall4cloud-product  -- 商品服务
├─mall4cloud-rbac  -- 用户角色权限模块
├─mall4cloud-search  -- 搜索模块
└─mall4cloud-user  -- 用户服务
```

## 演示地址

pc端：待发布..

小程序端：待发布..

小程序配送端：待发布..


## API 文档

- Swagger：<http://freshshop.ppjun.cn/swagger>
- Swagger 数据源：<http://freshshop.ppjun.cn/swagger.json>
  <br>`注意：建议使用 apifox 导入 swagger 文档以获取更好的体验`

## UI 设计图

- 原型图：https://js.design/f/bXLwLn?p=6HeVh8CrQ5

## 特别鸣谢
感谢以下的项目,排名不分先后

Nest.js：[https://nest.nodejs.cn/](url)

Vue3:[https://cn.vuejs.org/](url)

jQuery：[http://jquery.com](url)

## 版权信息

开发不易如果内容帮助到您，请给我们点上星星。

遵循Apache2开源协议发布，并提供免费使用。

本项目包含的第三方源码和二进制文件之版权信息另行标注。

版权所有Copyright © 2023-2028 by NestAdmin All rights reserved。
