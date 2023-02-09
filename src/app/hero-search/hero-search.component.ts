import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html'
})
export class HeroSearchComponent implements OnInit{  
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  public searchTerm: Subject<string> = new Subject();

  input: string = '';

  constructor() {}

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
