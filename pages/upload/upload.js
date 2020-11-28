// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photos:[],
    currentUser: null,
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
        const metadata = {categoryName: "cars"}

        File.upload(fileParams, metadata).then((res)=>{
          console.log('upload image res', res);
          const Photo = new wx.BaaS.TableObject('post');

          const photo = Photo.getWithoutData(this.data.post.id);

          photo.set({
            image: res.data.path,
          })

          photo.update().then((res) => {
            console.log('photos save res', res);
            this.setData({
              photos:res.data,
            })
        }, err => {
          console.log('photos update err', err)
        })
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
})