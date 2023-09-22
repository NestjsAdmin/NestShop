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
 * @interface OrderReceiptDto
 */
export interface OrderReceiptDto {
    /**
     * 订单id
     * @type {number}
     * @memberof OrderReceiptDto
     */
    id: number;
    /**
     * 收货人
     * @type {string}
     * @memberof OrderReceiptDto
     */
    consignee: string;
    /**
     * 地址
     * @type {string}
     * @memberof OrderReceiptDto
     */
    address: string;
    /**
     * 联系电话
     * @type {string}
     * @memberof OrderReceiptDto
     */
    phone: string;
}

