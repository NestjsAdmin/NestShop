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


import { FsAddress } from './fs-address';

/**
 * 
 * @export
 * @interface FsAddressArrayVo
 */
export interface FsAddressArrayVo {
    /**
     * 
     * @type {number}
     * @memberof FsAddressArrayVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof FsAddressArrayVo
     */
    msg?: string;
    /**
     * 
     * @type {Array<FsAddress>}
     * @memberof FsAddressArrayVo
     */
    data?: Array<FsAddress>;
}


