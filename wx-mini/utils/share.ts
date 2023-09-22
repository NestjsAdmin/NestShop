
function onShareAppMessage() {
	return {
		title: '',
		path: ''
	}
}

function onShareTimeline() {
	return {
		title: '社区生鲜',
		path: '',
		imageUrl: '',
	}
}

export default {
	onShareAppMessage,
	onShareTimeline
}