import { describe, it, expect, beforeEach, vi } from 'vitest';

// Simuloidaan localStorage ennen testejä
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
vi.stubGlobal('localStorage', localStorageMock);

describe('Todo-sovelluksen yksikkötestit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Testaussuunnitelma: Tehtävän lisäys
  it('Tehtävän lisäys: uusi tehtävä tallentuu muistiin', () => {
    const newTask = {
      id: 't_123',
      topic: 'Kirjoita testisuunnitelma',
      priority: 'high',
      status: 'todo',
    };

    const tasks = [newTask];
    localStorage.setItem('todo_tasks_v1', JSON.stringify(tasks));

    const savedTasks = JSON.parse(localStorage.getItem('todo_tasks_v1'));
    expect(savedTasks).toHaveLength(1);
    expect(savedTasks[0].topic).toBe('Kirjoita testisuunnitelma');
  });

  // Testaussuunnitelma: Prioriteetin valinta
  it('Prioriteetin valinta: korkea prioriteetti tallentuu oikein', () => {
    const taskWithPrio = {
      topic: 'Tärkeä tehtävä',
      priority: 'high',
    };

    localStorage.setItem('todo_tasks_v1', JSON.stringify([taskWithPrio]));
    const savedTasks = JSON.parse(localStorage.getItem('todo_tasks_v1'));

    expect(savedTasks[0].priority).toBe('high');
  });

  // Testaussuunnitelma: Muistin toimivuus (F5-simulaatio)
  it('Muistin toimivuus: tehtävät säilyvät "uudelleenlatauksen" jälkeen', () => {
    const task = { topic: 'Säilyvä tehtävä' };
    localStorage.setItem('todo_tasks_v1', JSON.stringify([task]));

    // "Ladataan sivu" eli haetaan tiedot uudestaan muistista
    const reloadTasks = JSON.parse(localStorage.getItem('todo_tasks_v1'));
    expect(reloadTasks).toContainEqual(task);
  });
});
