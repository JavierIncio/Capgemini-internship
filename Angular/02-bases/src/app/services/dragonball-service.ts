import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../models/character.interface';

const loadFromLocalStorage = (): Character[] => {
  const characters = localStorage.getItem('characters');
  return characters ? JSON.parse(characters) : [];
};

@Injectable({
  providedIn: 'root',
})
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  addCharacter(char: Character) {
    this.characters.update((curr) => [...curr, char]);
  }
}
