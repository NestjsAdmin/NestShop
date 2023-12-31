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
 * @interface OrderChange
 */
export interface OrderChange {
    /**
     * 订单id
     * @type {number}
     * @memberof OrderChange
     */
    orderId: number;
    /**
     * 支付方式，如微信支付、现金支付、余额支付等
     * @type {string}
     * @memberof OrderChange
     */
    payType: string;
}


