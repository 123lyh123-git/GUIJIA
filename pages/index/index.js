//index.js
//获取应用实例
const app = getApp()
import { request } from "../../request/index";
Page({
  data: {
    swiperdata: [],
    catitems:[],
    floordata:[]
  },
  onLoad: function () {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     this.setData({
    //       swiperdata: res.data.message
    //     })
    //   }
    // })
    this.getswiperdata()
    this.getcatitems()
    this.getfloordata()
  },
  // 获取轮播图数据
  getswiperdata() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperdata: result.data.message
        })
      })
  },
  // 获取分类数据
  getcatitems() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catitems: result.data.message
        })
      })
  },
  // 获取楼层数据
  getfloordata() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floordata: result.data.message
        })
      })
  }

})
