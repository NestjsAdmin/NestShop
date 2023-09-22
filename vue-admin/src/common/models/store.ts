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
 * @interface Store
 */
export interface Store {
    /**
     * 
     * @type {number}
     * @memberof Store
     */
    id?: number | null;
    /**
     * 店长id
     * @type {number}
     * @memberof Store
     */
    userId: number;
    /**
     * 门店名称
     * @type {string}
     * @memberof Store
     */
    name: string;
    /**
     * 简介
     * @type {string}
     * @memberof Store
     */
    introduction: string;
    /**
     * 手机号码
     * @type {string}
     * @memberof Store
     */
    phone: string;
    /**
     * 省市区
     * @type {string}
     * @memberof Store
     */
    address: string;
    /**
     * 详细地址
     * @type {string}
     * @memberof Store
     */
    addressDetail: string;
    /**
     * 门店图片
     * @type {string}
     * @memberof Store
     */
    image: string;
    /**
     * 纬度
     * @type {string}
     * @memberof Store
     */
    latitude: string;
    /**
     * 经度
     * @type {string}
     * @memberof Store
     */
    longitude: string;
    /**
     * 社区名称（小区名称）
     * @type {string}
     * @memberof Store
     */
    communityName: string;
    /**
     * 核销有效日期
     * @type {string}
     * @memberof Store
     */
    validTime?: string | null;
    /**
     * 是否营业
     * @type {boolean}
     * @memberof Store
     */
    isShow: boolean;
    /**
     * 营业起始时间（HH:mm）
     * @type {string}
     * @memberof Store
     */
    dayTimeEnd: string;
    /**
     * 营业结束时间（HH:mm）
     * @type {string}
     * @memberof Store
     */
    dayTimeStart: string;
    /**
     * 每星期营业，格式如：0,1（星期天，星期一）
     * @type {string}
     * @memberof Store
     */
    dayWeek: string;
    /**
     * 核销起始时间
     * @type {string}
     * @memberof Store
     */
    validTimeStart?: string | null;
    /**
     * 核销结束时间
     * @type {string}
     * @memberof Store
     */
    validTimeEnd?: string | null;
    /**
     * 配送方式，是数组用,分割（1门店配送、2自提、3第三方配送）
     * @type {string}
     * @memberof Store
     */
    distributionWay: string;
    /**
     * 创建时间
     * @type {string}
     * @memberof Store
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof Store
     */
    updateAt?: string | null;
    /**
     * 距离
     * @type {number}
     * @memberof Store
     */
    distance: number;
}


