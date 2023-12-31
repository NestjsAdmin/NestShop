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

export class FsRecharge {
    /**
    * ID
    */
    'id'?: number | null;
    /**
    * 名称
    */
    'name': string;
    /**
    * 价格
    */
    'price': string;
    /**
    * 到账余额
    */
    'balance': string;
    /**
    * 备注
    */
    'remark'?: string | null;
    /**
    * 创建时间
    */
    'createAt'?: Date | null;
    /**
    * 更新时间
    */
    'updateAt'?: Date | null;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "price",
            "baseName": "price",
            "type": "string"
        },
        {
            "name": "balance",
            "baseName": "balance",
            "type": "string"
        },
        {
            "name": "remark",
            "baseName": "remark",
            "type": "string"
        },
        {
            "name": "createAt",
            "baseName": "createAt",
            "type": "Date"
        },
        {
            "name": "updateAt",
            "baseName": "updateAt",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return FsRecharge.attributeTypeMap;
    }
}

