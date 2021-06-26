import {
  request
} from './request';

// 搜索订单
export function searchByKeywords(params) {
  return request({
    url: `/orders/search`,
    params
  })
}