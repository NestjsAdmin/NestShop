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

export class OrderRefuseDto {
    /**
    * 订单id
    */
    'id': number;
    /**
    * 拒绝退款理由
    */
    'refundRefuse': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "refundRefuse",
            "baseName": "refundRefuse",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return OrderRefuseDto.attributeTypeMap;
    }
}

