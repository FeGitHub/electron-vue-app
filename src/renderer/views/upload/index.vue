<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="action"
      :show-file-list="false"
      :data="uploadData"
      :on-exceed="handleExceed"
      :headers="headers"
    >
      <el-button type="primary">点击上传</el-button>
    </el-upload>

    <el-button
      type="primary"
      v-on:click="exportExcelData()"
      style="margin-top:30px;"
      >数据导w出</el-button
    >
  </div>
</template>
<script>
import { downloadUtils } from '@/utils'
import store from '@/store'
export default {
  data() {
    return {
      headers: {
        token: store.getters.token
      },
      action: process.env.VUE_APP_API_BASE_URL + '/api/comparative-import/upload',
      fileList: [
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        // { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      uploadData: {
        compareType: '233',
        compareDivision: '233',
        compareSampleTimeStart: '2022-02-02 12:12:12',
        compareSampleTimeEnd: '2022-02-02 12:12:12'
      }
    }
  },
  methods: {
    exportExcelData() {
      var url = '/api/download/downloadExcel'
      var filename = '测试.xlsx'
      downloadUtils.download(url, filename)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {

    },
    beforeRemove(file, fileList) {

    }
  }
}
</script>