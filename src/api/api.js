import axios from './index'

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


  // getCrowdInfo: (params) => axios.get('/getCrowdInfo', { params }),
}
