// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting, requestPayment } from '../../utils/setting.js'
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressdata: [],
    cartdata: [],
    totalmoney: 0,
    totalnum: 0
  },
  onShow() {
    const addressdata = wx.getStorageSync('address');
    let cartdata = wx.getStorageSync('cart') || [];
    cartdata = cartdata.filter(v => v.checked)
    this.setData({ addressdata })
    let totalmoney = 0;
    let totalnum = 0;
    cartdata.forEach(v => {
      totalmoney += v.num * v.goods_price;
      totalnum += v.num;
    })
    this.setData({
      cartdata,
      totalmoney,
      totalnum,
      addressdata
    })
  },
  async handleOrderPay() {
    try {
      const token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      } else {
        const header = { Authorization: token }
        const order_price = this.data.totalmoney;
        const consignee_addr = this.data.addressdata.all;
        const goods = [];
        const cartdata = this.data.cartdata;
        cartdata.forEach(v => goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        }))
        const params = { order_price, consignee_addr, goods }
        const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: params, header })
        const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
        await requestPayment(pay);
        const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
        wx.showToast({
          title: '支付成功',
          mask: false
        });
        let newCart=wx.getStorageSync("cart");
        newCart=newCart.filter(v=>!v.checked);
        wx.setStorageSync("cart", newCart);
        wx.navigateTo({
          url: '/pages/order/order'
        });
      }
    } catch (error) {
      console.log(error);
      wx.showToast({
        title: '支付失败',
        mask: false
      });
    }

  }

})