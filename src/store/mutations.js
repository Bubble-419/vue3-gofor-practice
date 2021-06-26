const mutations = {
	setIsLogin(state, payload) {
		state.user.isLogin = payload;
	},

	setUser(state, payload) {
		state.user = payload.user;
	},
};

export default mutations;