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
 * @interface FsGoods
 */
export interface FsGoods {
    /**
     * ID
     * @type {number}
     * @memberof FsGoods
     */
    id?: number | null;
    /**
     * 门店id
     * @type {number}
     * @memberof FsGoods
     */
    storeId: number;
    /**
     * 分类id
     * @type {number}
     * @memberof FsGoods
     */
    cateId: number;
    /**
     * 商品名称
     * @type {string}
     * @memberof FsGoods
     */
    name: string;
    /**
     * 商品图片
     * @type {string}
     * @memberof FsGoods
     */
    image: string;
    /**
     * 轮播图（用,分割）
     * @type {string}
     * @memberof FsGoods
     */
    swiper: string;
    /**
     * 商品简介
     * @type {string}
     * @memberof FsGoods
     */
    introduction?: string | null;
    /**
     * 规格名称
     * @type {string}
     * @memberof FsGoods
     */
    unit?: string | null;
    /**
     * 排序
     * @type {number}
     * @memberof FsGoods
     */
    sort: number;
    /**
     * 储存方式
     * @type {string}
     * @memberof FsGoods
     */
    storage?: string | null;
    /**
     * 生产日期
     * @type {string}
     * @memberof FsGoods
     */
    pd?: string | null;
    /**
     * 保质期（天）
     * @type {number}
     * @memberof FsGoods
     */
    exp?: number | null;
    /**
     * 关键词
     * @type {string}
     * @memberof FsGoods
     */
    keyword?: string | null;
    /**
     * 条形码
     * @type {string}
     * @memberof FsGoods
     */
    barcode?: string | null;
    /**
     * 商品价格
     * @type {string}
     * @memberof FsGoods
     */
    price: string;
    /**
     * 市场价格
     * @type {string}
     * @memberof FsGoods
     */
    originPrice: string;
    /**
     * 成本价
     * @type {string}
     * @memberof FsGoods
     */
    cost?: string | null;
    /**
     * 销量
     * @type {number}
     * @memberof FsGoods
     */
    sales: number;
    /**
     * 库存
     * @type {number}
     * @memberof FsGoods
     */
    stock: number;
    /**
     * 状态，1上架、2下架
     * @type {number}
     * @memberof FsGoods
     */
    status: number;
    /**
     * 商品详情
     * @type {string}
     * @memberof FsGoods
     */
    description: string;
    /**
     * 浏览量
     * @type {number}
     * @memberof FsGoods
     */
    browse: number;
    /**
     * 返回积分
     * @type {number}
     * @memberof FsGoods
     */
    backIntegral: number;
    /**
     * 所需积分
     * @type {number}
     * @memberof FsGoods
     */
    needIntegral?: number | null;
    /**
     * 是否限制时段
     * @type {number}
     * @memberof FsGoods
     */
    isLimitTime: number;
    /**
     * 限制开始时间
     * @type {string}
     * @memberof FsGoods
     */
    limitStartTime?: string | null;
    /**
     * 限制结束时间
     * @type {string}
     * @memberof FsGoods
     */
    limitEndTime?: string | null;
    /**
     * 商品类型（普通商品，积分商品）
     * @type {number}
     * @memberof FsGoods
     */
    type: number;
    /**
     * 创建时间
     * @type {string}
     * @memberof FsGoods
     */
    createAt?: string | null;
    /**
     * 更新时间
     * @type {string}
     * @memberof FsGoods
     */
    updateAt?: string | null;
}

