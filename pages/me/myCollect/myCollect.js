const app = getApp()
Page({


  data: {

  },

  onLoad: function (options) {
    console.log(app.globalData.openid)

    this.getCollectList()
  },
  getCollectList(){
    wx.cloud.database().collection('word_collects')
    .where({
      _openid:app.globalData.openid
    })
    .get()
    .then(res=>{

      console.log(res)

      this.setData({
        bookList: res.data
      })
    })
  },

  toTiDetail(event){
    
    console.log(event.currentTarget.dataset.id)
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/home/search/detail/detail?id=' + id ,
    })
  },

  toGoodDetail(event){
    console.log(event.currentTarget.dataset.index)
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/article/articleDetail/articleDetail?id=' + this.data.bookList[index].articleId,
    })

  },
  delete(event){
    console.log(event.currentTarget.dataset.index)
    let index = event.currentTarget.dataset.index
    wx.cloud.database().collection('word_collects')
    .doc(this.data.bookList[index]._id)
    .remove()
    .then(res=>{

      console.log(res)

      wx.showToast({
        title: '删除成功',
      })
      this.getCollectList()
      
    })

  }
})