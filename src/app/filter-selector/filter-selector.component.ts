import { Component } from '@angular/core';

@Component({
    selector: 'app-filter-selector',
    template: `
        <app-filter-link filter="SHOW_ALL">All</app-filter-link>
        <app-filter-link filter="SHOW_ACTIVE">Active</app-filter-link>
        <app-filter-link filter="SHOW_COMPLETED">Completed</app-filter-link>
    `
})
export class FilterSelectorComponent {
    constructor() {
        // nothing to do here
    }
}
