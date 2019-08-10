import { Component, OnInit } from '@angular/core';
import { flushMicrotasks } from '@angular/core/testing';
import { AppService } from '../app.service';
import { Faculty } from '../shared/faculty.model';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import { FormBuilder, Validators } from '@angular/forms';

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
  chartType = 'PieChart';
  f_form:any;

  constructor(private appService: AppService, private fb:FormBuilder) {
  }

  ngOnInit() {
    this.f_form = this.fb.group({
      empno:['', Validators.required],
      ename:['', Validators.required],
      dname:['', Validators.required],
      qualification:['', Validators.required]
    })
  }

  getSearchResult() {

    if (this.searchStr.trim().length > 0) {
      this.searchFaculty = this.appService.getSearchResult(this.searchStr);

    }
  }

  public pieChart: GoogleChartInterface = {
    chartType: this.chartType,
    dataTable: this.appService.getDeptCount(),
    //opt_firstRowIsData: true,
    options: { 'title': 'Faculties' },
  };

  getFacultyByDname(event: ChartSelectEvent) {

    let dname = event.selectedRowFormattedValues[0]
    const result = this.appService.getFacultyByDname(dname)
    this.chartResults = result;
  }


  
  changeChart() {
    const ccComponent = this.pieChart.component;
    const ccWrapper = ccComponent.wrapper;
    ccWrapper.setChartType(this.chartType);

    //force a redraw
    ccComponent.draw();
  }

  submitForm(){

    let faculty:Faculty = this.f_form.value;
    this.appService.addFaculty(faculty);
    this.f_form.reset();
  }

  get empno(){
    return this.f_form.get("empno")
  }

  get ename(){
    return this.f_form.get("ename")
  }

  get qualification(){
    return this.f_form.get("qualification")
  }

  get dname(){
    return this.f_form.get("dname")
  }
}


