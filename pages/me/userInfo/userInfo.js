// pages/me/edit/edit.js
const app = getApp();
var util = require("../../../utils/util.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        if (app.globalData.userInfo) {
            this.setData({
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName
            })
        } else {
            this.setData({
                avatarUrl: "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0"
            })
        }
    },

    onChooseAvatar(e) {
        console.log(e)
        var avatarUrl=e.detail.avatarUrl
        wx.cloud.uploadFile({
                cloudPath: `loginImages/${Math.random()}_${Date.now()}.png`,
                filePath: avatarUrl
            })
            .then(res => {
                console.log(res.fileID)
                this.setData({
                    avatarUrl: res.fileID
                })


            })
    },

    // 提交事件
    comit() {
        var that = this;
        if (!this.data.nickName) {
            wx.showToast({
                title: '请输入昵称',
                icon: 'none'
            })
            return;
        }
        var data = {};
        var data2 = {};

        data.avatarUrl = this.data.avatarUrl;
        data.nickName = this.data.nickName;
        data.openid = app.globalData.openid;
        data2.avatarUrl = this.data.avatarUrl;
        data2.nickName = this.data.nickName;
        data2.openid = app.globalData.openid;
        data2.time = util.formatTime(new Date());

        if (app.globalData.userInfo && app.globalData.userInfo._id) {
            // 更新操作
            wx.cloud.database().collection('word_users')
                .doc(app.globalData.userInfo._id)
                .update({
                    data: data
                })
                .then(res => {
                    that.updateLocalUser();
                })
        } else {
            // 添加操作
            wx.cloud.database().collection('word_users')
                .add({
                    data: data2
                }).then(res => {
                    that.updateLocalUser();
                })
        }
    },

    /**
     * 获取用户并设置回调值
     */
    updateLocalUser() {
        wx.cloud.database().collection('word_users')
            .where({
                _openid: app.globalData.openid
            })
            .get()
            .then(res => {
                app.globalData.userInfo = res.data[0];
                wx.setStorageSync('userInfo', res.data[0]);
                var pages = getCurrentPages(); // 当前页面
                var prevPage = pages[pages.length - 2]; // 上个页面
                // 直接给上一个页面赋值
                prevPage.setData({
                    userInfo: res.data[0]
                });
                wx.navigateBack({
                    success(){
                        wx.showToast({
                          title: '更新成功',
                        })
                    }
                })
            })
    },
    
})