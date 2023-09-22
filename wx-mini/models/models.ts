export * from './adDept';
export * from './adDeptVo';
export * from './adFile';
export * from './adFilePageVo';
export * from './adMenu';
export * from './adMenuVo';
export * from './adRole';
export * from './adRoleMenu';
export * from './adRoleMenuArrayVo';
export * from './adRolePageVo';
export * from './adRoleVo';
export * from './adUser';
export * from './adUserPageVo';
export * from './adUserVo';
export * from './apiResultVo';
export * from './captcha';
export * from './captchaVo';
export * from './cartArrayVo';
export * from './cartDto';
export * from './cartVo';
export * from './catePageVo';
export * from './cateVo';
export * from './deptPageVo';
export * from './deptVo';
export * from './fileVo';
export * from './fsAddress';
export * from './fsAddressArrayVo';
export * from './fsAddressVo';
export * from './fsCart';
export * from './fsCartArrayVo';
export * from './fsGoods';
export * from './fsGoodsCate';
export * from './fsGoodsCateArrayVo';
export * from './fsGoodsCateVo';
export * from './fsGoodsLabel';
export * from './fsGoodsLabelArrayVo';
export * from './fsGoodsLabelPageVo';
export * from './fsGoodsLabelVo';
export * from './fsGoodsPageVo';
export * from './fsGoodsVo';
export * from './fsLabelGoods';
export * from './fsLabelGoodsArrayVo';
export * from './fsOrder';
export * from './fsOrderItem';
export * from './fsOrderPageVo';
export * from './fsOrderVo';
export * from './fsRecharge';
export * from './fsRechargeArrayVo';
export * from './fsRechargeVo';
export * from './fsStore';
export * from './fsStorePageVo';
export * from './fsStoreVo';
export * from './fsSwiper';
export * from './fsSwiperArrayVo';
export * from './fsSwiperVo';
export * from './fsUser';
export * from './fsUserPageVo';
export * from './fsUserVo';
export * from './goods';
export * from './goodsArrayVo';
export * from './goodsLabelDto';
export * from './goodsVo';
export * from './inlineObject';
export * from './inlineObject1';
export * from './menuPageVo';
export * from './menuVo';
export * from './metaVo';
export * from './orderAndItemVo';
export * from './orderDeliveryDto';
export * from './orderDetailPageVo';
export * from './orderDetailVo';
export * from './orderDto';
export * from './orderItem';
export * from './orderReceiptDto';
export * from './orderTotalVo';
export * from './orderWeixinVo';
export * from './roleMenuDto';
export * from './store';
export * from './storePageVo';
export * from './storeVo';
export * from './timeVo';
export * from './totalVo';
export * from './userLoginDataVo';
export * from './userLoginVo';
export * from './userWxLoginDataVo';
export * from './userWxLoginVo';

import localVarRequest = require('request');

