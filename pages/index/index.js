//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
 
  onLoad: function () {
    
  },
  submitInfo(e) {
    this.setData({
        formId: e.detail.formId,
      },
      (res) => {})
  },
})
