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


import { FsStock } from './fs-stock';

/**
 * 
 * @export
 * @interface FsStockVo
 */
export interface FsStockVo {
    /**
     * 
     * @type {number}
     * @memberof FsStockVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof FsStockVo
     */
    msg?: string;
    /**
     * 
     * @type {FsStock}
     * @memberof FsStockVo
     */
    data?: FsStock;
}


