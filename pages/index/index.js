//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    post: [],
  },
 
  onLoad: function () {
    const Post = new wx.BaaS.TableObject("post");
    Post.expand(['User']).find().then((res) => {
      console.log("results from ifanr", res);
      this.setData({
        post: res.data.objects
      });  
    }, (err) => {
      console.log("This is error", err);
    });
  },

  toPost: function(e) {
    wx.navigateTo({
      url: `/pages/post/post?id=${e.currentTarget.id}`,
    });
  }
})
