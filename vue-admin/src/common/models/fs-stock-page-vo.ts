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
 * @interface FsStockPageVo
 */
export interface FsStockPageVo {
    /**
     * 
     * @type {number}
     * @memberof FsStockPageVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof FsStockPageVo
     */
    msg?: string;
    /**
     * 
     * @type {number}
     * @memberof FsStockPageVo
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof FsStockPageVo
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof FsStockPageVo
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<FsStock>}
     * @memberof FsStockPageVo
     */
    data?: Array<FsStock>;
}


