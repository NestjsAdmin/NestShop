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
import { FsOrder } from './fsOrder';
import { FsOrderItem } from './fsOrderItem';

export class OrderAndItemVo {
    /**
    * 订单
    */
    'order': FsOrder;
    /**
    * 订单商品
    */
    'orderItem': Array<FsOrderItem>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "order",
            "baseName": "order",
            "type": "FsOrder"
        },
        {
            "name": "orderItem",
            "baseName": "orderItem",
            "type": "Array<FsOrderItem>"
        }    ];

    static getAttributeTypeMap() {
        return OrderAndItemVo.attributeTypeMap;
    }
}

