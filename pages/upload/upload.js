// pages/upload/upload.js
Page({

  /**
   * Page initial data
   */
  data: {
    photos:[],
    currentUser: null,
    inputVal: "",
    inputVal2:"",
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
        const metadata = {categoryName: "photos"}

        File.upload(fileParams, metadata).then((res)=>{
          console.log('upload image res', res);
          const Photo = new wx.BaaS.TableObject('post');

          const photo = Photo.getWithoutData(this.data.photos.id);
        

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

  //input steps
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },

  formReset: function () {
    const val = this.data.inputVal;
    if (val.trim() === "") return;

    const Posts = new wx.BaaS.TableObject("post");

    // step 1: create a blank record
    const newPost = post.create();

    // step 2: set the information in the record
    newPost.set({
      title: val,
      title: this.data.restaurants.id,
    });

    // send the record to ifanr to save in the database
    newReview.save().then(
      (res) => {
        console.log("newReview save", res);
        const newItems = this.data.items;
        newItems.push(res.data);
        this.setData({
          items: newItems,
        });
      },
      (error) => {
        console.log("newReview save error, error");
      }
    );

    this.setData({
      inputVal: "",
    });

  },
})