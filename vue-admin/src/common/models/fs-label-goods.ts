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
 * @interface FsLabelGoods
 */
export interface FsLabelGoods {
    /**
     * ID
     * @type {number}
     * @memberof FsLabelGoods
     */
    id?: number | null;
    /**
     * 商品id
     * @type {number}
     * @memberof FsLabelGoods
     */
    goodsId: number;
    /**
     * 标签id
     * @type {number}
     * @memberof FsLabelGoods
     */
    labelId: number;
    /**
     * 创建时间
     * @type {string}
     * @memberof FsLabelGoods
     */
    createAt?: string | null;
}


