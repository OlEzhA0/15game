'use strict';

const empty = {
  value: 16,
  top: 3,
  left: 3,
  emptyCell: 'empty',
};

const field = document.querySelector('.field');
const cellWidth = 110;
const cellsArray = [];
const reset = document.querySelector('.button');
const winText = document.querySelector('.win-text');
const noField = document.querySelector('.no-field');

init();

function init() {
  cellsArray.push(empty);

  const randomNumbers = [...Array(15).keys()]
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i <= 14; i++) {
    const cell = document.createElement('div');

    cell.classList.add('cell');
    cell.textContent = `${randomNumbers[i] + 1}`;

    const left = i % 4;
    const top = (i - left) / 4;

    cellsArray.push({
      value: randomNumbers[i] + 1,
      left,
      top,
      element: cell,
    });

    cell.style.left = `${left * cellWidth}px`;
    cell.style.top = `${top * cellWidth}px`;

    field.append(cell);

    cell.addEventListener('click', () => {
      moveCell(i);
    });
  }
}

function moveCell(cellIndex) {
  const cell = cellsArray[cellIndex + 1];
  const leftDiff = Math.abs(empty.left - cell.left);
  const topDiff = Math.abs(empty.top - cell.top);

  if (leftDiff + topDiff !== 1) {
    return;
  }

  cell.element.style.left = `${empty.left * cellWidth}px`;
  cell.element.style.top = `${empty.top * cellWidth}px`;

  const emptyLeft = empty.left;
  const emptyTop = empty.top;

  empty.left = cell.left;
  empty.top = cell.top;
  cell.top = emptyTop;
  cell.left = emptyLeft;

  const isWin = cellsArray.every(everyCell => {
    return everyCell.value === (everyCell.top * 4) + everyCell.left + 1;
  });

  if (isWin) {
    winText.textContent = `Вы выиграли! Поздравляю!
      Нажмите Reset чтобы начать снова.`;
    noField.style.zIndex = `2`;
  }
}

reset.addEventListener('click', () => {
  winText.textContent = ``;
  empty.top = 3;
  empty.left = 3;
  field.innerHTML = ``;
  cellsArray.length = 0;
  noField.style.zIndex = `-1`;
  init();
});
