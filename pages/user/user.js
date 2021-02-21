// pages/user/user.js
Page({
  data: {
    userinfo: {},
    collectnum: 0
  },
  onShow() {
    const userinfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    this.setData({ 
      userinfo,
      collectnum:collect.length
     })
  }
})