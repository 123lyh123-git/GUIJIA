import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 1,
      name: '全部',
      isActive: true
    },
    {
      id: 2,
      name: '销量',
      isActive: false
    }, {
      id: 3,
      name: '价格',
      isActive: false
    }],
    goodslist: []
  },
  queryparams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalpages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryparams.cid = options.cid
    this.getgoodslist()
  },
  async getgoodslist() {
    const res = await request({ url: '/goods/search', data: this.queryparams });
    let total = res.data.message.total;
    this.totalpages = Math.ceil(total / this.queryparams.pagesize)
    let goodslist = res.data.message.goods;
    this.setData({ goodslist:[...this.data.goodslist,...goodslist] })
    wx.stopPullDownRefresh()
  },
  handleItemChange(e) {
    const index = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  onReachBottom() {
    if (this.queryparams.pagenum >= this.totalpages) {
      wx.showToast({
        title: '我也是有底线的~'
      })
    } else {
     this.queryparams.pagenum++;
     this.getgoodslist()
    }
  },
  onPullDownRefresh(){
    this.setData({
      goodslist:[]
    })
    this.queryparams.pagenum=1
    this.getgoodslist()
  }
})