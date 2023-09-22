import { defineStore } from 'pinia'
import { FsAddress } from '@/models/FsAddress'
import { getAddressList } from '../api/address'

export const useAddress = defineStore('address', {
	state: () => ({ addressList: [] as FsAddress[], currentAddress: {} as FsAddress }),
	getters: {},
	actions: {
		async getAddress() {
			const {
				data,
				code
			} = await getAddressList()
			if (code !== 200) return Promise.reject()
			this.addressList = data
			this.currentAddress = data.find(item => item.isDefault) || {}
			return Promise.resolve()
		},
		
		clearAddress() {
			this.addressList = []
			this.currentAddress = {}
		}
	}
})