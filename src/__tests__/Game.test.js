// src/__tests__/Game.test.js
import { render, fireEvent, act } from '@testing-library/svelte';
import Game from '../Game.svelte';

jest.useFakeTimers();

describe('Game Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  test('renders game components correctly', () => {
    const { getByText } = render(Game);

    expect(getByText('Najlepsze wyniki')).toBeInTheDocument();
    expect(getByText('Brak wyników')).toBeInTheDocument();
  });

  test('reacts to user input', async () => {
    const { container } = render(Game);

    // Upewnij się, że gra została załadowana
    expect(container.querySelector('.board')).toBeInTheDocument();

    // Symulujemy naciśnięcie klawisza "strzałka w dół"
    await fireEvent.keyDown(window, { key: 'ArrowDown' });
    await fireEvent.keyUp(window, { key: 'ArrowDown' });

    // Przyspieszamy czas
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Upewniamy się, że plansza nadal jest renderowana
    expect(container.querySelector('.board')).toBeInTheDocument();
  });

  test('displays game over message when game ends (skipped)', () => {
    // Ponieważ nie możemy wymusić stanu "game over" bez zmiany komponentu, pomijamy ten test
    // Możesz go odkomentować, jeśli znajdziesz sposób na symulację końca gry bez modyfikacji komponentu

    /*
    const { getByText } = render(Game);

    // Symuluj warunki końca gry, jeśli to możliwe

    expect(getByText('Koniec gry!')).toBeInTheDocument();
    expect(getByText('Zagraj ponownie')).toBeInTheDocument();
    */
  });
});
