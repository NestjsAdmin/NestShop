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
import { FsStore } from './fsStore';

export class FsStorePageVo {
    'code'?: number;
    'msg'?: string;
    'page'?: number;
    'pageSize'?: number;
    'totalCount'?: number;
    'data'?: Array<FsStore>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "code",
            "type": "number"
        },
        {
            "name": "msg",
            "baseName": "msg",
            "type": "string"
        },
        {
            "name": "page",
            "baseName": "page",
            "type": "number"
        },
        {
            "name": "pageSize",
            "baseName": "pageSize",
            "type": "number"
        },
        {
            "name": "totalCount",
            "baseName": "totalCount",
            "type": "number"
        },
        {
            "name": "data",
            "baseName": "data",
            "type": "Array<FsStore>"
        }    ];

    static getAttributeTypeMap() {
        return FsStorePageVo.attributeTypeMap;
    }
}

