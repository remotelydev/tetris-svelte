// src/__tests__/Leaderboard.test.js
import { render } from '@testing-library/svelte';
import Leaderboard from '../Leaderboard.svelte';

beforeEach(() => {
  // Czyść localStorage przed każdym testem
  localStorage.clear();
});

describe('Leaderboard Component', () => {
  test('displays "Brak wyników" when no scores are saved', () => {
    const { getByText } = render(Leaderboard, { props: { currentScore: 0 } });

    expect(getByText('Najlepsze wyniki')).toBeInTheDocument();
    expect(getByText('Brak wyników')).toBeInTheDocument();
  });

  test('saves and displays the current score', () => {
    const { getByText } = render(Leaderboard, { props: { currentScore: 1000 } });

    expect(getByText('Najlepsze wyniki')).toBeInTheDocument();
    expect(getByText('1000')).toBeInTheDocument();
  });

  test('displays all saved scores', () => {
    const scores = [];
    for (let i = 1; i <= 15; i++) {
      scores.push({ score: i * 100, date: new Date().toLocaleString('pl-PL') });
    }
    localStorage.setItem('tetrisScores', JSON.stringify(scores));

    const { container } = render(Leaderboard, { props: { currentScore: 0 } });

    // Sprawdź, ile wyników jest wyświetlanych
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(15); // Komponent wyświetla wszystkie wyniki

    // Sprawdź, czy wyświetlane są wyniki w kolejności rosnącej
    const displayedScores = Array.from(items).map(item => parseInt(item.textContent));
    const expectedScores = scores.map(s => s.score);
    expect(displayedScores).toEqual(expectedScores);
  });
});
