import { Component, OnInit } from '@angular/core';
import { Hero, Results } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  heroes: Results[] = [];
  input: string = '';

  suggestedHeroes: Results[] = [];
  // showSuggestions: boolean = false;

  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  sugerencias(input: string) {
    this.input = input;
    // this.showSuggestions = true;

    this.heroService
      .searchHeroes(input)
      .subscribe(
        (search) => {
          this.suggestedHeroes = search.splice(0, 5);
        }
      );
  }
}
