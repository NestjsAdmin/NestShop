import { request } from '@/utils/request'
import { FsSwiper } from '@/models/fsSwiper'


const module = '/client/swiper'

//获取首页轮播图
export const getSwiper = () => request<FsSwiper[]>({
	method: 'GET',
	url: module,
	showLoading: false
})