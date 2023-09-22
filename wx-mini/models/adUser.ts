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

export class AdUser {
    /**
    * ID
    */
    'id'?: number | null;
    /**
    * 用户名
    */
    'username': string;
    /**
    * 密码
    */
    'password': string;
    /**
    * 电话
    */
    'phone'?: string | null;
    /**
    * 昵称
    */
    'nickname': string;
    /**
    * 头像地址
    */
    'avatar'?: string | null;
    /**
    * 邮箱
    */
    'email'?: string | null;
    /**
    * 是否能够删除
    */
    'isDel': boolean;
    /**
    * 部门名称
    */
    'deptName'?: string | null;
    /**
    * 部门id
    */
    'deptId'?: number | null;
    /**
    * 角色id
    */
    'roleId'?: number | null;
    /**
    * 角色名称
    */
    'roleName'?: string | null;
    /**
    * 1为正常，2为禁用
    */
    'status': number;
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
            "name": "username",
            "baseName": "username",
            "type": "string"
        },
        {
            "name": "password",
            "baseName": "password",
            "type": "string"
        },
        {
            "name": "phone",
            "baseName": "phone",
            "type": "string"
        },
        {
            "name": "nickname",
            "baseName": "nickname",
            "type": "string"
        },
        {
            "name": "avatar",
            "baseName": "avatar",
            "type": "string"
        },
        {
            "name": "email",
            "baseName": "email",
            "type": "string"
        },
        {
            "name": "isDel",
            "baseName": "isDel",
            "type": "boolean"
        },
        {
            "name": "deptName",
            "baseName": "deptName",
            "type": "string"
        },
        {
            "name": "deptId",
            "baseName": "deptId",
            "type": "number"
        },
        {
            "name": "roleId",
            "baseName": "roleId",
            "type": "number"
        },
        {
            "name": "roleName",
            "baseName": "roleName",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "number"
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
        return AdUser.attributeTypeMap;
    }
}