import { AdDept } from './adDept';
import { AdDeptVo } from './adDeptVo';
import { AdFile } from './adFile';
import { AdFilePageVo } from './adFilePageVo';
import { AdMenu } from './adMenu';
import { AdMenuVo } from './adMenuVo';
import { AdRole } from './adRole';
import { AdRoleMenu } from './adRoleMenu';
import { AdRoleMenuArrayVo } from './adRoleMenuArrayVo';
import { AdRolePageVo } from './adRolePageVo';
import { AdRoleVo } from './adRoleVo';
import { AdUser } from './adUser';
import { AdUserPageVo } from './adUserPageVo';
import { AdUserVo } from './adUserVo';
import { ApiResultVo } from './apiResultVo';
import { Captcha } from './captcha';
import { CaptchaVo } from './captchaVo';
import { CartArrayVo } from './cartArrayVo';
import { CartDto } from './cartDto';
import { CartVo } from './cartVo';
import { CatePageVo } from './catePageVo';
import { CateVo } from './cateVo';
import { DeptPageVo } from './deptPageVo';
import { DeptVo } from './deptVo';
import { FileVo } from './fileVo';
import { FsAddress } from './fsAddress';
import { FsAddressArrayVo } from './fsAddressArrayVo';
import { FsAddressVo } from './fsAddressVo';
import { FsCart } from './fsCart';
import { FsCartArrayVo } from './fsCartArrayVo';
import { FsGoods } from './fsGoods';
import { FsGoodsCate } from './fsGoodsCate';
import { FsGoodsCateArrayVo } from './fsGoodsCateArrayVo';
import { FsGoodsCateVo } from './fsGoodsCateVo';
import { FsGoodsLabel } from './fsGoodsLabel';
import { FsGoodsLabelArrayVo } from './fsGoodsLabelArrayVo';
import { FsGoodsLabelPageVo } from './fsGoodsLabelPageVo';
import { FsGoodsLabelVo } from './fsGoodsLabelVo';
import { FsGoodsPageVo } from './fsGoodsPageVo';
import { FsGoodsVo } from './fsGoodsVo';
import { FsLabelGoods } from './fsLabelGoods';
import { FsLabelGoodsArrayVo } from './fsLabelGoodsArrayVo';
import { FsOrder } from './fsOrder';
import { FsOrderItem } from './fsOrderItem';
import { FsOrderPageVo } from './fsOrderPageVo';
import { FsOrderVo } from './fsOrderVo';
import { FsRecharge } from './fsRecharge';
import { FsRechargeArrayVo } from './fsRechargeArrayVo';
import { FsRechargeVo } from './fsRechargeVo';
import { FsStore } from './fsStore';
import { FsStorePageVo } from './fsStorePageVo';
import { FsStoreVo } from './fsStoreVo';
import { FsSwiper } from './fsSwiper';
import { FsSwiperArrayVo } from './fsSwiperArrayVo';
import { FsSwiperVo } from './fsSwiperVo';
import { FsUser } from './fsUser';
import { FsUserPageVo } from './fsUserPageVo';
import { FsUserVo } from './fsUserVo';
import { Goods } from './goods';
import { GoodsArrayVo } from './goodsArrayVo';
import { GoodsLabelDto } from './goodsLabelDto';
import { GoodsVo } from './goodsVo';
import { InlineObject } from './inlineObject';
import { InlineObject1 } from './inlineObject1';
import { MenuPageVo } from './menuPageVo';
import { MenuVo } from './menuVo';
import { MetaVo } from './metaVo';
import { OrderAndItemVo } from './orderAndItemVo';
import { OrderDeliveryDto } from './orderDeliveryDto';
import { OrderDetailPageVo } from './orderDetailPageVo';
import { OrderDetailVo } from './orderDetailVo';
import { OrderDto } from './orderDto';
import { OrderItem } from './orderItem';
import { OrderReceiptDto } from './orderReceiptDto';
import { OrderTotalVo } from './orderTotalVo';
import { OrderWeixinVo } from './orderWeixinVo';
import { RoleMenuDto } from './roleMenuDto';
import { Store } from './store';
import { StorePageVo } from './storePageVo';
import { StoreVo } from './storeVo';
import { TimeVo } from './timeVo';
import { TotalVo } from './totalVo';
import { UserLoginDataVo } from './userLoginDataVo';
import { UserLoginVo } from './userLoginVo';
import { UserWxLoginDataVo } from './userWxLoginDataVo';
import { UserWxLoginVo } from './userWxLoginVo';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: {[index: string]: any} = {
}

