// pages/order/order.js
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
      name: '待付款',
      isActive: false
    }, {
      id: 3,
      name: '待发货',
      isActive: false
    }, {
      id: 4,
      name: '退款/退货',
      isActive: false
    }],
    orders: []
  },
  orders: [
    {
      "order_id": 428,
      "user_id": 23,
      "order_number": "HMDD20190802000000000428",
      "order_price": 13999,
      "order_pay": "0",
      "is_send": "否",
      "trade_no": "",
      "order_fapiao_title": "个人",
      "order_fapiao_company": "",
      "order_fapiao_content": "",
      "consignee_addr": "广东省广州市海珠区新港中路397号",
      "pay_status": "1",
      "create_time": 1564731518,
      "update_time": 1564731518,
      "order_detail": null,
      "goods": [
        {
          "id": 717,
          "order_id": 428,
          "goods_id": 43986,
          "goods_price": 13999,
          "goods_number": 1,
          "goods_total_price": 13999,
          "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
          "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
        }
      ],
      "total_count": 1,
      "total_price": 13999
    },
    {
      "order_id": 428,
      "user_id": 23,
      "order_number": "HMDD20190802000000000418",
      "order_price": 13999,
      "order_pay": "0",
      "is_send": "否",
      "trade_no": "",
      "order_fapiao_title": "个人",
      "order_fapiao_company": "",
      "order_fapiao_content": "",
      "consignee_addr": "广东省广州市海珠区新港中路397号",
      "pay_status": "1",
      "create_time": 1564731518,
      "update_time": 1564731518,
      "order_detail": null,
      "goods": [
        {
          "id": 717,
          "order_id": 428,
          "goods_id": 43986,
          "goods_price": 13999,
          "goods_number": 1,
          "goods_total_price": 13999,
          "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
          "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
        }
      ],
      "total_count": 1,
      "total_price": 13999
    },
    {
      "order_id": 428,
      "user_id": 23,
      "order_number": "HMDD20190802000000000438",
      "order_price": 13999,
      "order_pay": "0",
      "is_send": "否",
      "trade_no": "",
      "order_fapiao_title": "个人",
      "order_fapiao_company": "",
      "order_fapiao_content": "",
      "consignee_addr": "广东省广州市海珠区新港中路397号",
      "pay_status": "1",
      "create_time": 1564731518,
      "update_time": 1564731518,
      "order_detail": null,
      "goods": [
        {
          "id": 717,
          "order_id": 428,
          "goods_id": 43986,
          "goods_price": 13999,
          "goods_number": 1,
          "goods_total_price": 13999,
          "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
          "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
        }
      ],
      "total_count": 1,
      "total_price": 13999
    }
  ],
  onShow(options) {
    let currentPages = getCurrentPages();
    let pages = currentPages[currentPages.length - 1];
    const { type } = pages.options;
    console.log(type)
    this.changeTextByIndex(type-1)
    this.setData({
      orders: this.orders.map(v=>({...v,newTime:(new Date(v.create_time*1000).toLocaleString())}))
    })

  },
  changeTextByIndex(index) {
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  handleItemChange(e) {
    const index = e.detail;
    this.changeTextByIndex(index)
  }
})