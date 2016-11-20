import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { stateAndDispatcher } from './shared/stateAndDispatcher';
import { FilterLinkComponent } from './filter-selector/filter-link';
import { FilterSelectorComponent } from './filter-selector/';
import { AddTodoComponent } from './add-todo/';
import { TodoListComponent } from './todo-list/';
import { TodoComponent } from './todo-list/todo';

@NgModule({
    declarations: [
        AppComponent,
        FilterLinkComponent,
        FilterSelectorComponent,
        AddTodoComponent,
        TodoComponent,
        TodoListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        stateAndDispatcher
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
