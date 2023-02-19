import moment from "moment";

const momentPlugin = {
	install(Vue) {
		Vue.prototype.$moment = moment;
	},
};

export default momentPlugin;
