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


import { AdUser } from './ad-user';

/**
 * 
 * @export
 * @interface AdUserPageVo
 */
export interface AdUserPageVo {
    /**
     * 
     * @type {number}
     * @memberof AdUserPageVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof AdUserPageVo
     */
    msg?: string;
    /**
     * 
     * @type {number}
     * @memberof AdUserPageVo
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof AdUserPageVo
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof AdUserPageVo
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<AdUser>}
     * @memberof AdUserPageVo
     */
    data?: Array<AdUser>;
}


