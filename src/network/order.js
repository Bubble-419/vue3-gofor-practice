import {
  request
} from './request';

// 获取订单详情
export function getDetail(params) {
  return request({
    url: '/orders/detail',
    params
  })
}

// 创建订单
export function publishOrder(data) {
  return request({
    url: '/orders/publish',
    method: 'post',
    data
  })
}

// 获取用户发布的定单
export function publishedOrders(params) {
  return request({
    url: '/orders/publishOrders',
    params
  })
}
// 获取用户接受的定单
export function receivedOrders(params) {
  return request({
    url: '/orders/receiveOrders',
    params
  })
}

// 修改订单信息
export function updateOrder(data) {
  return request({
    url: '/orders/update',
    method: 'put',
    data
  })
}

// 取消订单
export function cancelOrder(data) {
  return request({
    url: '/orders/cancel',
    method: 'put',
    data
  })
}

// 接受订单
export function receiveOrder(params,data) {
  return request({
    url: '/orders/receive',
    method: 'put',
    params,
    data
  })
}

// 完成订单
export function finishOrder(data) {
  return request({
    url: '/orders/finish',
    method: 'put',
    data
  })
}

// 评价订单
export function commentOrder(data) {
  return request({
    url: '/orders-comment/comment',
    method: 'post',
    data
  })
}

// 回复评价
export function commentRepalyOrder(data) {
  return request({
    url: '/orders-comment-replay/replay',
    method: 'post',
    data
  })
}

// 获取评价
export function getComment(params) {
  return request({
    url: '/orders-comment/getComment',
    params
  })
}

//获取回复
export function getRepay(params) {
  return request({
    url: '/orders-comment-replay/getReplay',
    params
  })
}
// 历史浏览
export function getHistory(params) {
  return request({
    url: '/orders/history',
    params
  })
}