let typeMap: {[index: string]: any} = {
    "AdDept": AdDept,
    "AdDeptVo": AdDeptVo,
    "AdFile": AdFile,
    "AdFilePageVo": AdFilePageVo,
    "AdMenu": AdMenu,
    "AdMenuVo": AdMenuVo,
    "AdRole": AdRole,
    "AdRoleMenu": AdRoleMenu,
    "AdRoleMenuArrayVo": AdRoleMenuArrayVo,
    "AdRolePageVo": AdRolePageVo,
    "AdRoleVo": AdRoleVo,
    "AdUser": AdUser,
    "AdUserPageVo": AdUserPageVo,
    "AdUserVo": AdUserVo,
    "ApiResultVo": ApiResultVo,
    "Captcha": Captcha,
    "CaptchaVo": CaptchaVo,
    "CartArrayVo": CartArrayVo,
    "CartDto": CartDto,
    "CartVo": CartVo,
    "CatePageVo": CatePageVo,
    "CateVo": CateVo,
    "DeptPageVo": DeptPageVo,
    "DeptVo": DeptVo,
    "FileVo": FileVo,
    "FsAddress": FsAddress,
    "FsAddressArrayVo": FsAddressArrayVo,
    "FsAddressVo": FsAddressVo,
    "FsCart": FsCart,
    "FsCartArrayVo": FsCartArrayVo,
    "FsGoods": FsGoods,
    "FsGoodsCate": FsGoodsCate,
    "FsGoodsCateArrayVo": FsGoodsCateArrayVo,
    "FsGoodsCateVo": FsGoodsCateVo,
    "FsGoodsLabel": FsGoodsLabel,
    "FsGoodsLabelArrayVo": FsGoodsLabelArrayVo,
    "FsGoodsLabelPageVo": FsGoodsLabelPageVo,
    "FsGoodsLabelVo": FsGoodsLabelVo,
    "FsGoodsPageVo": FsGoodsPageVo,
    "FsGoodsVo": FsGoodsVo,
    "FsLabelGoods": FsLabelGoods,
    "FsLabelGoodsArrayVo": FsLabelGoodsArrayVo,
    "FsOrder": FsOrder,
    "FsOrderItem": FsOrderItem,
    "FsOrderPageVo": FsOrderPageVo,
    "FsOrderVo": FsOrderVo,
    "FsRecharge": FsRecharge,
    "FsRechargeArrayVo": FsRechargeArrayVo,
    "FsRechargeVo": FsRechargeVo,
    "FsStore": FsStore,
    "FsStorePageVo": FsStorePageVo,
    "FsStoreVo": FsStoreVo,
    "FsSwiper": FsSwiper,
    "FsSwiperArrayVo": FsSwiperArrayVo,
    "FsSwiperVo": FsSwiperVo,
    "FsUser": FsUser,
    "FsUserPageVo": FsUserPageVo,
    "FsUserVo": FsUserVo,
    "Goods": Goods,
    "GoodsArrayVo": GoodsArrayVo,
    "GoodsLabelDto": GoodsLabelDto,
    "GoodsVo": GoodsVo,
    "InlineObject": InlineObject,
    "InlineObject1": InlineObject1,
    "MenuPageVo": MenuPageVo,
    "MenuVo": MenuVo,
    "MetaVo": MetaVo,
    "OrderAndItemVo": OrderAndItemVo,
    "OrderDeliveryDto": OrderDeliveryDto,
    "OrderDetailPageVo": OrderDetailPageVo,
    "OrderDetailVo": OrderDetailVo,
    "OrderDto": OrderDto,
    "OrderItem": OrderItem,
    "OrderReceiptDto": OrderReceiptDto,
    "OrderTotalVo": OrderTotalVo,
    "OrderWeixinVo": OrderWeixinVo,
    "RoleMenuDto": RoleMenuDto,
    "Store": Store,
    "StorePageVo": StorePageVo,
    "StoreVo": StoreVo,
    "TimeVo": TimeVo,
    "TotalVo": TotalVo,
    "UserLoginDataVo": UserLoginDataVo,
    "UserLoginVo": UserLoginVo,
    "UserWxLoginDataVo": UserWxLoginDataVo,
    "UserWxLoginVo": UserWxLoginVo,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class HttpBearerAuth implements Authentication {
    public accessToken: string | (() => string) = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            const accessToken = typeof this.accessToken === 'function'
                            ? this.accessToken()
                            : this.accessToken;
            requestOptions.headers["Authorization"] = "Bearer " + accessToken;
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        } else if (this.location == 'cookie' && requestOptions && requestOptions.headers) {
            if (requestOptions.headers['Cookie']) {
                requestOptions.headers['Cookie'] += '; ' + this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
            else {
                requestOptions.headers['Cookie'] = this.paramName + '=' + encodeURIComponent(this.apiKey);
            }
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}

export type Interceptor = (requestOptions: localVarRequest.Options) => (Promise<void> | void);
