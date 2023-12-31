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
 * @interface FsOrderItem
 */
export interface FsOrderItem {
    /**
     * ID
     * @type {number}
     * @memberof FsOrderItem
     */
    id?: number | null;
    /**
     * 订单id
     * @type {number}
     * @memberof FsOrderItem
     */
    orderId: number;
    /**
     * 商品id
     * @type {number}
     * @memberof FsOrderItem
     */
    goodsId?: number | null;
    /**
     * 商品名称
     * @type {string}
     * @memberof FsOrderItem
     */
    name: string;
    /**
     * 商品价格
     * @type {string}
     * @memberof FsOrderItem
     */
    price: string;
    /**
     * 数量
     * @type {number}
     * @memberof FsOrderItem
     */
    number: number;
    /**
     * 图片地址
     * @type {string}
     * @memberof FsOrderItem
     */
    image: string;
    /**
     * 退款数量
     * @type {number}
     * @memberof FsOrderItem
     */
    refundNumber: number;
    /**
     * 退款状态，1未退款、2申请中、3已退款
     * @type {number}
     * @memberof FsOrderItem
     */
    refundStatus: number;
    /**
     * 创建时间
     * @type {string}
     * @memberof FsOrderItem
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof FsOrderItem
     */
    updateAt?: string | null;
}


