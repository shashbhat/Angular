import { Component, OnInit } from '@angular/core';
import { flushMicrotasks } from '@angular/core/testing';
import { AppService } from '../app.service';
import { Faculty } from '../shared/faculty.model';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})


export class FacultyComponent implements OnInit {
  searchStr: ""

  searchFaculty: Faculty[] = [];
  f_dname_list: Faculty[] = [];
  chartResults: Faculty[] = [];
  constructor(private appService: AppService) {
  }

  ngOnInit() {
  }

  getSearchResult() {

    if (this.searchStr.trim().length > 0) {
      this.searchFaculty = this.appService.getSearchResult(this.searchStr);

    }
  }

  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable: this.appService.getDeptCount(),
    //opt_firstRowIsData: true,
    options: { 'title': 'Faculties' },
  };

  getFacultyByDname(event: ChartSelectEvent) {

    let dname = event.selectedRowFormattedValues[0]
    const result = this.appService.getFacultyByDname(dname)
    this.chartResults = result;
  }

}


