import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit{  
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  public searchTerm: Subject<string> = new Subject();

  input: string = '';

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.searchTerm.pipe(
      debounceTime(300)
    ).subscribe((value) =>{
      this.onDebounce.emit(value);
    })
  }

  public search() {
    this.searchTerm.next(this.input);
  }
}
