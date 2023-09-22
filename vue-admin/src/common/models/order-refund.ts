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
 * @interface OrderRefund
 */
export interface OrderRefund {
    /**
     * 订单id
     * @type {number}
     * @memberof OrderRefund
     */
    orderId: number;
    /**
     * 订单项目id
     * @type {Array<number>}
     * @memberof OrderRefund
     */
    orderItemIds: Array<number>;
    /**
     * 退款图片（用,分割）
     * @type {string}
     * @memberof OrderRefund
     */
    refundImage: string;
    /**
     * 退款原因
     * @type {string}
     * @memberof OrderRefund
     */
    refundReason: string;
}

