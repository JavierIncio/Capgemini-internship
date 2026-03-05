import { Component, /* computed, */ signal } from '@angular/core';
// import { NgClass } from '@angular/common';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  selector: 'app-dragonball-page',
  imports: [
    /* NgClass */
  ],
  templateUrl: './dragonball-page.html',
})
export class DragonballPage {
  name = signal<string>('');
  power = signal<number>(0);

  characters = signal<Character[]>([
    { id: 1, name: 'P1', power: 123 },
    // { id: 2, name: 'P2', power: 456 },
    // { id: 3, name: 'P3', power: 789 },
    // { id: 4, name: 'P4', power: 33 },
  ]);

  // powerClasses = computed(() => {
  //   return { 'text-danger': true };
  // });

  addCharacter() {
    this.characters.update((curr) => [
      ...curr,
      { id: curr.length + 1, name: this.name(), power: this.power() },
    ]);
  }
}
