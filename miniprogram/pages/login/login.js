// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    mima: ''

  },

  getName(event){
    this.setData({
      name: event.detail.value
    })
  },
  getMima(event){
    this.setData({
      mima: event.detail.value
    })
  },
  login(){
    let name = this.data.name
    let mima = this.data.mima

    if (name.length < 2) {
      wx.showToast({
        title: '用户名至少2位',
      })
      return
    }

    if (mima.length < 6) {
      wx.showToast({
        title: '密码至少6位',
      })
      return
    }

    wx.cloud.database().collection('user').where({
      name: name
    }).get({
      success(res){
        let user = res.data[0]
        if(mima==user.mima){
          wx.showToast({
            title: '登录成功',
          })
          wx.navigateTo({
            url: '../me/me',
          })
          wx.setStorageSync('user', user)
        }else{
          wx.showToast({
            title: '账号或密码不正确'
          })
        }
      },
      fail(res){
        console.log('获取数据失败，请检查网络重新登录',res)
      }
    })
  }
})