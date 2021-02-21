// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 1,
      name: '商品收藏',
      isActive: true
    },
    {
      id: 2,
      name: '品牌收藏',
      isActive: false
    }, {
      id: 3,
      name: '店铺收藏',
      isActive: false
    }, {
      id: 4,
      name: '浏览足迹',
      isActive: false
    }],
    collect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    let collect = wx.getStorageSync('collect') || [];
    this.setData({
      collect
    })
  },
  handleItemChange(e) {
    const index = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  }

})