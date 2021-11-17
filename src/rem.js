// rem等比适配配置文件

// 基准大小
const baseSize = 16
const baseWidth = 414

// 设置 rem 函数
function setRem() {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  console.log('htmlWidth: ', htmlWidth);
  if (htmlWidth > 414) return false
  // 当前页面宽度相对于 baseWidth宽的缩放比例，可根据自己需要修改。
  let scale = htmlWidth / baseWidth
  document.documentElement.style.fontSize = baseSize * scale + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}