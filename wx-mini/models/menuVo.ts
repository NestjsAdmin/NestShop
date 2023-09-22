/**
 * 社区生鲜
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from '../api';
import { MetaVo } from './metaVo';

export class MenuVo {
    /**
    * ID
    */
    'id'?: number | null;
    /**
    * 路由名称
    */
    'name': string;
    /**
    * 路由路径
    */
    'path': string;
    /**
    * 组件路径
    */
    'component': string;
    /**
    * 重定向
    */
    'redirect'?: string | null;
    /**
    * 菜单标题
    */
    'title': string;
    /**
    * 是否外链
    */
    'isLink': boolean;
    /**
    * 是否缓存
    */
    'isKeepAlive': boolean;
    /**
    * 是否固定
    */
    'isAffix': boolean;
    /**
    * 是否内嵌
    */
    'isIframe': boolean;
    /**
    * 是否隐藏
    */
    'isHide': boolean;
    /**
    * 菜单图标
    */
    'icon'?: string | null;
    /**
    * 菜单排序
    */
    'menuSort': number;
    /**
    * 菜单类型
    */
    'menuType': string;
    /**
    * 父节点id
    */
    'pid'?: number | null;
    /**
    * 创建时间
    */
    'createAt'?: Date | null;
    /**
    * 更新时间
    */
    'updateAt'?: Date | null;
    'meta'?: MetaVo;
    /**
    * 子节点
    */
    'children'?: Array<MenuVo>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "path",
            "baseName": "path",
            "type": "string"
        },
        {
            "name": "component",
            "baseName": "component",
            "type": "string"
        },
        {
            "name": "redirect",
            "baseName": "redirect",
            "type": "string"
        },
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "isLink",
            "baseName": "isLink",
            "type": "boolean"
        },
        {
            "name": "isKeepAlive",
            "baseName": "isKeepAlive",
            "type": "boolean"
        },
        {
            "name": "isAffix",
            "baseName": "isAffix",
            "type": "boolean"
        },
        {
            "name": "isIframe",
            "baseName": "isIframe",
            "type": "boolean"
        },
        {
            "name": "isHide",
            "baseName": "isHide",
            "type": "boolean"
        },
        {
            "name": "icon",
            "baseName": "icon",
            "type": "string"
        },
        {
            "name": "menuSort",
            "baseName": "menuSort",
            "type": "number"
        },
        {
            "name": "menuType",
            "baseName": "menuType",
            "type": "string"
        },
        {
            "name": "pid",
            "baseName": "pid",
            "type": "number"
        },
        {
            "name": "createAt",
            "baseName": "createAt",
            "type": "Date"
        },
        {
            "name": "updateAt",
            "baseName": "updateAt",
            "type": "Date"
        },
        {
            "name": "meta",
            "baseName": "meta",
            "type": "MetaVo"
        },
        {
            "name": "children",
            "baseName": "children",
            "type": "Array<MenuVo>"
        }    ];

    static getAttributeTypeMap() {
        return MenuVo.attributeTypeMap;
    }
}

