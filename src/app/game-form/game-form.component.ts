import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameApiService} from '../services/game-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Categories} from '../interfaces/categories';
import {Games} from '../interfaces/games';
import {Publishers} from '../interfaces/publishers';
import {Developers} from '../interfaces/developers';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  private routeSub: Subscription;
  gameId: number;
  game: Games;
  isNew: boolean;
  genresList: Categories[];
  publishersList: Publishers[];
  developersList: Developers[];
  gameForm = this.fb.group({
    id: [''],
    title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
    genres: ['', Validators.required],
    publisher: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(10)]],
    developer: ['', Validators.required],
    coverImage: ['', Validators.required],
    note: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
  });


  constructor(private gameApi: GameApiService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameId = params.id ? params.id : null;
      this.isNew = !params.id;
      if (params.id) {
        this.getGame(params.id);
      }
    });
    this.getLists();
  }

  getLists() {
    this.gameApi.getAllCategories()
      .subscribe((data: Categories[]) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        this.genresList = data;
      });
    this.gameApi.getAllPublishers()
      .subscribe((data: Publishers[]) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        this.publishersList = data;
      });
    this.gameApi.getAllDevelopers()
      .subscribe((data: Developers[]) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        this.developersList = data;
      });
  }

  getGame(gameId: number) {
    this.gameApi.getGame(gameId)
      .subscribe((data: Games) => {
        if (!data.note) {
          data.note = 0;
        }
        this.gameForm.setValue(data);
      });
  }

  get title(): AbstractControl {
    return this.gameForm.get('title');
  }

  getTitleErrorMessage() {
    if (this.title.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
    if (this.title.hasError('maxlength')) {
      return 'Le titre ne peut pas faire plus de 50 caractères.';
    }
    if (this.title.hasError('minlength')) {
      return 'Le titre ne peut pas faire moins de 2 caractères.';
    }
  }

  get genres(): AbstractControl {
    return this.gameForm.get('genres');
  }

  getGenresErrorMessage() {
    if (this.genres.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
  }

  get publisher(): AbstractControl {
    return this.gameForm.get('publisher');
  }

  getPublisherErrorMessage() {
    if (this.publisher.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
  }

  get description(): AbstractControl {
    return this.gameForm.get('description');
  }

  getDescriptionErrorMessage() {
    if (this.description.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
    if (this.description.hasError('minlength') || this.description.hasError('maxlength')) {
      return 'La description doit faire entre 10 et 300 caractères.';
    }
  }

  get developer(): AbstractControl {
    return this.gameForm.get('developer');
  }

  getDeveloperErrorMessage() {
    if (this.developer.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
  }

  get coverImage(): AbstractControl {
    return this.gameForm.get('coverImage');
  }

  getCoverImageErrorMessage() {
    if (this.coverImage.hasError('required')) {
      return 'Vous devez renseigner ce champ.';
    }
  }

  get note(): AbstractControl {
    return this.gameForm.get('note');
  }

  getNoteErrorMessage() {
    if (this.note.hasError('required') || this.note.hasError('min') || this.note.hasError('max')) {
      return 'Il faut renseigner un nombre entre 0 et 10';
    }
  }

  Submit() {
    const newGame: Games = this.gameForm.value;
    this.gameApi.createGame(newGame)
      .subscribe((data: Games) => {
        this.router.navigateByUrl('/product/' + data.id);
      });
  }

  Edit() {
    const editGame: Games = this.gameForm.value;
    this.gameApi.editGame(editGame)
      .subscribe((data: Games) => {
        this.router.navigateByUrl('/product/' + data.id);
      });
  }
}
