// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting } from '../../utils/setting.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressdata: [],
    cartdata: [],
    allchecked: false,
    totalmoney: 0,
    totalnum: 0
  },
  onShow() {
    const addressdata = wx.getStorageSync('address');
    const cartdata = wx.getStorageSync('cart') || [];
    this.setData({ addressdata })
    this.cartCompute(cartdata)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleGetAddress() {
    // wx.getSetting({
    //   success: (result) => {
    //     console.log(result)
    //     let scope = result.authSetting["scope.address"];
    //     if (scope === true || scope === undefined) {
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1)
    //         }
    //       });
    //     } else {
    //       wx.openSetting({
    //         success: (result2) => {
    //           wx.chooseAddress({
    //             success: (result3) => {
    //               console.log(result3)
    //             }
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
    try {
      const result = await getSetting()
      let scope = result.authSetting["scope.address"];
      if (scope === false) {
        const res1 = await openSetting()
        console.log(res1)
      }
      const address = await chooseAddress()
      console.log(address)
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }


  },
  handleItemChange(e) {
    const goodsid = e.currentTarget.dataset.id;
    let { cartdata } = this.data;
    console.log(cartdata)
    let index = cartdata.findIndex(v => v.goods_id === goodsid)
    cartdata[index].checked = !cartdata[index].checked;
    this.cartCompute(cartdata)
    // wx.setStorageSync('cart', cartdata);
    // const allchecked = cartdata.length ? cartdata.every(v => v.checked) : false;
    // let totalmoney = 0;
    // let totalnum = 0;
    // cartdata.forEach(v => {
    //   if (v.checked) {
    //     totalmoney += v.num * v.goods_price;
    //     totalnum += v.num;
    //   }
    // })
    // this.setData({
    //   cartdata,
    //   allchecked,
    //   totalmoney,
    //   totalnum
    // })
  },
  cartCompute(cartdata) {
    const allchecked = cartdata.length ? cartdata.every(v => v.checked) : false;
    let totalmoney = 0;
    let totalnum = 0;
    cartdata.forEach(v => {
      if (v.checked) {
        totalmoney += v.num * v.goods_price;
        totalnum += v.num;
      }
    })
    this.setData({
      cartdata,
      allchecked,
      totalmoney,
      totalnum
    })
    wx.setStorageSync('cart', cartdata);
  },
  hanleAllCheck() {
    let { cartdata, allchecked } = this.data;
    allchecked = !allchecked;
    cartdata.forEach(v => v.checked = allchecked)
    this.cartCompute(cartdata)
  },
  handleOperate(e) {
    const { id, opt } = e.currentTarget.dataset;
    let { cartdata } = this.data;
    const index = cartdata.findIndex(v => v.goods_id === id)
    if(cartdata[index].num===1&&opt===-1){
      wx.showModal({
        title: '提示',
        content: '您是否要删除？',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            cartdata.splice(index,1)
            this.cartCompute(cartdata)
          }else{
            cartdata[index].num -= opt;
            this.cartCompute(cartdata)
          }
        }
      });
    }
    cartdata[index].num += opt;
    this.cartCompute(cartdata)
  
  },
  handlePay(){
    const {addressdata,totalnum}=this.data;
    if(!addressdata.userName){
     wx.showToast({
       title: '😙还没有选择地址哦！',
       icon: 'none',
       mask: true
     });
     return;
    }
    if(totalnum===0){
      wx.showToast({
        title: '😙还没有选择商品哦~',
        icon: 'none',
        mask: true
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }

})