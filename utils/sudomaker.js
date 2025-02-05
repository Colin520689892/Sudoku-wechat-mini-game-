// // class SudokuMaker {
// // 	constructor(res) {
// // 			this.Arr = Array.from({ length: 9 }, () => Array(9).fill(0));
// // 			this.Sudoku = Array.from({ length: 9 }, () => Array(9).fill(0));
// // 			this.Answer = Array.from({ length: 9 }, () => Array(9).fill(0));
// // 			this.Game = Array.from({ length: 9 }, () => Array(9).fill(0));
// // 			this.flag = false;
// // 			this.total = 0;

// // 			this.rand();
// // 			this.DFS(this.Arr, 0, false);
// // 			this.diger(res);
// // 			//this.showGame(this.Game);
// // 			//this.showAnswer(this.Answer);
// // 	}

// // 	// 随机填充
// // 	rand() {
// // 			let t = 0;
// // 			let x, y, num;
// // 			while (t < 15) {
// // 					x = Math.floor(Math.random() * 9);
// // 					y = Math.floor(Math.random() * 9);
// // 					num = Math.floor(Math.random() * 9) + 1;
// // 					if (this.Arr[y][x] === 0) {
// // 							if (this.isTrue(this.Arr, x, y, num)) {
// // 									this.Arr[y][x] = num;
// // 									++t;
// // 							}
// // 					}
// // 			}
// // 	}

// // 	// 判断该数字是否符合数独规则
// // 	isTrue(arr, x, y, num) {
// // 			// 判断3x3格子
// // 			for (let i = Math.floor(y / 3) * 3; i < Math.floor(y / 3) * 3 + 3; ++i) {
// // 					for (let j = Math.floor(x / 3) * 3; j < Math.floor(x / 3) * 3 + 3; ++j) {
// // 							if (arr[i][j] === num) return false;
// // 					}
// // 			}
// // 			// 判断横竖
// // 			for (let i = 0; i < 9; ++i) {
// // 					if (arr[i][x] === num || arr[y][i] === num) return false;
// // 			}
// // 			return true;
// // 	}

// // 	// 深度优先搜索寻找数独解
// // 	DFS(arr, n, all) {
// // 			if (n < 81) {
// // 					if (this.flag && !all) return;

// // 					if (arr[Math.floor(n / 9)][n % 9] === 0) {
// // 							for (let i = 1; i < 10; ++i) {
// // 									if (this.isTrue(arr, n % 9, Math.floor(n / 9), i)) {
// // 											arr[Math.floor(n / 9)][n % 9] = i;
// // 											this.DFS(arr, n + 1, all);
// // 											arr[Math.floor(n / 9)][n % 9] = 0;
// // 									}
// // 							}
// // 					} else {
// // 							this.DFS(arr, n + 1, all);
// // 					}
// // 			} else {
// // 					if (!all) {
// // 							this.flag = true;
// // 							for (let i = 0; i < 9; ++i) {
// // 									for (let j = 0; j < 9; ++j) {
// // 											this.Sudoku[i][j] = arr[i][j];
// // 											this.Answer[i][j] = arr[i][j];
// // 									}
// // 							}
// // 					} else {
// // 							for (let i = 0; i < 9; ++i) {
// // 									for (let j = 0; j < 9; ++j) {
// // 											if (arr[i][j] !== this.Answer[i][j]) {
// // 													this.Game[i][j] = this.Answer[i][j];
// // 													return;
// // 											}
// // 									}
// // 							}
// // 					}
// // 			}
// // 	}

// // 	// 挖空操作，确保数独有唯一解
// // 	diger(res) {
// // 			let t = res;
// // 			while (t > 0) {
// // 					let x = Math.floor(Math.random() * 9);
// // 					let y = Math.floor(Math.random() * 9);
// // 					if (this.Sudoku[y][x] !== 0) {
// // 							this.Sudoku[y][x] = 0;
// // 							--t;
// // 					}
// // 			}

