
Page({


  data: {

  },


  onLoad: function (options) {
    if(wx.getStorageSync('history')){
      let history = wx.getStorageSync('history')
      this.setData({
        history
      })
      
    }

  },


})