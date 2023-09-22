/**
 * FsCart
 */
export interface GoodsModel {
  /**
   * ID
   */
  id?: number | null;
  /**
   * 商品名称
   */
  name: string;
  /**
   * 标签名称，用,分割
   */
  labels?: string;
  /**
   * 商品图片
   */
  image: string;
  /**
   * 商品数量
   */
  number: number;
  /**
   * 门店id
   */
  storeId: number;
  /**
   * 价格
   */
  price: number;
  /**
   * 市场价
   */
  originPrice: number;
  /**
   * 规格名称
   */
  unit?: string;
}
