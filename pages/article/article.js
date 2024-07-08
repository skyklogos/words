
Page({

  data: {

  },

  onLoad: function (options) {

  },
  onShow(){
    wx.cloud.database().collection('word_article_types')
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        typeList:res.data
      })
    })
  },
  subscribe(event){  
    wx.cloud.database().collection('word_subscribes')
    .add({
      data:{
        ...this.data.typeList[event.currentTarget.dataset.index]
      }
    })
    .then(res=>{
      wx.showToast({
        title: '订阅成功',
      })
     
    })
    .catch(res=>{
      console.log(res)
      wx.cloud.database().collection('word_subscribes').doc(this.data.typeList[event.currentTarget.dataset.index]._id).remove()
      .then(res=>{
        console.log(res)
        wx.showToast({
          title: '取消成功',
        })
      })
    })
  }

 
})