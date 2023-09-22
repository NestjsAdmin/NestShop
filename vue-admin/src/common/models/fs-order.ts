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
 * @interface FsOrder
 */
export interface FsOrder {
    /**
     * ID
     * @type {number}
     * @memberof FsOrder
     */
    id?: number | null;
    /**
     * 订单号
     * @type {string}
     * @memberof FsOrder
     */
    orderNumber: string;
    /**
     * 额外订单号
     * @type {string}
     * @memberof FsOrder
     */
    extendNumber?: string | null;
    /**
     * 用户id
     * @type {number}
     * @memberof FsOrder
     */
    userId?: number | null;
    /**
     * 用户名称
     * @type {string}
     * @memberof FsOrder
     */
    userName?: string | null;
    /**
     * 门店id
     * @type {number}
     * @memberof FsOrder
     */
    storeId?: number | null;
    /**
     * 门店名称
     * @type {string}
     * @memberof FsOrder
     */
    storeName?: string | null;
    /**
     * 配送员id
     * @type {number}
     * @memberof FsOrder
     */
    dispatcherId?: number | null;
    /**
     * 配送员姓名
     * @type {string}
     * @memberof FsOrder
     */
    dispatcherName?: string | null;
    /**
     * 联系电话
     * @type {string}
     * @memberof FsOrder
     */
    phone?: string | null;
    /**
     * 地址
     * @type {string}
     * @memberof FsOrder
     */
    address?: string | null;
    /**
     * 收货人
     * @type {string}
     * @memberof FsOrder
     */
    consignee?: string | null;
    /**
     * 商品总数
     * @type {number}
     * @memberof FsOrder
     */
    totalNum: number;
    /**
     * 商品总价
     * @type {string}
     * @memberof FsOrder
     */
    totalPrice: string;
    /**
     * 是否已支付
     * @type {boolean}
     * @memberof FsOrder
     */
    isPaid: boolean;
    /**
     * 返回积分
     * @type {number}
     * @memberof FsOrder
     */
    backIntegral: number;
    /**
     * 支付时间
     * @type {string}
     * @memberof FsOrder
     */
    payTime?: string | null;
    /**
     * 支付方式，如微信支付、现金支付、余额支付、积分支付等
     * @type {string}
     * @memberof FsOrder
     */
    payType: string;
    /**
     * 订单来源，1小程序商城、2人工收银台、3自助收银台
     * @type {number}
     * @memberof FsOrder
     */
    origin: number;
    /**
     * 订单状态，1待发货、2待收货、3已完成、4申请退款、5已退款、6已取消
     * @type {number}
     * @memberof FsOrder
     */
    status: number;
    /**
     * 退款图片（用,分割）
     * @type {string}
     * @memberof FsOrder
     */
    refundImage?: string | null;
    /**
     * 退款原因
     * @type {string}
     * @memberof FsOrder
     */
    refundReason?: string | null;
    /**
     * 拒绝退款理由
     * @type {string}
     * @memberof FsOrder
     */
    refundRefuse?: string | null;
    /**
     * 退款时间
     * @type {string}
     * @memberof FsOrder
     */
    refundTime?: string | null;
    /**
     * 退款金额
     * @type {string}
     * @memberof FsOrder
     */
    refundPrice?: string | null;
    /**
     * 订单类型，1商品、2充值
     * @type {number}
     * @memberof FsOrder
     */
    orderType: number;
    /**
     * 充值金额
     * @type {string}
     * @memberof FsOrder
     */
    chargePrice?: string | null;
    /**
     * 订单备注
     * @type {string}
     * @memberof FsOrder
     */
    mark?: string | null;
    /**
     * 送货方式，1门店配送、2到店自提、3第三方配送
     * @type {number}
     * @memberof FsOrder
     */
    deliveryType?: number | null;
    /**
     * 配送时间
     * @type {string}
     * @memberof FsOrder
     */
    distributionTime?: string | null;
    /**
     * 创建时间
     * @type {string}
     * @memberof FsOrder
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof FsOrder
     */
    updateAt?: string | null;
}


