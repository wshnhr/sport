// miniprogram/pages/me/me.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginOK: false,
    intervalTime: 0,
    dakama: "易捷乐彩体育项目测试-可用图",
    loginStatus: false,
    dakamessage: '未扫码',
    daka2: false
  },
  denglu(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  zhuce(){
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onShow(){
    let user = wx.getStorageSync('user')
    if(user && user.name){
      this.setData({
        loginOK: true,
        name: user.name
      })
    }else{
      this.setData({
        loginOK: false
      })
    }
  },
  daka(){
    wx.scanCode({
      success: res=>{
        console.log(res)
        if(this.data.dakama == res.result){
          if(!this.data.loginStatus){
            app.globalData.checkintime = new Date()
            this.setData({
              loginStatus: true,
              daka2: false,
              dakamessage: '扫码成功，开始运动吧'
            })
          }else{
            app.globalData.checkouttime = new Date()
            const time = Math.floor((app.globalData.checkouttime -                                                app.globalData.checkintime) / 1000)
            this.setData({
              intervalTime: time,
              loginStatus: false,
              daka2: true,
              dakamessage: '扫码成功，您运动了'
            })
            if(time >= 15){
              wx.showModal({
                title: '积分发放',
                content: '时长达标，请领取您的奖励',
                cancelText: '领取积分'
              })
              }else{
                wx.showModal({
                  title: '积分发放',
                  content: '时长未达标，下次继续吆',
                  showCancel: false
                })
              }
            }
        }else{
          this.setData({
            dakamessage: '请扫描正确的二维码！！！'
          })

        }
      }
    })
  },
  tuichu(){
    wx.setStorageSync('user', null)
    let user = wx.getStorageSync('user')
    if(user && user.name){
      this.setData({
        loginOK: true,
        name: user.name
      })
    }else{
      this.setData({
        loginOK: false,
        loginStatus: false,
        dakamessage: '未扫码',
        daka2: false
      })
    }
  }
  
})