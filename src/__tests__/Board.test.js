// src/__tests__/Board.test.js
import { render } from '@testing-library/svelte';
import Board from '../Board.svelte';

describe('Board Component', () => {
  test('renders correctly with empty grid', () => {
    const grid = Array.from({ length: 20 }, () => Array(10).fill(0));
    const { container } = render(Board, { props: { grid } });

    const cells = container.querySelectorAll('.cell');
    expect(cells.length).toBe(200); // 20 wierszy * 10 kolumn

    const filledCells = container.querySelectorAll('.filled');
    expect(filledCells.length).toBe(0); // Brak wypełnionych komórek
  });

  test('renders filled cells correctly', () => {
    const grid = Array.from({ length: 20 }, () => Array(10).fill(0));
    grid[0][0] = 1;
    grid[19][9] = 1;

    const { container } = render(Board, { props: { grid } });

    const filledCells = container.querySelectorAll('.filled');
    expect(filledCells.length).toBe(2);

    // Sprawdź, czy pierwsza komórka jest wypełniona
    const firstCell = container.querySelector('.cell');
    expect(firstCell.classList.contains('filled')).toBe(true);
  });
});
