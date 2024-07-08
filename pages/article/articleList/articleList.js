// pages/article/articleList/articleList.js
Page({


  data: {

  },


  onLoad: function (options) {
    console.log(options.id)

    wx.cloud.database().collection('word_articles')
    .where({
      type:options.id
    })
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        articleList:res.data
      })
    })
  },

  
})