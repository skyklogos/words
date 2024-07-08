const app = getApp()
Page({

  data: {

  },

  onLoad: function (options) {
    console.log(app.globalData.openid)
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/book/bookSearch/bookSearch',
    })
  },
  toNewBook(){
    wx.navigateTo({
      url: '/pages/book/newBook/newBook',
    })
  },
  onShow(){
    if(!app.globalData.userInfo){
      wx.switchTab({
        url: '/pages/me/me',
        success(){
          wx.showToast({
            title: '请登录',
            icon:'none'
          })
        }
      })
      return
    }

console.log(app.globalData.openid)
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
  }
 
})