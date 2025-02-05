const sudomakers=require('../../utils/sudomaker')
Page({
  data: {
    dots: [],
    selectedCell: null,
    shuzis:[],
    difficulty:"简单",
    is_correct:"检查无误",
    wrong_num: 0,
    rowLines: [],
    colLines: [],
    answer:[],
    is_win:false
  },
  onShareAppMessage(){
    return{
      title:"数独小程序",
      path:'/pages/jiu/jiu',
    }
  },
  onShareTimeline(){
    return{
      title:"数独小程序",
      path:'/pages/jiu/jiu',
    }
  },
  onUnload() {
    // 离开页面时自动保存
    this.saveGameData();
  },
  saveGameData() {
    try {
      wx.setStorageSync('sudokuData', {
        dots: this.data.dots,
        answer: this.data.answer,
        difficulty: this.data.difficulty,
        wrong_num: this.data.wrong_num,
        timestamp: new Date().getTime()
      });
    } catch (e) {
      console.error('存储失败', e);
    }
  },
  onLoad(options) {
    if (wx.createRewardedVideoAd) {
      // 检查是否已经创建过 videoAd
      if (!this.videoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: 'adunit-ac24c3c9260a8e95' // 第一个广告位 ID
        });
        // 只绑定一次 onClose 事件
        this.videoAd.onClose((res) => {
          if (res && res.isEnded) {
            // 如果广告完整观看，可以执行悔棋操作
            this.tishi();
          } else {
            // 如果广告未完整观看，提示用户
            wx.showToast({
              title: '请完整观看广告才能悔棋',
              icon: 'none',
            });
          }
        });
        // 其他事件绑定
        this.videoAd.onError((err) => {
          console.error('第一个激励视频广告加载失败', err);
        });
      }
  
      // 创建第二个广告位
      if (!this.videoAd2) {
        this.videoAd2 = wx.createRewardedVideoAd({
          adUnitId: 'adunit-1f23596de8171bcf' // 第二个广告位 ID
        });
        // 只绑定一次 onClose 事件
        this.videoAd2.onClose((res) => {
          if (res && res.isEnded) {
            // 如果广告完整观看，可以执行其他操作
            this.change_it_to_zero();
            console.log('第二个广告完整观看');
          } else {
            // 如果广告未完整观看，提示用户
            wx.showToast({
              title: '请完整观看广告才能获得奖励',
              icon: 'none',
            });
          }
        });
        // 其他事件绑定
        this.videoAd2.onError((err) => {
          console.error('第二个激励视频广告加载失败', err);
        });
      }
    }
    const eventChannel = this.getOpenerEventChannel();
    
    if (options.isContinue) {
      eventChannel.on('loadGameData', (data) => {
        this.setData({
          dots: data.dots,
          answer: data.answer,
          difficulty: data.difficulty,
          wrong_num: data.wrong_num
        });
        this.createBoard()
      });
    } else {
      // 新游戏初始化
      this.initBoard(options.difficulty);
      wx.removeStorageSync('sudokuData');
    }
  },
  new_opp(){
    if (this.videoAd2) {
      this.videoAd2.show().catch(() => {
        // 失败重试
        this.videoAd2.load()
          .then(() => this.videoAd2.show())
          .catch(err => {
            console.error('激励视频广告显示失败', err);
          });
      });
    }
  },
  change_it_to_zero(){
    let { wrong_num,selectedCell,dots } = this.data; // 获取点的索引
    wrong_num=0;
    if(selectedCell!=null){
      dots[selectedCell].number=0;
    }
    this.setData({wrong_num,dots});
  },
  tishi(){
    let { selectedCell,dots,answer } = this.data; // 获取点的索引
    if(selectedCell!=null){
      dots[selectedCell].number=answer[selectedCell];
    }
    this.setData({dots});
  },
  tishi1(){
    if (this.videoAd) {
      this.videoAd.show().catch(() => {
        // 失败重试
        this.videoAd.load()
          .then(() => this.videoAd.show())
          .catch(err => {
            console.error('激励视频广告显示失败', err);
          });
      });
    }
  },
  createBoard(){
    const shuzis=[];
    const rowLines = [];
    const colLines = [];
    for (let i = 0; i < 2; i++) {
      rowLines.push({ top: i * 232 + 330 + 'rpx' });
      colLines.push({ left: i * 232 + 256 + 'rpx' });
    }
    for(let i=0;i<9;i++){
      shuzis.push({
        number: i+1
      })
    }
    this.setData({ shuzis,colLines,rowLines});
  },
  initBoard(difficulty="简单") {
    if(difficulty=="简单")this.sudomaker=new sudomakers(36)
    else if(difficulty=="中级")this.sudomaker=new sudomakers(42)
    else if(difficulty=="困难")this.sudomaker=new sudomakers(48)
    else if(difficulty=="专家")this.sudomaker=new sudomakers(54)
    const chushi=this.sudomaker.getPuzzle()
    const resanswer=this.sudomaker.getSolution()
    const answer=[];
    const dots = [];
    const shuzis=[];
    const rowLines = [];
    const colLines = [];

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if(chushi[i][j]==0){
          dots.push({
            className: "blank",
            number:chushi[i][j],
            guding:false
          });
        }else{
          dots.push({
            className: "blank",
            number:chushi[i][j],
            guding:true
          });
        }
        answer.push(resanswer[i][j])
      }
    }
    for (let i = 0; i < 2; i++) {
      rowLines.push({ top: i * 230 + 330 + 'rpx' });
      colLines.push({ left: i * 229 + 256 + 'rpx' });
    }
    for(let i=0;i<9;i++){
      shuzis.push({
        number: i+1
      })
    }
    console.log(answer)
    this.setData({ dots ,shuzis,difficulty,colLines,rowLines,answer});
  },
  xiaqi(e){//选中格子
    let { index } = e.currentTarget.dataset; // 获取点的索引
    this.xuange(index)
  },
  cachu(){
    let {dots,selectedCell}=this.data;
    if(!dots[selectedCell].guding)dots[selectedCell].number=0;
    this.xuange(selectedCell);
  },
  xuange(index){
    let selectedCell=index;
    // 先将全部点置为空白
    let {dots} = this.data;
    for(let i=0;i<81;i++){
      dots[i].className="blank"
    }
    // 计算用户点击的棋盘坐标
    let row = Math.floor(index / 9);
    let col = index % 9;
    console.log({row,col})
    for(let i=Math.floor(row/3)*3;i<(Math.floor(row/3)+1)*3;i++){
      for(let j=Math.floor(col/3)*3;j<(Math.floor(col/3)+1)*3;j++){
        dots[i*9+j].className="pale"
      }
    }
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(dots[i*9+j].number!=0&&dots[i*9+j].number==dots[index].number){
          dots[i*9+j].className="xiangtong"
        }
      }
    }
    for(let i=0;i<9;i++){
      dots[row*9+i].className="pale"
    }
    for(let i=0;i<9;i++){
      dots[i*9+col].className="pale"
    }
    dots[index].className="blue"
    this.setData({dots,selectedCell});
  },
  tianshuzi(e){
    let { index } = e.currentTarget.dataset; // 获取点的索引
    let {dots,selectedCell,shuzis,answer,wrong_num}=this.data;
    if(dots[selectedCell].guding)return
    dots[selectedCell].number=shuzis[index].number;
    this.xuange(selectedCell)
    console.log(dots[selectedCell].number,answer[selectedCell])
    if(dots[selectedCell].number!=answer[selectedCell]){
      wrong_num++;
    }
    let num=0;
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        if(dots[i*9+j].number==answer[i*9+j])num++;
        else break;
      }
    }
    let is_win=false
    console.log(num)
    if(num==81){
      is_win=true;
    }
    this.setData({dots,wrong_num,is_win});
  },
  fanhui(){
    wx.removeStorageSync('sudokuData');
      wx.navigateTo({
        url: `/pages/shouye/shouye`,
      })
  },
  jixu(){
    let {difficulty}=this.data
    wx.navigateTo({
      url: `/pages/jiu/jiu?difficulty=${difficulty}`,
    })

  },
  selectedNum(){
    
  }
});