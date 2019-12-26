//index.js
const app = getApp()

Page({
  data: {
    name: '',
    mima: ''
  },

  getName(event) {
    console.log('获取输入的用户名',event.detail.value)
    this.setData({
      name: event.detail.value
    })
  },

  getMima(event) {
    console.log('获取输入的密码', event.detail.value)
    this.setData({
      mima: event.detail.value
    })
  },

  zhuce(){
    let name = this.data.name
    let mima = this.data.mima

    if(name.length <2 ){
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

    wx.cloud.database().collection('user').add({
      data:{
        name: name,
        mima: mima
      },
      success(res){
        console.log('注册成功',res)
        wx.showToast({
          title: '注册成功',
        })
        wx.navigateTo({
          url: '../login/login',
        })
      },
      fail(res) {
        console.log('注册失败',res)
      }
    })

  }

})
