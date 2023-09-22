import { defineStore } from 'pinia'
import { FsGoods } from '../models/fsGoods'


export const useFootprint = defineStore('footprint', {
	state: () => ({
		footprintList: []
	}),
	actions: {
		addFootprint(e : FsGoods) {
			const index = this.footprintList.findIndex((item : FsGoods) => e.id === item.id)
			if (index > -1) {
				this.footprintList.splice(index, 1)
			}
			this.footprintList.unshift(e)
			if (this.footprintList.length > 10) {
				this.footprintList.pop()
			}
		},
		clearFootprint() {
			this.footprintList.length = 0
		}
	}
})