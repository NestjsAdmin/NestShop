export const weixinPayment = (wxParams: any) => new Promise((res, rej) => {
	wx.requestPayment({
		...wxParams,
		success() {
			res(true)
		},
		fail(err) {
			console.log(err);
			rej(false)
		}
	})
})