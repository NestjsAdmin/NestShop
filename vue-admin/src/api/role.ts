import { AdRole } from '../common/models/ad-role';
import { AdRoleMenu } from '../common/models/ad-role-menu';
import { RoleMenuDto } from '../common/models/role-menu-dto';
import request from '/@/utils/request';

const module = '/admin/role';

//查询角色列表
export const getRole = (params: { page?: number; pageSize?: number; name?: string }) => {
	return request<AdRole[]>({
		url: `${module}`,
		method: 'get',
		params,
		showLoading: false,
	});
};

//删除角色
export const deleteRole = (id: number) => {
	return request({
		url: `${module}/${id}`,
		method: 'delete',
	});
};

//新增角色
export const postRole = (data: AdRole) => {
	return request<AdRole>({
		url: `${module}`,
		method: 'post',
		data,
		showLoading: false,
	});
};

//修改角色
export const putRole = (data: AdRole) => {
	return request<AdRole>({
		url: `${module}`,
		method: 'put',
		data,
		showLoading: false,
	});
};

//查询角色菜单权限
export const getRoleMenu = (id: number) => {
	return request<AdRoleMenu[]>({
		url: `${module}/menu/${id}`,
		method: 'get',
		showLoading: false,
	});
};

//更新角色菜单权限
export const putRoleMenu = (data: RoleMenuDto) => {
	return request({
		url: `${module}/menu`,
		method: 'put',
		data,
		showLoading: false,
	});
};
