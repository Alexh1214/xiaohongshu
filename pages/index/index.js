//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    post: [],
  },
 
  onLoad: function () {
    const Post = new wx.BaaS.TableObject("post");
    Post.find().then((res) => {
      console.log("results from ifanr", res);
      this.setData({
        post: res.data.object
      });  
    }, (err) => {
      console.log("This is error", err);
    }); 
  },
})