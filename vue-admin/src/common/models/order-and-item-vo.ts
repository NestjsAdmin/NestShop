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


import { FsOrder } from './fs-order';
import { FsOrderItem } from './fs-order-item';

/**
 * 
 * @export
 * @interface OrderAndItemVo
 */
export interface OrderAndItemVo {
    /**
     * 订单
     * @type {FsOrder}
     * @memberof OrderAndItemVo
     */
    order: FsOrder;
    /**
     * 订单商品
     * @type {Array<FsOrderItem>}
     * @memberof OrderAndItemVo
     */
    orderItem: Array<FsOrderItem>;
}

