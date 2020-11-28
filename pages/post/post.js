// pages/post/post.js
Page({

  /**
   * Page initial data
   */
  data: {
    post: {
      title: "",
      description: "",
    }
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
   
    const postPage = new wx.BaaS.TableObject("post");
    console.log("postPage", options)

    postPage.get(options.id).then((res) => {
      console.log("post page result", res);
      // this.setData({
      //   post: res.data,
      // });
    })
    // let query = new wx.BaaS.Query();

    // query.compare("id", "=", options.id);

    // // grab the information from movie_reviews table
    // posPage.setQuery(query)
    //   .find()
    //   .then((res) => {
    //     console.log("result from restaurant reviews query find", res);
    //     this.setData({
    //       post: res.data.objects,
    //     });
    //   });

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})