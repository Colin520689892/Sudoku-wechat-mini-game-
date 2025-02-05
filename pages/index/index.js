Page({
  data: {
    board: []
  },

  onLoad(options) {
    // 接收参数（关键代码）
    const difficulty = options.difficulty || 'easy'
    console.log('难度级别:', difficulty)
    
    // 根据难度初始化游戏
    this.initBoard(difficulty)
  },

  initBoard(difficulty) {
    // 初始化一个简单的数独棋盘
    const initialBoard = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    const board = initialBoard.map(row => 
      row.map(num => ({
        value: num === 0 ? '' : num,
        fixed: num !== 0
      }))
    );

    this.setData({ board });
  },

  onInput(e) {
    const { row, col } = e.currentTarget.dataset;
    const value = e.detail.value;

    const board = this.data.board;
    board[row][col].value = value;

    this.setData({ board });
  },

  checkSolution() {
    const board = this.data.board.map(row => 
      row.map(cell => cell.value === '' ? 0 : parseInt(cell.value))
    );

    if (this.isValidSudoku(board)) {
      wx.showToast({ title: '恭喜，答案正确！', icon: 'success' });
    } else {
      wx.showToast({ title: '答案错误，请继续努力！', icon: 'none' });
    }
  },

  resetBoard() {
    this.initBoard();
  },

  isValidSudoku(board) {
    // 检查行
    for (let i = 0; i < 9; i++) {
      const row = new Set();
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return false;
        if (row.has(board[i][j])) return false;
        row.add(board[i][j]);
      }
    }

    // 检查列
    for (let j = 0; j < 9; j++) {
      const col = new Set();
      for (let i = 0; i < 9; i++) {
        if (board[i][j] === 0) return false;
        if (col.has(board[i][j])) return false;
        col.add(board[i][j]);
      }
    }

    // 检查 3x3 宫格
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        const block = new Set();
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            const num = board[i + x][j + y];
            if (num === 0) return false;
            if (block.has(num)) return false;
            block.add(num);
          }
        }
      }
    }

    return true;
  }
});