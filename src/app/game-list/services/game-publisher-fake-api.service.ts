import {Injectable} from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamePublisherFakeApiService {
  publishers = [
    {
      id: 1,
      name: 'The Behemoth',
      logo: 'https://pbs.twimg.com/media/DgBUwTvUcAApFOy.jpg',
    },
    {
      id: 2,
      name: 'Studio MDHR',
      logo:
        'https://media.senscritique.com/media/000008499582/150_200/Studio_MDHR.png',
    },
    {
      id: 3,
      name: 'Gameloft',
      logo: 'https://pbs.twimg.com/profile_images/1155800354811994112/TwhaF1RT_400x400.jpg',
    },
  ];

  constructor() {
  }

  getAll() {
    return of(this.publishers);
  }
}
