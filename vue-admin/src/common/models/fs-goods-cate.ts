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
 * @interface FsGoodsCate
 */
export interface FsGoodsCate {
    /**
     * ID
     * @type {number}
     * @memberof FsGoodsCate
     */
    id?: number | null;
    /**
     * 父类id
     * @type {number}
     * @memberof FsGoodsCate
     */
    pid?: number | null;
    /**
     * 分类名称
     * @type {string}
     * @memberof FsGoodsCate
     */
    name: string;
    /**
     * 图标
     * @type {string}
     * @memberof FsGoodsCate
     */
    icon?: string | null;
    /**
     * 排序
     * @type {number}
     * @memberof FsGoodsCate
     */
    sort: number;
    /**
     * 是否在APP显示
     * @type {boolean}
     * @memberof FsGoodsCate
     */
    isShow: boolean;
    /**
     * 创建时间
     * @type {string}
     * @memberof FsGoodsCate
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof FsGoodsCate
     */
    updateAt?: string | null;
}


