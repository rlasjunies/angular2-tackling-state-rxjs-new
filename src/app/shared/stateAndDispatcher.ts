import { OpaqueToken } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';

import { Action, ToggleTodoAction, SetVisibilityFilter, AddTodoAction } from './actions';

export class ToDoItem {
  constructor(public id: number, public text: string, public completed = false) {}
}

export class AppState {
  public todos: Array<ToDoItem>;
  public visibilityFilter;
  constructor() {}
}

export const modInitState = new OpaqueToken('initState');
export const dispatcher = new OpaqueToken('dispatcher');
export const modState = new OpaqueToken('state');

// this is what is actually injected in the app component when using 'providers: stateAndDispatcher'
export const stateAndDispatcher = [
  {
      provide: modInitState,
      useValue: {
        todos: [ // add some default values, ey?
                new ToDoItem(0, 'Eeny', false),
                new ToDoItem(1, 'Meeny', false),
                new ToDoItem(2, 'Miny', true),
                new ToDoItem(3, 'Moe', false),
                ],
        visibilityFilter: 'SHOW_ALL'
      }
  },
  {
      provide: dispatcher,
      useValue: new Subject<Action>()
  },
  {
      provide: modState,
      useFactory: stateFn,
      deps: [modInitState, dispatcher]
  }
];

function stateFn(initState: AppState, actions: Observable<Action>): Observable<AppState> {
  const combine = s => ({todos: s[0], visibilityFilter: s[1]});
  const appStateObs: Observable<AppState> =
    todos(initState.todos, actions)
        .zip(filter(initState.visibilityFilter, actions))
        .map(combine);
  return wrapIntoBehavior(initState, appStateObs);
}

function wrapIntoBehavior(init, obs) {
  const res = new BehaviorSubject(init);
  obs.subscribe(s => res.next(s));
  return res;
}

function todos(initState: any, actions: Observable<Action>): Observable<ToDoItem> {
    return actions.scan((state, action) => {
      if (action instanceof AddTodoAction) {
        const newTodo = {
          id: action.todoId,
          text: action.text,
          completed: false
        };
        return [...state, newTodo];
      } else {
        return state.map(t => updateTodo(t, action));
      }
    }, initState);
}

function updateTodo(todo: ToDoItem, action: Action): ToDoItem {
  if (action instanceof ToggleTodoAction) {
    return (action.id !== todo.id) ? todo : merge(todo, {completed: !todo.completed});
  } else {
    return todo;
  }
}

function filter(initState: string, actions: Observable<Action>): Observable<string> {
   return actions.scan((state, action) => {
     if (action instanceof SetVisibilityFilter) {
       return action.filter;
     } else {
       return state;
     }
   }, initState);
}

function merge(todo: ToDoItem, props: any): any {
  return Object.assign({}, todo, props);
}
