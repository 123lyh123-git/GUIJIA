import { request } from "../../request/index";
Page({
  data: {
    goodsname: [],
    isShowBtn:false,
    inputvalue:""
  },
  timeid: -1,
  handleInput(e) {
    const { value } = e.detail;
    if (!value.trim()) {
      this.setData({
        goodsname: [],
        isShowBtn:false
      })
      clearTimeout(this.timeid)
      return
    }
    this.setData({
      isShowBtn:true
    })
    clearTimeout(this.timeid)
    this.timeid = setTimeout(() => { this.qsearch(value) }, 1000)

  },
  async qsearch(query) {
    const res = await request({ url: '/goods/qsearch', data: { query } })
    this.setData({
      goodsname: res.data.message
    })
  },
  handleCancel(){
    this.setData({
      goodsname: [],
      isShowBtn:false,
      inputvalue:""
    })
  }
})