import { Component, Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import { AppState, modState, dispatcher, ToDoItem } from '../shared/stateAndDispatcher';
import { Action, ToggleTodoAction } from '../shared/actions';

@Component({
    selector: 'app-todo-list',
    template: `
        <app-todo *ngFor="let t of filtered | async" 
                [text]="t.text" 
                [completed]="t.completed"
                [id]="t.id"
                (toggle)="emitToggle($event)">
        </app-todo>
    `
})
export class TodoListComponent {
    constructor(@Inject(modState) private state: Observable<AppState>,
                @Inject(dispatcher) private dispatcher: Observer<Action>) {
    }

    public get filtered() {
        return this.state.map(s => this.getVisibleTodos(s.todos, s.visibilityFilter));
    }

    public emitToggle(data) {
        const action: ToggleTodoAction = new ToggleTodoAction(data.id);
        this.dispatcher.next(action);
    }

    private getVisibleTodos(todoList: Array<ToDoItem>, visibilityFilter: string): Array<ToDoItem> {
        let items = [];
        todoList.forEach(item => {
            let ok = false;
            switch (visibilityFilter) {
                case 'SHOW_ALL':
                    ok = true;
                    break;
                case 'SHOW_ACTIVE':
                    ok = item.completed === false;
                    break;
                case 'SHOW_COMPLETED':
                    ok = item.completed === true;
                    break;
                default:
                    ok = false;
            }

            if (ok) {
                items.push(item);
            }
        });

        return items;
    }
}
