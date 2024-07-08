
Page({

  data: {
    currentIndex:0
  },
   toSearch(){
    wx.navigateTo({
      url: '/pages/book/search/search',
    })
  },
  onLoad: function (options) {
    console.log(options.id)

    wx.cloud.database().collection('word_books')
    .doc(options.id)
    .get()
    .then(res=>{
      console.log(res)
      this.setData({
        book:res.data
      })
    })

    wx.cloud.database().collection('word_words')
    .where({
      bookId:options.id
    })
    .orderBy('time','desc')
    .get()
    .then(res=>{
      console.log(res.data)
      this.setData({
        bookList:res.data
      })
    })


    wx.cloud.database().collection('word_words')
    .where({
      bookId:options.id
    })
    .limit(3)
    .get()
    .then(res=>{
      console.log(res.data)
      this.setData({
        bookListRandom:res.data
      })
    })

  },
  next(){
    if(this.data.currentIndex == this.data.bookList.length){
      wx.navigateBack({
        delta: 0,
        success(){
          wx.showToast({
            title: '复习一遍完成',
          })
        }
      })
      return
    }
    this.setData({
      currentIndex:this.data.currentIndex+1
    })
  },
  chooseFalse(){
    wx.showToast({
      icon:'none',
      title: '选择错误',
    })
    this.setData({
      currentIndex:this.data.currentIndex+1
    })
    if(this.data.currentIndex == this.data.bookList.length){
      wx.navigateBack({
        delta: 0,
        success(){
          wx.showToast({
            title: '复习一遍完成',
          })
        }
      })
      return
    }
  },
  chooseTrue(){
    wx.showToast({
      title: '选择正确',
    })

    let that = this
   
    wx.showModal({
        title: '提示',
        content: '确认从复习本中移除吗？',
        cancelText: '取消',
        confirmText: '确定',
        success(modal){
            if(modal.confirm){
                wx.cloud.database().collection('word_words')
                .doc(that.data.bookList[that.data.currentIndex]._id)
                .remove()

                that.setData({
                    currentIndex:that.data.currentIndex+1
                  })

                if(that.data.currentIndex == that.data.bookList.length){
                    wx.navigateBack({
                        delta: 0,
                        success(){
                        wx.showToast({
                            title: '复习一遍完成',
                        })
                        }
                    })
                    return
                }
              
            }else{
                that.setData({
                    currentIndex:that.data.currentIndex+1
                  })

                if(that.data.currentIndex == that.data.bookList.length){
                    wx.navigateBack({
                        delta: 0,
                        success(){
                        wx.showToast({
                            title: '复习一遍完成',
                        })
                    }
                    })
                    return
                }
            }
        }
    })


   

   
    
    
    

  },

})