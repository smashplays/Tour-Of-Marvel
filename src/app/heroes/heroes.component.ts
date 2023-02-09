import { Component, OnInit } from '@angular/core';
import { Results } from '../hero';
import { HeroService } from '../hero.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // Por defecto una propiedad es pública
  // string no sería necesario si inicializamos la variable directamente

  public heroes: Results[] = [];
  public offset: number = 0;

  public begin: number = 0;
  public end: number = this.begin + 20;

  //Indica a Angular, que se requiere el uso de la instancia HeroService y , en el mismo paso, crea una propiedad privadad de nombre heroService para contener dicha instancia
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

  anterior() {
    if (this.offset >= 20) {
      this.restar(this.offset - 20);
      if(this.end === 1562){
        this.restar(1540);
      }
      this.paginate(this.offset);
    }
  }

  restar(value: number){
    this.offset = value;
    this.begin = this.offset + 1;
    this.end = this.begin + 19;
  }

  siguiente() {
    if (this.offset <= 1542) {
      this.sumar(this.offset + 20);
      if (this.begin === 1561) {
        this.end = 1562;
      }
      this.paginate(this.offset);
    }
  }

  sumar(value: number){
      this.offset = value;
      this.begin = this.offset + 1;
      this.end = this.begin + 19;
  }
}
