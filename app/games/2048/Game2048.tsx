import React, { useState, useEffect } from 'react';

const Game2048 = () => {
  const [board, setBoard] = useState(Array(4).fill(0).map(() => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {

  }, []);

  const addNewTile = (currentBoard: number[][]): number[][] => {
    const emptyTiles: [number, number][] = [];
    currentBoard.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 0) {
          emptyTiles.push([i, j]);
        }
      });
    });

    if(emptyTiles.length === 0) return currentBoard;

    const [newI, newJ] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    currentBoard[newI][newJ] = Math.random() < 0.9 ? 2 : 4;

    return currentBoard;
  } 

  const moveLeft = (currentBoard: number[][]): boolean => {
    let moved = false;
    for(let i = 0; i < 4; i++) {
      const row = currentBoard[i];
      const newRow = row.filter(cell => cell !== 0);

      for(let j = 0; j < newRow.length - 1; j++) {
        if(newRow[i] === newRow[j + 1]) {
          newRow[j] *= 2;
          setScore(prev => prev + newRow[j]);
          if(newRow[j] === 2048) setWon(true);
          newRow.splice(j + 1, 1);
          moved = true;
        }
      }

      while(newRow.length < 4) newRow.push(0);

      if(JSON.stringify(row) !== JSON.stringify(newRow)) {
        currentBoard[i] = newRow;
        moved = true;
      }
    }
    return moved;
  }

  const moveRight = (currentBoard: number[][]): boolean => {
    let moved = false;
    for(let i = 0; i < 4; i++) {
      const row = currentBoard[i];
      const newRow = row.filter(cell => cell !== 0);

      for(let j = newRow.length - 1; j > 0; j--) {
        if(newRow[j] === newRow[j - 1]) {
          newRow[j] *= 2;
          setScore(prev => prev + newRow[j]);
          if(newRow[j] === 2048) setWon(true);
          newRow.splice(j - 1, 1);
          newRow.unshift(0);
          moved = true;
        }
      }

      while(newRow.length < 4) newRow.unshift(0);

      if(JSON.stringify(row) !== JSON.stringify(newRow)) {
        currentBoard[i] = newRow;
        moved = true;
      }
    }
    return moved;
  }

  const moveUp = (currentBoard: number[][]): boolean => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      const column = currentBoard.map(row => row[j]);
      const newColumn = column.filter(cell => cell !== 0);

      for (let i = 0; i < newColumn.length - 1; i++) {
        if (newColumn[i] === newColumn[i + 1]) {
          newColumn[i] *= 2;
          setScore(prev => prev + newColumn[i]);
          if(newColumn[i] === 2048) setWon(true);
          newColumn.splice(i + 1, 1);
          moved = true;
        }
      }

      while (newColumn.length < 4) newColumn.push(0);

      if(JSON.stringify(column) !== JSON.stringify(newColumn)) {
        for (let i = 0; i < 4; i++) {
          currentBoard[i][j] = newColumn[i];
        }
        moved = true;
      }
    }
    return moved;
  }

  const moveDown = (currentBoard: number[][]): boolean => {
    let moved = false;
    for (let j = 0; j < 4; j++) {
      const column = currentBoard.map(row => row[j]);
      const newColumn = column.filter(cell => cell !== 0);

      for(let i = newColumn.length - 1; i > 0; i--) {
        if (newColumn[i] === newColumn[i - 1]) {
          newColumn[i] *= 2;
          setScore(prev => prev + newColumn[i]);
          if(newColumn[i] === 2048) setWon(true);
          newColumn.splice(i - 1, 1);
          newColumn.unshift(0);
          moved = true;
        }
      }

      while (newColumn.length < 4) newColumn.unshift(0);

      if(JSON.stringify(column) !== JSON.stringify(newColumn)) {
        for (let i = 0; i < 4; i++) {
          currentBoard[i][j] = newColumn[i];
        }
        moved = true;
      }
    }
    return moved;
  }

  const checkGameStatus = (currentBoard: number[][]): void => {
    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        if (currentBoard[i][j] === 0) return;
      }
    }

    for(let i = 0; i < 4; i++) {
      for(let j = 0; j < 4; j++) {
        if (
          (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) ||
          (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1])
        ) {
          return;
        }
      }
    }

    setGameOver(true);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(gameOver || won) return;
    let moved = false;
    const newBoard = board.map(row => [...row]);

    switch(e.key) {
      
    }
  }
}