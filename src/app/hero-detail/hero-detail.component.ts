import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Results } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent {
  selectedHero: Results[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    //el + delante de la variable, la convierte en numerica
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.heroService
      .getHeroeById(id)
      .subscribe((hero) => (this.selectedHero = hero));
  }

  public back(): void {
    this.location.back();
  }
}
