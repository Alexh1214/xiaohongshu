// pages/post/post.js
Page({

  /**
   * Page initial data
   */
  data: {
   post:{
     title:"",
     description:""
   },
   User:{

   },
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
const post= new wx.BaaS.TableObject('post');

console.log('detail page options',options);
post.expand(['User']).get(options.id).then((res)  =>{
  console.log("post page result",res);
  this.setData({
    post:res.data,
  })
})

}
  
})