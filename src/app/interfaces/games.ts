import {Categories} from './categories';
import {Publishers} from './publishers';
import {Developers} from './developers';

export interface Games {
  id: number;
  title: string;
  genres: Categories[];
  publisher: Publishers;
  description: string;
  developer: Developers;
  coverImage: string;
}
