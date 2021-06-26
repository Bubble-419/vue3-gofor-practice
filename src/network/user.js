import {
  request
} from './request';

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 注册
export function register(params, data) {
  return request({
    url: '/register',
    method: 'post',
    params,
    data
  })
}

// 退出
export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: '/info',
  })
}

// 根据id获取用户信息
export function getUserInfoById(params) {
  return request({
    url: '/admin/getUserById',
    params
  })
}

// 修改用户信息
export function updateUserInfo(data) {
  return request({
    url: '/users/userinfo',
    method: 'put',
    data
  })
}

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/captcha?time=' + new Date(),
  })
}

// 修改密码
export function updatePwd(data) {
  return request({
    url: '/users/userpwd',
    method: 'put',
    data
  })
}

// 用户进行投诉反馈
export function complain(data) {
  return request({
    url: '/complains/complain',
    method: 'post',
    data
  })
}