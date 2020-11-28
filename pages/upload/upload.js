// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photo:"",
    currentUser: null,
    inputVal: "",
    inputDesc:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
  },
  getPhoto: function (e) {
    console.log("take a photo");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: (res) => {
        console.log('getPhoto success', res);

        const File = new wx.BaaS.File()
        const fileParams = {filePath: res.tempFilePaths[0]};
        const metadata = {categoryName: "photo"}

        File.upload(fileParams, metadata).then((res)=>{
          console.log('upload image res', res);
          this.setData ({"photo": res.data.path})
          // const Post = new wx.BaaS.TableObject('post');

          // // const photo = Photo.getWithoutData(this.data.photo.id);
        

          // // photo.set({
          // //   image: res.data.path,
          // // })

          // Post.update().then((res) => {
          //   console.log('photos save res', res);
          //   this.setData({
          //     photos:res.data,
          //   })
      //   }, err => {
      //     console.log('photo update err', err)
      //   })
      }, err => {
        console.log('upload err', err);
      })
    },

    fail: (err) => {
        console.log('getPhoto err', err);
      },
      complete: ()=>{}
    }); 
  },
  previewImage: function () {
    wx.previewImage({
      current: this.data.image,
      urls: [this.data.image]
    })
  },

  //input steps
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },

  descChange: function (e) {
    this.setData({
      inputDesc: e.detail.value,
    });
  },

  formReset: function (event) {
    console.log(event)
    const val = this.data.inputVal;
    const desc = this.data.inputDesc;
    if (val.trim() === "") return;

    const Posts = new wx.BaaS.TableObject("post");

    // step 1: create a blank record
    const newPost = Posts.create();

    // step 2: set the information in the record
  console.log (wx.getStorageSync("user"))
  const user = wx.getStorageSync("user")

    newPost.set({
      photo: [this.data.photo],
      title: val,
      description: desc,
      User: user.id
    });
    newPost.save()
  },
})