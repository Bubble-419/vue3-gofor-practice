import {
	request
} from './request';

// 获取首页随机订单
export function getHomeRecommendList() {
	return request({
		url: '/orders/randomOrders',
		params: {time: new Date()},
	})
}