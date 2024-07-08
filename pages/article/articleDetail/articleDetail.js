const app = getApp()
const util = require('../../../utils/util.js')
Page({

  data: {

  },


  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      articleId:options.id
    })
    this.getDetail()
    this.getCollectStatus()

  },
  getDetail(){
    wx.cloud.database().collection('word_articles')
    .doc(this.data.articleId)
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        article:res.data
      })
    })
  },


  //获取收藏情况
  getCollectStatus(){
    wx.cloud.database().collection('word_collects')
    .where({
      _openid:app.globalData.openid,
      articleId: this.data.articleId
    })
    .get()
    .then(res=>{
      console.log(res)
      if(res.data.length > 0){
        this.setData({
          isCollected:true
        })
      }else{
        this.setData({
          isCollected:false
        })
      }
    })
  },
  cancelCollect(){
    wx.cloud.database().collection('word_collects')
    .where({
      _openid:app.globalData.openid,
      articleId: this.data.articleId
    })
    .get()
    .then(res=>{
      console.log(res)
      wx.cloud.database().collection('word_collects')
      .doc(res.data[0]._id)
      .remove()
      .then(result=>{
        wx.showToast({
          title: '取消成功',
        })
        this.getCollectStatus()
      })
    })
  },

  collect(){
    wx.cloud.database().collection('word_collects')
    .add({
      data:{
        articleId:this.data.articleId,
        cover:this.data.article.cover,
        title:this.data.article.title,
        time:util.formatTime(new Date())
      }
    })
    .then(res=>{
      console.log(res)
      wx.showToast({
        title: '收藏成功',
      })
      this.getCollectStatus()
    })
  },




  
})