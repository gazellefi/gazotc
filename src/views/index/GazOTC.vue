<template>
<div class="pdf">
  <!-- <div class="pdf-tab"> -->
  <!--  <div 
      :class="['btn-def',{'btn-active':activeIndex==index}]"
      v-for="(item,index) in pdfList"
      @click.stop="pdfClick(item.pdfUrl,index)">{{item.title}}</div>
  </div> -->
  <pdf 
    v-for="i in numPages"
    :key="i"
    :src="pdfUrl"
    :page="i">
  </pdf>
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components:{
      pdf
  },
  data(){
      return {
      pdfList:[
        {  
		  // https://gazotc.com/GazOTC.pdf
          zh_pdfUrl:"https://gazotc.com/GazOTC.pdf",
		  en_pdurl: ''
        },
      ],
      pdfUrl: '',
      numPages:1,
      }
  },
  mounted: function() {
	  let lang = localStorage.getItem('lang')
	  if(lang == 'zh'){
		  this.pdfTask(this.pdfList[0].zh_pdfUrl)
	  }else{
		  // 暂无
		  this.numPages = 0
	  }
    
  },
  methods: {
      pdfTask(pdfUrl){
        var self = this
        var loadingTask = pdf.createLoadingTask(pdfUrl)  
        loadingTask.promise.then(pdf => {
          self.pdfUrl = loadingTask
          self.numPages = pdf.numPages
        }).catch((err) => {
          console.error('pdf加载失败')
      })
      },
  }
}
</script>