// // 			for (let i = 0; i < 9; ++i) {
// // 					for (let j = 0; j < 9; ++j) {
// // 							this.Game[i][j] = this.Sudoku[i][j];
// // 					}
// // 			}

// // 			this.DFS(this.Sudoku, 0, true);
// // 	}

// // 	// 获取游戏数独
// // 	getArr() {
// // 			return this.Game;
// // 	}

// // 	// 获取数独答案
// // 	getAnswer() {
// // 			return this.Answer;
// // 	}

// // 	// 显示游戏和答案
// // 	showGame(game) {
// // 			console.log('Game Board:');
// // 			game.forEach(row => console.log(row.join(' ')));
// // 	}

// // 	showAnswer(answer) {
// // 			console.log('Answer Board:');
// // 			answer.forEach(row => console.log(row.join(' ')));
// // 	}
// // }

// // // 使用示例
// // // let sudoku = new SudokuMaker();
// // // console.log("Generated Sudoku Puzzle:");
// // // console.log(sudoku.getArr());
// // // console.log("Answer:");
// // // console.log(sudoku.getAnswer());
// // module.exports =SudokuMaker; 
// class SudokuMaker {
//   constructor(difficulty = 40) {
//     this.solution = this.generateValidSudoku();
// 		this.puzzle = this.createPuzzle(difficulty);
// 		console.log(this.solution)
//   }

//   // 生成有效数独核心算法
//   generateValidSudoku() {
//     const createEmptyBoard = () => Array(9).fill().map(() => Array(9).fill(0));
//     const isValid = (board, row, col, num) => {
//       // 检查行冲突
//       for (let c = 0; c < 9; c++) {
//         if (board[row][c] === num) return false;
//       }
//       // 检查列冲突
//       for (let r = 0; r < 9; r++) {
//         if (board[r][col] === num) return false;
//       }
//       // 检查宫冲突
//       const startRow = Math.floor(row / 3) * 3;
//       const startCol = Math.floor(col / 3) * 3;
//       for (let r = startRow; r < startRow + 3; r++) {
//         for (let c = startCol; c < startCol + 3; c++) {
//           if (board[r][c] === num) return false;
//         }
//       }
//       return true;
//     };

//     // 随机填充前三个宫
//     const fillInitialBlocks = (board) => {
//       for (let block = 0; block < 3; block++) {
//         const numbers = Array(9).fill().map((_, i) => i + 1);
//         for (let r = block * 3; r < block * 3 + 3; r++) {
//           for (let c = 0; c < 3; c++) {
//             const idx = Math.floor(Math.random() * numbers.length);
//             board[r][c + block * 3] = numbers.splice(idx, 1)[0];
//           }
//         }
//       }
//       return board;
//     };

//     // 快速填充算法
//     const fastFill = (board) => {
//       const candidates = Array(9).fill().map((_, i) => i + 1);
      
//       for (let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col++) {
//           if (board[row][col] !== 0) continue;
          
//           const usedNumbers = new Set();
//           // 收集已用数字
//           for (let c = 0; c < 9; c++) usedNumbers.add(board[row][c]);
//           for (let r = 0; r < 9; r++) usedNumbers.add(board[r][col]);
          
//           const available = candidates.filter(n => !usedNumbers.has(n));
//           if (available.length === 0) return null;
          
//           board[row][col] = available[Math.floor(Math.random() * available.length)];
//         }
//       }
//       return board;
//     };

//     // 动态生成直到成功
//     let board;
//     do {
//       board = fillInitialBlocks(createEmptyBoard());
//       board = fastFill(board);
//     } while (!board);

//     return board;
//   }

//   // 创建谜题(不验证唯一解)
//   createPuzzle(holes) {
//     const puzzle = this.solution.map(row => [...row]);
//     const coords = [];
    
//     // 生成所有坐标并随机排序
//     for (let r = 0; r < 9; r++) {
//       for (let c = 0; c < 9; c++) {
//         coords.push([r, c]);
//       }
//     }
//     coords.sort(() => Math.random() - 0.5);

