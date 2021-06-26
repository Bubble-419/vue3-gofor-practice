import {request} from './request';

export function policy() {
	return request({
		url:'/aliyun/oss/policy',
		method:'get'
	})
}