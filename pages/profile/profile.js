// pages/profile/profile.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
    data: {
      post: [],
    },
  },
  userInfoHandler: function(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        // do something with the 'user' object
          this.setData({
            currentUser: user,
          });
          console.log('user',user);
          wx.setStorage({
            key:"user",
            data: user
          })
          const Post = new wx.BaaS.TableObject("post");
          let query = new wx.BaaS.Query();

    query.compare("User","=", this.data.currentUser.id);
    Post.expand(['User']).setQuery(query)
    .find()
    .then((res) => {
      console.log("res found", res);
      this.setData({
        post: res.data.objects,
      })
    })

      }, err => {
        // might need to log the error message
        console.log("it's an error", err);
    })
    
  },
  

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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