import axios from 'axios';
import {
	ElMessage
} from 'element-plus';
import router from '@/router';

export function request(config) {
	// axios实例，接受config参数
	const instance = axios.create({
		// 部署url
		// baseURL: 'http://39.108.133.73:8080',
		// 本机url
		baseURL:'http://localhost:8080',
		timeout: 6000,
	});

	// 请求拦截
	instance.interceptors.request.use(config => {
		// 判断登陆权限
		const token = window.localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = 'Bearer ' + token;
		}
		return config;
	}, err => {
		console.log(err);
	});

	// 响应拦截
	instance.interceptors.response.use(res => {
		// 成功调用接口，但后端返回了一些错误提示
		if (res.status && res.status == 200) {
		// 业务逻辑错误
			if (res.data.code == 500 || res.data.code == 401 || res.data.code == 403) {
				ElMessage.error({
					message: res.data.message
				});
				return Promise.reject(res);
			}
			// 成功提示
			else if (res.data.message) {
				ElMessage.success({
					message: res.data.message
				});
			}
			// 要记得返回response的数据（此处只返回了res.data)
			return res.data;
		}
	}, err => {
		// 没有调用到接口
		// 401权限错误，转到登录页
		if (err.response.code == 504 || err.response.code == 404) {
			ElMessage.error({
				message: '找不到服务器！'
			})
		} else if (err.response.code == 403) {
			ElMessage.error({
				message: '权限不足！'
			})
		} else if (err.response.code == '401') {
			ElMessage.warning({
				message: '请先登录',
			})
			router.push({
				name: 'LoginPage'
			});
		}
	});

	return instance(config);
}