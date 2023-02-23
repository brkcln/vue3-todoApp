import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import withUUID from "vue-uuid";
import moment from "moment";
import Notifications from '@kyvg/vue3-notification'


window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
	OneSignal.init({
		appId: "2d36f7bf-0670-46e7-8f58-a738237a3b3e",
	});
});

OneSignal.registerForPushNotifications({
	modalPrompt: true,
})


const headers = {
	'Authorization': 'Basic 2d36f7bf-0670-46e7-8f58-a738237a3b3e',
	'Content-Type': 'application/json',
}

const data = {
	app_id: '2d36f7bf-0670-46e7-8f58-a738237a3b3e',
	contents: { en: 'Hello, world!' },
	included_segments: ['Subscribed Users'],
}

axios.post('https://onesignal.com/api/v1/notifications', data, { headers })

const app = createApp(App)
app.use(store)
app.use(withUUID)
app.use(moment)
app.use(router)
app.use(Notifications)
app.mount("#app")

