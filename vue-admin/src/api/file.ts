import { AdFile } from '../common/models/ad-file';
import request from '/@/utils/request';

const module = '/file';

//获取文件列表
export const getFile = (params: { page: number; pageSize: number; keyword: string }) =>
	request<AdFile[]>({
		method: 'get',
		url: module,
		params,
		showLoading: false,
	});

//上传文件
export const postFile = (data: { file: File }) =>
	request<string[]>({
		headers: { 'Content-Type': 'multipart/form-data' },
		method: 'post',
		url: module,
		data,
	});

//删除文件
export const deleteFile = (id: number) =>
	request({
		method: 'delete',
		url: `${module}/${id}`,
	});

//上传多文件
export const postFiles = (data: FormData) =>
	request<string[]>({
		headers: { 'Content-Type': 'multipart/form-data' },
		method: 'post',
		url: `${module}/multiple`,
		data,
	});
