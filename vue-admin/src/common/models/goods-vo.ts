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


import { Goods } from './goods';

/**
 * 
 * @export
 * @interface GoodsVo
 */
export interface GoodsVo {
    /**
     * 
     * @type {number}
     * @memberof GoodsVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof GoodsVo
     */
    msg?: string;
    /**
     * 商品信息
     * @type {Goods}
     * @memberof GoodsVo
     */
    data: Goods;
}

