import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-pipes.pipe';
import { heroes } from '../../datat/heroes.data';
import type { Hero } from '../../interfaces/hero.interface';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    HeroTextColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortByPipe,
    HeroFilterPipe,
  ],
  templateUrl: './custom-page.html',
})
export default class CustomPage {
  name = signal<string>('Javier Incio Prieto');
  uppercase = signal<boolean>(true);

  heroes = signal<Hero[]>(heroes);

  sortBy = signal<keyof Hero | null>(null);

  searchQuery = signal<string>('');
}
