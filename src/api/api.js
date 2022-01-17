import axios from './index'
var url = 'https://gazotc.com:8083'
export default {
  // 获取USDT认领额度
  getCrowdInfo: (params) => axios.post('/common/getCrowdInfo', params),
  // 获取推荐码信息
  // getCode: (id, params) => axios.put('/code/get' + id, params),
  getCode: (params) => axios.post('/code/get', params),

  // 推荐信息添加

  // 获取认购信息
  getSub: (params) => axios.post('/code/get', params),
  // 打币记录添加

  addTrans: (params) => axios.post('/trans/add', params),

  // 认购信息添加
  addSub: (params) => axios.post('/sub/add', params),
  //获取联合查询信息
  getData: (params) => axios.post('/common/getData', params),
  
  // 判断释放实名认证
  RealName: (params) => axios.post(url + '/member/jnmioURL?'+params),
  //  实名认证成功后
  RealNameAfter: (params) => axios.post(url + '/member/result', params),
  // 注册 
  register: (params) => axios.post(url + '/member/register', params),

  // 身份证正面
  // faceAdd:(params)=> axios.post(url + '/face/faceAdd', params),
  // getCrowdInfo: (params) => axios.get('/getCrowdInfo', { params }),
}
