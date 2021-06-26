import {
	createStore
} from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

const state = {
	// 用户信息
	user: {
		isLogin: window.localStorage.getItem('token') ? true : false,
		userId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userId : 0,
		username: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).username : "",
		roleId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).roleId : 3,
		userIcon: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userIcon : "",
	},
	// 订单类型
	orderCategory: [{
			name: "帮拿外卖",
			id: 1
		},
		{
			name: "帮取快递",
			id: 2
		},
		{
			name: "饭堂打包",
			id: 3
		},
		{
			name: "帮忙打印",
			id: 4
		},
		{
			name: "帮带物品",
			id: 5
		},
		{
			name: "其他",
			id: 6
		}
	],
	// 订单状态
	orderStatus: [{
			id: 0,
			label: "未接单"
		},
		{
			id: 1,
			label: "已接单"
		},
		{
			id: 2,
			label: "待评价"
		},
		{
			id: 3,
			label: "已评价"
		},
		{
			id: 4,
			label: "已取消"
		},
	],
	// 用户所在地
	positions: [{
			label: "大学城校区",
			value: "大学城校区",
		},
		{
			label: "龙洞校区",
			value: "龙洞校区",
		},
		{
			label: "东风路校区",
			value: "东风路校区",
		},
	]
}

//默认配置
export default createStore({
	//全局对象：用于保存所有组件的公共数据
	state,
	//同步执行
	mutations,
	//异步执行
	actions,
	getters,
})