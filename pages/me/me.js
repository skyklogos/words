var util = require("../../utils/util.js")
const app = getApp()
Page({


  data: {

  },
  feedback(){
    wx.navigateTo({
      url: '/pages/me/feedback/feedback',
    })
  },
  toNote(){
    wx.navigateTo({
      url: '/pages/me/note/note',
    })
  },
  onLoad: function (options) {
    
  },
  previewImg: function (e) {
    
    wx.previewImage({
      current: this.data.userInfo.avatarUrl,    //当前图片地址  
      //所有要预览的图片的地址集合 数组形式
      urls: [this.data.userInfo.avatarUrl],

    })
  },
  toUserInfo() {
    wx.navigateTo({
        url: '/pages/me/userInfo/userInfo',
    })
},
  onShow(){
    setTimeout(() => {
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }, 2000);
  },
  getUserProfile() {
    var that = this;
    wx.cloud.database().collection('word_users')
        .where({
            _openid: app.globalData.openid
        })
        .get()
        .then(result => {
            if (result.data.length == 0) {
                wx.navigateTo({
                    url: './userInfo/userInfo',
                    success() {
                        wx.showToast({
                            title: '首次登录请填写用户昵称及头像',
                            icon: 'none'
                        })
                    }
                })
            } else {
                // 获取数据库用户信息
                wx.cloud.database().collection('word_users')
                    .where({
                        _openid: app.globalData.openid
                    })
                    .get()
                    .then(res => {
                        console.log(res)
                        app.globalData.userInfo = res.data[0]
                        wx.setStorageSync('userInfo', res.data[0])
                        that.setData({
                            user: res.data[0]
                        })
                        that.setData({
                            userInfo: res.data[0]
                        })
                    })
             
            }
        })
},
  loginOut(){
    app.globalData.userInfo = null
    this.setData({
      userInfo:null
    })
    wx.removeStorageSync('userInfo')
  },


  toSubscribe(){
    wx.navigateTo({
      url: '/pages/me/mySubscribe/mySubscribe',
    })
  },
  toCollect(){
    wx.navigateTo({
      url: '/pages/me/myCollect/myCollect',
    })
  },
  toHistory(){
    wx.navigateTo({
      url: '/pages/me/myHistory/myHistory',
    })
  }


})