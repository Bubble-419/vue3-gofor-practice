const getters = {
	getOrderCategory: (state) => (cateId) => {
		if (cateId) {
			return state.orderCategory.find(cate => cate.id == cateId).name;
		}
	},
	getOrderStatus: (state) => (statusId) => {
		return state.orderStatus.find(s => s.id == statusId).label;
	}
};

export default getters;