import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.css']
})
export class GridComponent {
  rowData: any;
  columnDefs: any;
  defaultColDef: any;

	ngOnInit() {
    this.rowData = [
        { name: "Task 1", start_date: "2023-05-29 06:00:00", end_date: "2023-06-20 06:00:00" },
        { name: "Task 2", start_date: "2023-05-30 06:00:00", end_date: "2023-06-21 06:00:00" },
        { name: "Task 3", start_date: "2023-05-31 06:00:00", end_date: "2023-06-22 06:00:00" },
        // Add more data as needed
    ];

    this.columnDefs = [
        { headerName: "Task Name", field: "name" },
        { headerName: "Start Date", field: "start_date" },
        { headerName: "End Date", field: "end_date" },
        // Add more columns as needed
    ];

    this.defaultColDef = {
        sortable: true,
        filter: true,
    };
}
}
