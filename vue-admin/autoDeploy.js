const { execSync } = require('child_process');
const fs = require('fs');
const zlib = require('zlib');
const archiver = require('archiver');
const axios = require('axios');
const FormData = require('form-data');

// 打包后需要删除的文件
const rlist = [];

const compressFolder = (sourceFolder, targetZip) => {
	return new Promise((resolve, reject) => {
		// 创建写入流
		const output = fs.createWriteStream(targetZip);

		// 创建压缩器
		const archive = archiver('zip', {
			zlib: { level: zlib.constants.Z_BEST_COMPRESSION },
		});

		// 监听错误事件
		output.on('error', (err) => reject(err));
		archive.on('error', (err) => reject(err));

		// 开始压缩
		archive.pipe(output);
		archive.directory(sourceFolder, false);
		archive.finalize();

		// 监听完成事件
		output.on('close', () => resolve());
	});
};

const isFileExists = (filePath) => {
	try {
		fs.accessSync(filePath, fs.constants.F_OK);
		return true;
	} catch (err) {
		return false;
	}
};

const removeFiles = () => {
	isFileExists('./dist.zip') && fs.unlinkSync('./dist.zip');
	rlist.forEach((file) => {
		isFileExists('./dist/' + file) && fs.unlinkSync('./dist/' + file);
	});
};

const start = async () => {
	const url = process.argv[2];
	console.info('服务器地址：', url);

	console.info('开始打包');

	execSync('npm run build', { stdio: 'inherit' });

	console.info('打包完成');

	removeFiles();

	console.info('压缩中...');

	await compressFolder('./dist', './dist.zip');

	console.info('压缩完成');

	console.info('上传中...');

	const file = fs.createReadStream('./dist.zip');
	const formData = new FormData();
	formData.append('file', file);
	const result = await axios
		.post(url, formData, {
			headers: formData.getHeaders(),
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		})
		.catch((e) => console.log(e));
	if (result.data.code === 200) {
		console.info('上传完成');
	} else console.info('上传失败');
	isFileExists('./dist.zip') && fs.unlinkSync('./dist.zip');
};

start();
