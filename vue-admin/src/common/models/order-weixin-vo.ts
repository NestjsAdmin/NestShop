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
 * @interface OrderWeixinVo
 */
export interface OrderWeixinVo {
    /**
     * 
     * @type {number}
     * @memberof OrderWeixinVo
     */
    code?: number;
    /**
     * 
     * @type {string}
     * @memberof OrderWeixinVo
     */
    msg?: string;
    /**
     * 微信支付回参
     * @type {object}
     * @memberof OrderWeixinVo
     */
    data: object;
}

