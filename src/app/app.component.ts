import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppState, stateAndDispatcher, modState } from './shared/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: stateAndDispatcher,
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(@Inject(modState) private state: Observable<AppState>) {
    // nothing to do here
  }
}
