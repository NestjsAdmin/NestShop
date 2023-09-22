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


import { CartVo } from './cart-vo';

/**
 * 
 * @export
 * @interface CartArrayVo
 */
export interface CartArrayVo {
    /**
     * 
     * @type {number}
     * @memberof CartArrayVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof CartArrayVo
     */
    msg?: string;
    /**
     * 购物车数据
     * @type {Array<CartVo>}
     * @memberof CartArrayVo
     */
    data?: Array<CartVo>;
}


