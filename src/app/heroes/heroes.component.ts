import { Component, OnInit } from '@angular/core';
import { Results } from '..//hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  public heroes: Results[] = [];
  public offset: number = 0;

  public begin: number = 0;
  public end: number = this.begin + 20;
  
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.paginate(this.offset);
    this.begin += 1;
  }

  paginate(offset: number) {
    return this.heroService
      .getHeroesPaginate(offset)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  add(value: number){
    this.offset = value;
    this.begin = this.offset + 1;
    this.end = this.begin + 19;
  }

  anterior() {
    if (this.offset >= 20) {
      this.add(this.offset - 20);
      if(this.end === 1562){
        this.add(1540);
      }
      this.paginate(this.offset);
    }
  }

  siguiente() {
    if (this.offset <= 1542) {
      this.add(this.offset + 20);
      if (this.begin === 1561) {
        this.end = 1562;
      }
      this.paginate(this.offset);
    }
  }
}
