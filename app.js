// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: "bcbdy-3gj5jsx126e4beb4",//修改成自己的云环境名称
      traceUser: true,
    })
    var that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
      success(res){
        console.log(res)
        that.globalData.openid = res.result.openid
      }
    })


    if(wx.getStorageSync('userInfo')){
      this.globalData.userInfo = wx.getStorageSync('userInfo')
      this.getUserinfo()
    }
    
  },
  getUserinfo(){
    //获取用户的openid
    var that = this;
    wx.cloud.callFunction({
      name:'getOpenid',
      success(res){
        console.log(res)
        that.globalData.openid = res.result.openid

        //查找数据库用户表里面是否有这个用户记录
        wx.cloud.database().collection('word_users').where({
          _openid: res.result.openid
        }).get({
          success(result){

            console.log(result)
            that.globalData.userInfo = result.data[0]
            wx.setStorageSync('userInfo', result.data[0])
          }
        })

      }
    })
  },
  globalData: {
    userInfo: null,
    openid:null
  }
})


//我想添加一个功能，可以选择一个生词本对里面的单词进行复习
// （比如给出英语选择正确的中文释义这样的）如果正确选择
// 就从生词本删去，如果选择不正确就继续保存在生词本里面这样的功能可实现吗？