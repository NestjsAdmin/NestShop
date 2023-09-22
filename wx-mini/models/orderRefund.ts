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

import { RequestFile } from '../api';

export class OrderRefund {
    /**
    * 订单id
    */
    'orderId': number;
    /**
    * 订单项目id
    */
    'orderItemIds': Array<number>;
    /**
    * 退款图片（用,分割）
    */
    'refundImage': string;
    /**
    * 退款原因
    */
    'refundReason': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "orderId",
            "baseName": "orderId",
            "type": "number"
        },
        {
            "name": "orderItemIds",
            "baseName": "orderItemIds",
            "type": "Array<number>"
        },
        {
            "name": "refundImage",
            "baseName": "refundImage",
            "type": "string"
        },
        {
            "name": "refundReason",
            "baseName": "refundReason",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OrderRefund.attributeTypeMap;
    }
}
