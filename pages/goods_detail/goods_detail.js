// pages/goods_detail/goods_detail.js
import { request } from "../../request/index";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsdetail: [],
    isCollected: false
  },
  goodsobj: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    // console.log(options);
    let currentPages = getCurrentPages();
    let pages = currentPages[currentPages.length - 1];
    console.log(pages.options.goods_id);
    let goods_id = pages.options.goods_id;
    // const { goods_id } = options
    // console.log(goods_id);
    this.getgoodsdetail(goods_id)
  },
  async getgoodsdetail(goods_id) {
    console.log(goods_id);
    const res = await request({ url: "/goods/detail", data: { goods_id } })
    this.goodsobj = res.data.message;
    let collect = wx.getStorageSync('collect') || [];
    let isCollected = collect.some(v => v.goods_id === this.goodsobj.goods_id)
    this.setData({
      goodsdetail: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        pics: res.data.message.pics,
        goods_introduce: res.data.message.goods_introduce
      },
      isCollected
    })

  },
  handlePreviewPic(e) {
    const urls = this.goodsobj.pics.map(v => v.pics_mid_url);
    var current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.goodsobj.goods_id)
    if (index === -1) {
      this.goodsobj.num = 1;
      this.goodsobj.checked = true;
      cart.push(this.goodsobj);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },
  handleCollectChange() {
    let isCollected=false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.goodsobj.goods_id);
    if (index !== -1) {
      collect.splice(index, 1)
      isCollected=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.goodsobj)
      isCollected=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollected
    })
  }
})