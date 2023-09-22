import { dayjs } from 'element-plus';

export const formatTime = (time: string | undefined | null) => {
	if (time) {
		return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
	} else return '';
};

export const formatDate = (date: string | undefined | null) => {
	if (date) {
		return dayjs(date).format('YYYY-MM-DD');
	} else return '';
};
