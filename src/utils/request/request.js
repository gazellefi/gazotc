import axios from 'axios';
import qs from 'qs';
 
const service = axios.create({
  timeout: 10000
});
 
service.interceptors.request.use(
  config => {
    // 设置请求头
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    config.transformRequest = [function (data) {
      // 在请求之前对data传参进行格式转换
      data = qs.stringify(data)
      return data
    }]
    return config;
  },
  error => {
  	console.log(error)
    return Promise.reject();
  }
);
 
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
  },
  error => {
   	console.log(error)
    return Promise.reject();
  }
);
 
export default service;