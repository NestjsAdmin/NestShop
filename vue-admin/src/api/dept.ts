import { DeptVo } from '../common/models/dept-vo';
import request from '/@/utils/request';
import { AdDept } from '../common/models/ad-dept';

const module = '/admin/dept';

// 查询部门
export function getDept() {
	return request<DeptVo[]>({
		url: `${module}`,
		method: 'get',
		showLoading: false,
	});
}

//新增部门
export function postDept(data: AdDept) {
	return request<AdDept[]>({
		url: `${module}`,
		method: 'post',
		data,
	});
}

//更新部门
export function putDept(data: AdDept) {
	return request<AdDept[]>({
		url: `${module}`,
		method: 'post',
		data,
	});
}

// 删除部门
export function deleteDept(id: number) {
	return request({
		url: `${module}/${id}`,
		method: 'delete',
	});
}
