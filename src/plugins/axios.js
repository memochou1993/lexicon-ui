import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common.Authorization = process.env.VUE_APP_API_DEMO_TOKEN;

export default axios;
