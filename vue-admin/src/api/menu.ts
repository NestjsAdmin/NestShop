import { AdMenu } from '../common/models/ad-menu';
import { MenuVo } from '../common/models/menu-vo';
import request from '/@/utils/request';

const module = '/admin/menu';

// 查询菜单
export function getMenu() {
	return request<MenuVo[]>({
		url: `${module}`,
		method: 'get',
		showLoading: false,
	});
}

// 新增菜单
export function postMenu(data: AdMenu) {
	return request<AdMenu>({
		url: `${module}`,
		method: 'post',
		data,
	});
}

// 删除菜单
export function deleteMenu(id: number) {
	return request({
		url: `${module}/${id}`,
		method: 'delete',
	});
}

// 新增菜单
export function putMenu(data: AdMenu) {
	return request<AdMenu>({
		url: `${module}`,
		method: 'put',
		data,
	});
}
