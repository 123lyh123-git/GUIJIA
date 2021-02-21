// pages/category/category.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories_menu: [],
    categories_items: [],
    currentIndex: 0,
    scrolltop: 0
  },
  categories: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cartegory = wx.getStorageSync('cartegory')
    if (!cartegory) {
      this.getcategories()
    } else {
      if (Date.now() - cartegory.time > 1000 * 500) {
        this.getcategories()
      } else {
        this.categories = cartegory.data;
        let categories_menu = this.categories.map(v => v.cat_name);
        let categories_items = this.categories[0].children;
        this.setData({
          categories_menu,
          categories_items
        })
      }
    }

  },
  async getcategories() {
    // request({ url: '/categories' })
    //   .then(res => {
    //     // console.log(res)
    //     this.categories = res.data.message;
    //     wx.setStorageSync('cartegory', { time: Date.now(), data: this.categories });
    //     let categories_menu = this.categories.map(v => v.cat_name);
    //     let categories_items = this.categories[0].children;
    //     this.setData({
    //       categories_menu,
    //       categories_items
    //     })
    //   })
    const res = await request({ url: '/categories' });
    this.categories = res.data.message;
    wx.setStorageSync('cartegory', { time: Date.now(), data: this.categories });
    let categories_menu = this.categories.map(v => v.cat_name);
    let categories_items = this.categories[0].children;
    this.setData({
      categories_menu,
      categories_items
    })
  },
  handleItemTap(e) {
    // console.log(e)
    const { index } = e.currentTarget.dataset
    let categories_items = this.categories[index].children;
    this.setData({
      currentIndex: index,
      categories_items,
      scrolltop: 0
    })
  }
})