//     // 挖洞操作
//     let removed = 0;
//     for (const [r, c] of coords) {
//       if (removed >= holes) break;
//       puzzle[r][c] = 0;
//       removed++;
//     }

//     return puzzle;
//   }

//   getPuzzle() {
//     return this.puzzle.map(row => [...row]);
//   }

//   getSolution() {
//     return this.solution.map(row => [...row]);
//   }
// }

// // 使用示例
// // const generator = new SudokuGenerator(40);
// // console.log("Puzzle:", generator.getPuzzle());
// // console.log("Solution:", generator.getSolution());
// module.exports = SudokuMaker;

class SudokuMaker {
  constructor(difficulty = 40) {
    this.solution = this.generateValidSudoku();
    this.puzzle = this.createPuzzle(difficulty);
  }

  generateValidSudoku() {
    // 基础数独模板
    const base = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [4, 5, 6, 7, 8, 9, 1, 2, 3],
      [7, 8, 9, 1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 7, 8, 9, 1],
      [5, 6, 7, 8, 9, 1, 2, 3, 4],
      [8, 9, 1, 2, 3, 4, 5, 6, 7],
      [3, 4, 5, 6, 7, 8, 9, 1, 2],
      [6, 7, 8, 9, 1, 2, 3, 4, 5],
      [9, 1, 2, 3, 4, 5, 6, 7, 8]
    ];

    // 随机置换行块和列块
    const shuffle = array => array.sort(() => Math.random() - 0.5);
    const rowBlocks = [[0,1,2], [3,4,5], [6,7,8]].map(shuffle);
    const colBlocks = [[0,1,2], [3,4,5], [6,7,8]].map(shuffle);
    
    // 生成数字映射
    const numbers = shuffle([1,2,3,4,5,6,7,8,9]);
    const numMap = (n) => numbers[n-1];

    // 构建最终数独
    const sudoku = [];
    for (const rowBlock of rowBlocks) {
      for (const r of rowBlock) {
        const row = [];
        for (const colBlock of colBlocks) {
          for (const c of colBlock) {
            row.push(numMap(base[r][c]));
          }
        }
        sudoku.push(row);
      }
    }
    return sudoku;
  }

  createPuzzle(holes) {
    const puzzle = this.solution.map(row => [...row]);
    const coords = Array.from({length: 81}, (_, i) => [Math.floor(i/9), i%9]);
    coords.sort(() => Math.random() - 0.5);

    let removed = 0;
    for (const [r, c] of coords) {
      if (removed >= holes) break;
      const original = puzzle[r][c];
      puzzle[r][c] = 0;
      if (!this.hasUniqueSolution(puzzle)) puzzle[r][c] = original;
      else removed++;
    }
    return puzzle;
  }

  hasUniqueSolution(puzzle) {
    let count = 0;
    const board = puzzle.map(row => [...row]);
    const candidates = (r, c) => {
      const used = new Set();
      for (let i = 0; i < 9; i++) {
        used.add(board[r][i]);
        used.add(board[i][c]);
      }
      const sr = Math.floor(r/3)*3, sc = Math.floor(c/3)*3;
      for (let i = sr; i < sr+3; i++)
        for (let j = sc; j < sc+3; j++)
          used.add(board[i][j]);
      return Array.from({length:9}, (_,i) => i+1).filter(n => !used.has(n));
    };

    const solve = () => {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] !== 0) continue;
          const nums = candidates(r, c);
          if (nums.length === 0) return false;
          
          // 优先尝试随机候选数
          for (const num of nums.sort(() => Math.random() - 0.5)) {
            board[r][c] = num;
            if (solve()) {
              if (count > 1) return true;
              board[r][c] = 0; // 继续找其他解
            } else {
              board[r][c] = 0;
            }
          }
          return false;
        }
      }
      count++;
      return count <= 1;
    };

    solve();
    return count === 1;
  }

  getPuzzle() { return this.puzzle.map(row => [...row]); }
  getSolution() { return this.solution.map(row => [...row]); }
}

module.exports = SudokuMaker;