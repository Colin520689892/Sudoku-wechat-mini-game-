// pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDifficultyDialog: false,
    difficultyList: [
      { label: '简单', value: "简单" },
      { label: '中级', value: "中级" },
      { label: '困难', value: "困难" },
      { label: '专家', value: "专家" }
    ],
    hasSavedGame: false
  },
  onShow() {
    // 每次页面显示时检查是否有存档
    this.checkSavedGame();
  },

  checkSavedGame() {
    try {
      const res = wx.getStorageSync('sudokuData');
      // 在 checkSavedGame 中增加
      if (res && Date.now() - res.timestamp > 86400000) { // 超过24小时
        wx.removeStorageSync('sudokuData');
        this.setData({ hasSavedGame: false });
      }
      else{
        this.setData({
          hasSavedGame: !!res
        });
      }

    } catch (e) {
      this.setData({ hasSavedGame: false });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(){
    return{
      title:"数独小程序",
      path:'/pages/shouye/shouye',
    }
  },
  onShareTimeline(){
    return{
      title:"数独小程序",
      path:'/pages/shouye/shouye',
    }
  },
  startNewGame() {
    wx.navigateTo({
      url: '/pages/index/index', // 跳转路径+参数
      success: () => {
        console.log("跳转成功")
      }
    })
  },

  continueGame() {
    console.log('继续游戏');
    // 这里添加继续游戏逻辑
    try {
      const gameData = wx.getStorageSync('sudokuData');
      wx.navigateTo({
        url: '/pages/jiu/jiu?isContinue=1',
        success: (res) => {
          res.eventChannel.emit('loadGameData', gameData)
        }
      });
    } catch (e) {
      wx.showToast({ title: '读取存档失败' });
    }
  },
  showDifficultyDialog() {
    this.setData({ showDifficultyDialog: true })
  },

  // 隐藏弹窗
  hideDifficultyDialog() {
    this.setData({ showDifficultyDialog: false })
  },

  // 阻止冒泡
  stopPropagation() {},

  // 选择难度
  selectDifficulty(e) {
    const level = e.currentTarget.dataset.level
    console.log('选择的难度:', level)
    this.hideDifficultyDialog()
    
    // 跳转到游戏页面并传递难度参数
    wx.navigateTo({
      url: `/pages/jiu/jiu?difficulty=${level}`,
    })
  }
})