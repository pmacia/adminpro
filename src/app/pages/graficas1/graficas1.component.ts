import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  public leyendaA: string = 'Leyenda A';
  public doughnutChartLabelsA: Label[] = ['A', 'B', 'C'];
  public doughnutChartDataA: MultiDataSet = [
    [250, 130, 70],
    [50, 150, 120],
    [350, 450, 100],
  ];

  public leyendaB: string = 'Leyenda B';
  public doughnutChartLabelsB: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartDataB: MultiDataSet = [
    [350, 450, 10],
    [50, 150, 220],
    [250, 130, 70],
  ];

  public leyendaC: string = 'Leyenda C';
  public doughnutChartLabelsC: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartDataC: MultiDataSet = [
    [50, 150, 120],
    [250, 130, 70],
    [300, 450, 500],
  ];

  public leyendaD: string = 'Leyenda D';
  public doughnutChartLabelsD: Label[] = ['tag 1', 'tag 2', 'tag 3', 'tag 4'];
  public doughnutChartDataD: MultiDataSet = [
    [150, 150, 120, 400],
    [250, 130, 70, 205],
    [750, 450, 200, 5],
  ];

  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
