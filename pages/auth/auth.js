// pages/auth/auth.js
import { request } from "../../request/index.js";
import { login } from "../../utils/setting"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {

    try {
      const { encryptedData, errMsg, iv, rawData, signature } = e.detail;
      const { code } = await wx.login();
      const params = { encryptedData, errMsg, iv, rawData, signature, code }
      const { token } = await request({ url: "/users/wxlogin", data: params, method: "post" })
      wx.setStorageSync('token', token);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})