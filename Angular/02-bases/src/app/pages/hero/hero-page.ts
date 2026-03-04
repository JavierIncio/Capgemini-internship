import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [UpperCasePipe],
  templateUrl: './hero-page.html',
  styleUrl: './hero-page.css',
})
export class HeroPage {
  name = signal<string>('Ironman');
  age = signal<number>(45);

  heroDescription = computed<string>(() => {
    const description = `${this.name()} - ${this.age()}`;
    return description;
  });

  // capitalizedName = computed<string>(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }

  chageAge() {
    this.age.set(60);
  }
}
