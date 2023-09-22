import { request } from '@/utils/request'



const module = '/file'

//获取首页轮播图
export const postFile = (file : File) => request<string[]>({
	method: 'POST',
	url: module,
	data: {
		file
	},
})