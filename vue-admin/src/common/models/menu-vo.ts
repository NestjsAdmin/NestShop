// tslint:disable
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


import { MetaVo } from './meta-vo';

/**
 * 
 * @export
 * @interface MenuVo
 */
export interface MenuVo {
    /**
     * ID
     * @type {number}
     * @memberof MenuVo
     */
    id?: number | null;
    /**
     * 路由名称
     * @type {string}
     * @memberof MenuVo
     */
    name: string;
    /**
     * 路由路径
     * @type {string}
     * @memberof MenuVo
     */
    path: string;
    /**
     * 组件路径
     * @type {string}
     * @memberof MenuVo
     */
    component: string;
    /**
     * 重定向
     * @type {string}
     * @memberof MenuVo
     */
    redirect?: string | null;
    /**
     * 菜单标题
     * @type {string}
     * @memberof MenuVo
     */
    title: string;
    /**
     * 是否外链
     * @type {boolean}
     * @memberof MenuVo
     */
    isLink: boolean;
    /**
     * 是否缓存
     * @type {boolean}
     * @memberof MenuVo
     */
    isKeepAlive: boolean;
    /**
     * 是否固定
     * @type {boolean}
     * @memberof MenuVo
     */
    isAffix: boolean;
    /**
     * 是否内嵌
     * @type {boolean}
     * @memberof MenuVo
     */
    isIframe: boolean;
    /**
     * 是否隐藏
     * @type {boolean}
     * @memberof MenuVo
     */
    isHide: boolean;
    /**
     * 菜单图标
     * @type {string}
     * @memberof MenuVo
     */
    icon?: string | null;
    /**
     * 菜单排序
     * @type {number}
     * @memberof MenuVo
     */
    menuSort: number;
    /**
     * 菜单类型
     * @type {string}
     * @memberof MenuVo
     */
    menuType: string;
    /**
     * 父节点id
     * @type {number}
     * @memberof MenuVo
     */
    pid?: number | null;
    /**
     * 创建时间
     * @type {string}
     * @memberof MenuVo
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof MenuVo
     */
    updateAt?: string | null;
    /**
     * 
     * @type {MetaVo}
     * @memberof MenuVo
     */
    meta?: MetaVo;
    /**
     * 子节点
     * @type {Array<MenuVo>}
     * @memberof MenuVo
     */
    children?: Array<MenuVo>;
}


