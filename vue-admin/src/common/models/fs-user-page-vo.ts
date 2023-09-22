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


import { FsUser } from './fs-user';

/**
 * 
 * @export
 * @interface FsUserPageVo
 */
export interface FsUserPageVo {
    /**
     * 
     * @type {number}
     * @memberof FsUserPageVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof FsUserPageVo
     */
    msg?: string;
    /**
     * 
     * @type {number}
     * @memberof FsUserPageVo
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof FsUserPageVo
     */
    pageSize?: number;
    /**
     * 
     * @type {number}
     * @memberof FsUserPageVo
     */
    totalCount?: number;
    /**
     * 
     * @type {Array<FsUser>}
     * @memberof FsUserPageVo
     */
    data?: Array<FsUser>;
}


