import { Component, inject, input, signal } from '@angular/core';
import { GifList } from './gif-list/gif-list';
import { GifService } from '../../service/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  gifService = inject(GifService);
}
