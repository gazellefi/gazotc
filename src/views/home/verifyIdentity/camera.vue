<template>
    <div class="camera_outer">
         <video id="videoCamera" width="100%" autoplay></video>
			<canvas style="display:none;" id="canvasCamera" width="100%"></canvas>
        <!-- <div v-if="imgSrc" class="img_bg_camera">
          <p>效果预览</p>
          <img :src="imgSrc" alt class="tx_img" />
        </div> -->
        <div class="button" style="display: flex;justify-content: center;background-color: #fff;padding: 5px 0;">
      <!-- <el-button @click="getCompetence()">打开摄像头</el-button> -->
      <!-- <el-button @click="stopNavigator()">关闭摄像头</el-button> -->
			<div class="borderBox" style="background-color: #000;width: 50px;height: 50px;border-radius: 50%;display: flex;justify-content: center;align-items: center;border: none;">
				<el-button @click="setImage()" style="background-color: #FF3333;width: 40px;height: 40px;border-radius: 50%;border: none;"></el-button>
			</div>
        </div>
      </div>
</template>
 
<script>
    export default {
      data() {
        return {
          imgSrc: "",
          thisCancas: null,
          thisContext: null,
          thisVideo: null,
          openVideo:false
        };
      },
      mounted(){
        this.getCompetence()//进入页面就调用摄像头
      },
      methods: {
        // 调用权限（打开摄像头功能）
        getCompetence() {
          var _this = this;
          _this.thisCancas = document.getElementById("canvasCamera");
          _this.thisContext = this.thisCancas.getContext("2d");
          _this.thisVideo = document.getElementById("videoCamera");
          _this.thisVideo.style.display = 'block';
		  // 启动摄像头初始化
		  this.trackerTask = window.tracking.track('#videoCamera-face', tracker, {
			  camera: true
		  });
		  tracker.on('track', function(event) {
			  context.clearRect(0, 0, canvas.width, canvas.height);
			  event.data.forEach(function(rect) {
				  context.strokeStyle = '#ff0000';
				  context.strokeRect(rect.x, rect.y, rect.width, rect.height);
			  });
			  if (event.data.length) {
				  // 会不停的去检测人脸，所以这里需要做个锁
				  if (flag) {
					  // 裁剪出人脸并绘制下来
					  const canvasUpload = document.getElementById('canvas-face-upload')
					  const contextUpload = canvasUpload.getContext('2d')
					  contextUpload.drawImage(video, 0, 0, 105, 105)
					  flag = false
					  // 人脸的basa64
					  const dataURL = canvasUpload.toDataURL('image/jpeg');
					  // ajax请求
					  _this.$store.dispatch('LoginByFaceID', {
						  face_img: dataURL.slice(23) // 我们后台需要的basa64不要前缀
					  }).then(res => {
						  let type = 'success'
						  // 登录成功跳转到首页
						  if (res.data.code === 200) {
							  _this.$router.push({
								  path: '/'
							  });
						  }
						  // 登录失败重新进行人脸检测
						  else {
							  type = 'error'
							  setTimeout(() => {
								  flag = true
							  }, 1500)
						  }
						  _this.$message({
							  message: res.data.message,
							  type,
							  center: true
						  });
					  }).catch(error => {
						  console.log(error)
					  })
				  }
			  }
		  });
          // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
          if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
          }
          // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
          // 使用getUserMedia，因为它会覆盖现有的属性。
          // 这里，如果缺少getUserMedia属性，就添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function(constraints) {
              // 首先获取现存的getUserMedia(如果存在)
              var getUserMedia =
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.getUserMedia;
              // 有些浏览器不支持，会返回错误信息
              // 保持接口一致
              if (!getUserMedia) {//不存在则报错
                return Promise.reject(
                  new Error("getUserMedia is not implemented in this browser")
                );
              }
              // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
              });
            };
          }
          var constraints = {
            audio: false,
            video: {
              width: this.videoWidth,
              height: this.videoHeight,
              transform: "scaleX(-1)"
            }
          };
          navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(stream) {
              // 旧的浏览器可能没有srcObject
              if ("srcObject" in _this.thisVideo) {
                _this.thisVideo.srcObject = stream;
              } else {
                // 避免在新的浏览器中使用它，因为它正在被弃用。
                _this.thisVideo.src = window.URL.createObjectURL(stream);
              }
              _this.thisVideo.onloadedmetadata = function(e) {
                _this.thisVideo.play();
              };
            })
            .catch(err => {
              console.log(err);
            });
        },
        //  绘制图片（拍照功能）
        setImage() {
          var _this = this;
          // canvas画图
          _this.thisContext.drawImage(
            _this.thisVideo,
            0,
            0,
            _this.videoWidth,
            _this.videoHeight
          );
          // 获取图片base64链接
          var image = this.thisCancas.toDataURL("image/png");
          _this.imgSrc = image;//赋值并预览图片
        },
        // 关闭摄像头
        stopNavigator() {
          this.thisVideo.srcObject.getTracks()[0].stop();
        },
        // base64转文件，此处没用到
        dataURLtoFile(dataurl, filename) {
          var arr = dataurl.split(",");
          var mime = arr[0].match(/:(.*?);/)[1];
          var bstr = atob(arr[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], filename, { type: mime });
        },
		callCamera () {
			// H5调用电脑摄像头API
			navigator.mediaDevices.getUserMedia({
				video: true
			}).then(success => {
				// 摄像头开启成功
				this.$refs['video'].srcObject = success
				// 实时拍照效果
				this.$refs['video'].play()
			}).catch(error => {
				console.error('摄像头开启失败，请检查摄像头是否可用！')
			})
		},
      }
    };
</script>
 
<style lang="less" scoped>
    .testTracking {
        height: 100vh;
        width: 100%;
        position: relative;
        > * {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
        }
        video,
        canvas {
            top: 0;
        }
        .buttonDiv {
            bottom: 10px;
        }
    }
	.camera_outer{
		height: 100%;
		
	}
</style>