import axios from "axios";

// axios.defaults.baseURL = '/api'; //http://gaz.yiqilian.vip/api/
// axios.defaults.baseURL = 'https://gaz.yiqilian.vip/api/'; //
// axios.defaults.baseURL = 'https://gazotc.com:8083/'; 
// 请求响应拦截
axios.interceptors.request.use(
    (config) => {
        // let token = window.localStorage.getItem("token");
        // if (token) {
        //   config.headers["authorization"] = "bearer " + token;
        // }
		       // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		
        return config;
    },
    (err) => {
        console.log(err);
    }
);


axios.interceptors.response.use(
    (res) => {
        return res.data
    },
    (err) => {
		console.log(11111);
        console.dir(err);
        if (err) alert('服务器错误，请稍后再试')
        // Promise.reject(err);
    }
);

export default axios;