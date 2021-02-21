// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 1,
      name: '体验中心',
      isActive: true
    },
    {
      id: 2,
      name: '商品、商家投诉',
      isActive: false
    }],
    chooseImgs: [],
    textVal: ""
  },
  uploadimgs: [],
  handleItemChange(e) {
    const index = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  handleTipsImg(e) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },
  handleRemoveImg(e) {
    let { index } = e.currentTarget.dataset
    let { chooseImgs } = this.data;
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  handleText(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  handleSubmit() {
    const { textVal, chooseImgs } = this.data;
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    if (chooseImgs.length != 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.uploadimgs.push(url)
            if (i === this.chooseImgs - 1) {
              wx.hideLoading();
              console.log('把文字和图片上传,此处省略')
              console.log('---成功之后----')
              this.setData({
                textVal: "",
                chooseImgs: []
              })
              console.log('---返回上一个页面----')
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      })
    } else {
      wx.hideLoading();
      console.log('---只是提交普通按钮----')
      wx.navigateBack({
        delta: 1
      });
    }

  }
})