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



/**
 * 
 * @export
 * @interface AdMenu
 */
export interface AdMenu {
    /**
     * ID
     * @type {number}
     * @memberof AdMenu
     */
    id?: number | null;
    /**
     * 路由名称
     * @type {string}
     * @memberof AdMenu
     */
    name: string;
    /**
     * 路由路径
     * @type {string}
     * @memberof AdMenu
     */
    path: string;
    /**
     * 组件路径
     * @type {string}
     * @memberof AdMenu
     */
    component: string;
    /**
     * 重定向
     * @type {string}
     * @memberof AdMenu
     */
    redirect?: string | null;
    /**
     * 菜单标题
     * @type {string}
     * @memberof AdMenu
     */
    title: string;
    /**
     * 是否外链
     * @type {boolean}
     * @memberof AdMenu
     */
    isLink: boolean;
    /**
     * 是否缓存
     * @type {boolean}
     * @memberof AdMenu
     */
    isKeepAlive: boolean;
    /**
     * 是否固定
     * @type {boolean}
     * @memberof AdMenu
     */
    isAffix: boolean;
    /**
     * 是否内嵌
     * @type {boolean}
     * @memberof AdMenu
     */
    isIframe: boolean;
    /**
     * 是否隐藏
     * @type {boolean}
     * @memberof AdMenu
     */
    isHide: boolean;
    /**
     * 菜单图标
     * @type {string}
     * @memberof AdMenu
     */
    icon?: string | null;
    /**
     * 菜单排序
     * @type {number}
     * @memberof AdMenu
     */
    menuSort: number;
    /**
     * 菜单类型
     * @type {string}
     * @memberof AdMenu
     */
    menuType: string;
    /**
     * 父节点id
     * @type {number}
     * @memberof AdMenu
     */
    pid?: number | null;
    /**
     * 创建时间
     * @type {string}
     * @memberof AdMenu
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof AdMenu
     */
    updateAt?: string | null;
}


