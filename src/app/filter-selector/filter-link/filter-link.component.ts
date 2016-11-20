import { Component, Inject, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { AppState, modState, dispatcher } from '../../shared';
import { Action, SetVisibilityFilter } from '../../shared/actions';

@Component({
    selector: 'app-filter-link',
    styles: [
      `
      div {
        cursor: pointer;
      }
      
      div:hover {
        font-weight: bold;
      }
      `
    ],
    template: `
        <div (click)="setVisibilityFilter()" [style.text-decoration]="textEffect | async"> {{ filter }} </div>
    `,
})
export class FilterLinkComponent {
  @Input() public filter: string;

  constructor(@Inject(dispatcher) private dispatcher: Observer<Action>,
              @Inject(modState) private state: Observable<AppState>) {
        // nothing to do here
    }

  public get textEffect() {
    return this.state.map(s =>
      s.visibilityFilter === this.filter ? 'underline' : 'none');
  }

  public setVisibilityFilter() {
    const action: SetVisibilityFilter = new SetVisibilityFilter(this.filter);

    this.dispatcher.next(action);
  }
}
