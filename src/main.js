import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import withUUID from "vue-uuid";
import moment from "moment";
import Notifications from '@kyvg/vue3-notification'
import OneSignal from 'onesignal'

OneSignal.init({
	appId: '2d36f7bf-0670-46e7-8f58-a738237a3b3e',
	notifyButton: {
		enable: true,
	},
})

const app = createApp(App)
app.use(store)
app.use(withUUID)
app.use(moment)
app.use(router)
app.use(Notifications)
app.mount("#app")

