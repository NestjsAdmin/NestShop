import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Session } from '/@/utils/storage';
import qs from 'qs';
import { ElLoading } from 'element-plus';

interface response<T> {
	code: number;
	data: T;
	msg: string;
	page: number;
	pageSize: number;
	totalCount: number;
}

interface requestConfig extends AxiosRequestConfig {
	showLoading?: boolean;
	showMsg?: boolean;
}

interface requestInternalConfig extends InternalAxiosRequestConfig {
	showLoading?: boolean;
	showMsg?: boolean;
}

interface responseConfig extends AxiosResponse {
	config: requestInternalConfig;
}

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000,
	headers: { 'Content-Type': 'application/json' },
	paramsSerializer: {
		serialize(params) {
			return qs.stringify(params, { allowDots: true });
		},
	},
});
//全局Loading
let Loading: any = undefined;
// 添加请求拦截器
service.interceptors.request.use(
	(config: requestInternalConfig) => {
		// 在发送请求之前做些什么 token
		if (config.showLoading === null || config.showLoading === undefined) config.showLoading = true;
		if (config.showLoading) {
			Loading = ElLoading.service({ lock: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.7)' });
		}
		if (Session.get('token')) {
			config.headers!['Authorization'] = `${Session.get('token')}`;
		}
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	(response: responseConfig) => {
		// 对响应数据做点什么
		Loading?.close();
		const res = response.data;
		let showMsg = true;
		if (response.config.showMsg === false) showMsg = false;
		if (res.code === 401 || res.code === 403) {
			// `token` 过期或者账号已在别处登录
			Session.clear(); // 清除浏览器全部临时缓存
			window.location.href = '/'; // 去登录页
			ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
				.then(() => {})
				.catch(() => {});
		} else if (showMsg && res.code.toString().slice(0, 1) === '4') {
			ElMessage.warning(res.msg);
		} else if (showMsg && res.code.toString().slice(0, 1) === '5') {
			ElMessage.error(res.msg);
		}

		return Promise.resolve(res);
	},
	(error) => {
		// 对响应错误做点什么
		Loading?.close();
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.data.msg);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

const request = async <T>(config: requestConfig): Promise<response<T>> => {
	return service(config);
};

// 导出 axios 实例
export default request;
