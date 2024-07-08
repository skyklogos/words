const app = getApp()
Page({

  data: {

  },

  onLoad(options) {

  },

  
  onShow() {
    wx.cloud.database().collection('word_books')
    .where({
      _openid:app.globalData.openid
    })
    .orderBy('time','desc')
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        bookList:res.data
      })
    })
  },

  
})