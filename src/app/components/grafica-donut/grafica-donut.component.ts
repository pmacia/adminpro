import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-grafica-donut',
  templateUrl: './grafica-donut.component.html',
  styles: []
})
export class GraficaDonutComponent implements OnInit {

  @Input() leyend: string = 'Leyenda';
  @Input() labels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data: MultiDataSet = [];
  @Input() chartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
