import {Component, OnInit} from '@angular/core';
import {GameCategories} from '../game-categories.enum';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  jeux = [
    {
      titre: 'BattleBlock Theater',
      types: [GameCategories.Plateform, GameCategories.Multiplayer],
      note: '9.8',
      cover: 'https://vistapointe.net/images/battleblock-theater-5.jpg',
      editor: 'The Behemoth',
      editorLogo: 'https://pbs.twimg.com/media/DgBUwTvUcAApFOy.jpg',
      description: 'Having shipwrecked on a mysterious island you find yourself both betrayed by your best friend\n' +
        '      Hatty and captured by the locals. All of this is happening while being forced into deadly performances. This\n' +
        '      however, is just the start of your problems.'
    },
    {
      titre: 'Cuphead',
      types: [GameCategories.Shootemup, GameCategories.Runandgun, GameCategories.Multiplayer],
      note: '10',
      cover: 'https://www.pdvg.it/wp-content/uploads/2017/10/cuphead_1920x1080_titled_hero_art.jpg',
      editor: 'Studio MDHR',
      editorLogo:
        'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dd/dd512d95ac2870c1e29064707d49719535179c5e_full.jpg',
      description:
        'Cuphead est un jeu vidéo indépendant mêlant « Shoot \'em up » et « run and gun ». Il est créé par des frères canadiens, ' +
        'Chad et Jared Moldenhauer, employés du Studio MDHR. Le jeu est inspiré par les œuvres de réalisateurs de dessins animés ' +
        'des années 1930 comme les studios de Max Fleischer.'
    },
    {
      titre: 'Mon petit poney',
      types: [GameCategories.Plateform, GameCategories.Solo],
      note: '0.2',
      cover:
        'https://vignette.wikia.nocookie.net/mylittlepony/images/2/25/G%C3%A9n%C3%A9rique_%28Photo_Finish_fait_le_photo%29.png' +
        '/revision/latest?cb=20140130061148&path-prefix=fr',
      editor: 'Gameloft',
      editorLogo: 'https://pbs.twimg.com/profile_images/1155800354811994112/TwhaF1RT_400x400.jpg',
      description: 'In the game, the player is asked to help Twilight Sparkle rebuild her home of Ponyville after it fell into the ' +
        'shadow of the villainous Nightmare Moon. To do so, the player uses in-game currency and other collected treasures to build homes' +
        ' to bring more ponies to the town, and then create businesses for them to work at and generate money. '
    }
  ];
  filteredGames: any[];

  actualCardWidth = 500;
  baseCardWidth = 500;

  constructor() {
  }

  truncate(description) {
    return description.split(' ', 20).join(' ') + ' ...';
  }

  buttonAlert(event) {
    alert('You clicked on ' + event.type + ' for the game ' + event.game);
  }

  changeCardSize(value: number, negative: boolean = false) {
    this.actualCardWidth += negative ? -value : value;
  }

  resetCardSize() {
    this.actualCardWidth = this.baseCardWidth;
  }

  filtering(form) {
    // console.log(this.jeux[0].types.includes('Multijoueur'));
    this.filteredGames = this.jeux
      .filter(jeu =>
        (!form.name || jeu.titre === form.name)
        && (!form.type || jeu.types.includes(form.type))
        && (!form.editor || jeu.editor === form.editor)
      );
  }

  ngOnInit() {
    this.filtering({});
  }

}
