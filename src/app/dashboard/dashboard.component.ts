import { Component, OnInit } from '@angular/core';
import { Results } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  heroes: Results[] = [];
  input: string = '';

  suggestedHeroes: Results[] = [];

  constructor(private heroService: HeroService) {}
  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  sugerencias(input: string) {
    this.input = input;

    this.heroService
      .searchHeroes(input)
      .subscribe(
        (search) => {
          this.suggestedHeroes = search.splice(0, 5);
        }
      );
  }
}
