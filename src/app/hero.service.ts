import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Hero, Results } from './hero';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesURL: string = 'http://gateway.marvel.com/v1/public/characters';
  private params: string =
    '?ts=1&apikey=1beb8e7f6c444074f09f597377c2de2e&hash=b56f7652bfdca8422b2552da4819dc2f';

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<Results[]> {
    let offset: number = Math.floor(Math.random() * 1562);
    if (offset >= 12) {
      offset = offset - 12;
    }
    return this.http
      .get<Hero>(
        this.heroesURL + this.params + '&offset=' + offset + '&limit=' + '12'
      )
      .pipe(map((resp: Hero) => resp.data.results));
  }

  public getHeroesPaginate(offset: number): Observable<Results[]> {
    return this.http
      .get<Hero>(this.heroesURL + this.params + '&offset=' + offset)
      .pipe(map((resp: Hero) => resp.data.results));
  }

  public getHeroeById(id: number): Observable<Results[]> {
    return this.http
      .get<Hero>(this.heroesURL + '/' + id + this.params)
      .pipe(map((resp: Hero) => resp.data.results));
  }

  public searchHeroes(input: string): Observable<Results[]> {
    if (!input.trim()) {
      return of([]);
    }

    return this.http
      .get<Hero>(this.heroesURL + this.params + '&nameStartsWith=' + input)
      .pipe(map((resp: Hero) => resp.data.results));
  }
}
