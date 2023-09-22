<template>
	<view class="content">
		<u-form :model="form" ref="$form" label-position="top">
			<view class="firstCard">
				<view v-if="form.address === ''" class="map">
					<map style="width: 100%; height: 196rpx;" :scale="14.5" :latitude="loaction.latitude"
						:longitude="loaction.longitude" show-location>
					</map>
				</view>
				<u-cell-group :border="false">
					<u-cell-item v-if="form.address === ''" title="选择地址" :value="form.name" :label="form.address"
						@click="chooseLocation"></u-cell-item>
					<u-cell-item v-else :title="form.name" :label="form.address" @click="chooseLocation">
					</u-cell-item>
				</u-cell-group>

				<view class="addressDetail">
					<u-form-item v-if="form.address !== ''" label="具体地址" prop="addressDetail">
						<u-input v-model="form.addressDetail" placeholder="请填写具体地址" />
					</u-form-item>
				</view>
			</view>

			<view class="secondCard">
				<u-form-item label="收件人" prop="receiver">
					<u-input v-model="form.receiver" placeholder="请填写收件人姓名" />
				</u-form-item>
				<u-form-item label="手机号码" prop="phone">
					<u-input v-model="form.phone" placeholder="请填写收件人手机号码" />
				</u-form-item>
			</view>

			<view class="thirdCard">
				<view :class="form.label === '家'? 'selectItem':''" @click="form.label='家'">
					<text>家</text>
				</view>
				<view :class="form.label === '公司'? 'selectItem':''" @click="form.label ='公司'">
					<text>公司</text>
				</view>
				<view :class="form.label === '父母家'? 'selectItem':''" @click="form.label ='父母家'">
					<text>父母家</text>
				</view>
			</view>


			<view class="btn">
				<u-button type="success" shape="circle" @click="commit">{{`${pageType}地址`}}</u-button>
			</view>
			<view class="btn" style="margin-top: 20rpx;">
				<u-button v-if="pageType === '修改'" type="error" shape="circle" @click="show=true">删除地址</u-button>
			</view>
		</u-form>
		<LoadingPage :show="loading" />
		<u-modal v-model="show" content="删除地址后不可恢复" @confirm="removeAddr" show-cancel-button></u-modal>
	</view>
</template>

<script lang="ts" setup>
	import {
		onMounted,
		ref,
		reactive,
		shallowRef
	} from "vue";
	import {
		onLoad,
		onReady
	} from "@dcloudio/uni-app"
	import {
		deleteAddress,
		postAddress,
		putAddress
	} from "../../api/address";
	import {
		FsAddress
	} from "../../models/FsAddress";



	const pageType = ref < '新增' | '修改' > ('新增')

	const loaction = reactive({
		latitude: 23.106487,
		longitude: 113.324587
	})

	const form = reactive({
		userId: 0,
		name: '',
		label: "",
		address: '',
		latitude: '',
		longitude: '',
		phone: '',
		addressDetail: '',
		isDefault: false,
		receiver: ''
	} as FsAddress)

	const rule = shallowRef({
		addressDetail: [{
			required: true,
			message: '请输入具体地址',
			trigger: ['change', 'blur'],
			type: 'string'
		}],
		receiver: [{
			required: true,
			message: '请输入收件人姓名',
			trigger: ['change', 'blur'],
			type: 'string'
		}],
		phone: [{
			required: true,
			message: '请输入收件人手机号',
			trigger: ['change', 'blur'],
			type: 'string'
		}]
	})

	const getLocation = () => {
		uni.getLocation({
			type: 'gcj02',
			success: (res) => {
				loaction.latitude = res.latitude
				loaction.longitude = res.longitude
			},
			fail: () => {},
			complete: () => {}
		});
	}

	const chooseLocation = () => {
		uni.chooseLocation({
			success: function(res) {
				form.name = res.name
				form.address = res.address
				form.latitude = res.latitude.toString()
				form.longitude = res.longitude.toString()
			}
		})
	}

	const loading = ref(true)

	//点击提交按钮
	const commit = () => {
		if (!form.address) {
			uni.showToast({
				title: '请选择地址',
				mask: true,
				icon: 'error'
			})
			return
		}
		$form.value.validate((valid: boolean) => {
			if (valid) {
				if (pageType.value === '新增') {
					addAddress()
				} else if (pageType.value === '修改') {
					modifyAddress()
				}
				console.log('验证通过');
			}
		})
	}

	//新增地址
	const addAddress = async () => {
		const {
			code,
			msg
		} = await postAddress(form)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: msg,
			mask: true,
			complete: () => {
				setTimeout(() => uni.navigateBack(), 500)
			}
		})
		return Promise.resolve()
	}

	//修改地址
	const modifyAddress = async () => {
		const {
			code,
			msg
		} = await putAddress(form)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: msg,
			mask: true,
			complete: () => {
				setTimeout(() => uni.navigateBack(), 500)
			}
		})
		return Promise.resolve()
	}

	const show = ref(false)

	//删除地址
	const removeAddr = async () => {
		if (!form.id) return Promise.reject()
		const {
			code,
			msg
		} = await deleteAddress(form.id)
		if (code !== 200) return Promise.reject()
		uni.showToast({
			title: msg,
			mask: true,
			complete: () => {
				setTimeout(() => uni.navigateBack(), 500)
			}
		})
		return Promise.resolve()
	}

	onLoad(({
		type,
		addr
	}) => {
		if (type === '修改') {
			pageType.value = '修改'
			const row = JSON.parse(decodeURI(addr))
			delete row.createAt
			delete row.updateAt
			Object.assign(form, row)
		}
	})

	const $form = ref() as any
	onReady(() => {
		$form.value.setRules(rule.value);
	})

	onMounted(() => {
		getLocation()
		setTimeout(() => {
			loading.value = false
		}, 1000)
	})
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f8f9fa;
		padding: 30rpx;
		box-sizing: border-box;
		height: 100vh;

		.firstCard,
		.secondCard,
		.thirdCard {
			background-color: white;
			border-radius: 20rpx;
		}

		.map {
			border-radius: 20rpx;
			padding: 30rpx 30rpx 0;
		}

		.addressDetail {
			padding: 0 30rpx;
		}

		.secondCard,
		.thirdCard {
			padding: 30rpx;
			margin-top: 20rpx;
		}

		.thirdCard {
			color: #666666;
			display: flex;
			justify-content: space-between;

			>view {
				width: 30%;
				background-color: #f8f9fa;
				text-align: center;
				padding: 15rpx 0;
				border-radius: 10rpx;
			}

			.selectItem {
				background-color: #d9efd7 !important;
				color: black !important;
				font-weight: 500;
			}
		}

		.btn {
			margin-top: 60rpx;
			padding: 0 40rpx;
		}
	}
</style>
