import { route} from '@/config/route'
import {
	useUser
} from '@/stores/user'

const oldNavigateTo = uni.navigateTo
const oldRedirectTo = uni.redirectTo

const checkUrl = (url: string) => {
	if (!useUser().loggedIn && route.includes(url)) {
		uni.switchTab({
			url: '/pages/mine/mine'
		})
		uni.showToast({
			title: '请登录',
			icon: 'none',
			mask: true
		})
		return false
	}
	return true
}

const navigateTo = (options: UniNamespace.NavigateToOptions) => {
	if (!checkUrl(options.url.toString())) return
	oldNavigateTo(options)
}

const redirectTo = (options: UniNamespace.NavigateToOptions) => {
	if (!checkUrl(options.url.toString())) return
	oldRedirectTo(options)
}

const install = () => {
	uni.navigateTo = navigateTo
	uni.redirectTo = redirectTo
}

export default {
	install
}