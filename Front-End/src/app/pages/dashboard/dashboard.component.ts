import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js';
import { UserService } from 'src/app/services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { multi, single } from './data';
import { TransactionService } from 'src/app/services/transaction.service';
import { GabService } from 'src/app/services/gab.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart1Values = [];
  chart2Values = [];
  chart3Values = [];
  chart4Values = [];
  chart5Values = [];

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  isDataLoaded = false;
  totalGabs;
  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    }
  ];

  view: any[] = [575, 400];
  view1: any[] = [900, 200];
  multi  = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },

    {
      "name": "France",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];

  //options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Gab status';
  showYAxisLabel = true;
  yAxisLabel = 'Number';

  // options line
  legend1: boolean = true;
  showLabels1: boolean = true;
  animations1: boolean = true;
  xAxis1: boolean = true;
  yAxis1: boolean = true;
  showYAxisLabel1: boolean = true;
  showXAxisLabel1: boolean = true;
  xAxisLabel1: string = 'Year';
  yAxisLabel1: string = 'Population';
  timeline1: boolean = true;

 // options pie
  gradient3: boolean = true;
  showLegend3: boolean = true;
  showLabels3: boolean = true;
  isDoughnut3: boolean = false;
  legendPosition3: string = 'below';

 chart1ColorScheme = {
    domain: ['#b3b2ad', '#f0ed92', '#f7b972', '#b572f7',"#bafca2","#aef1f5","#f5aeef"]
  };
  colorScheme = {
    domain: ['#f0ab3c', '#5AA454','#f5e042','#A10A28' ]
  };
constructor(private router :Router , private gabService:GabService, private transactionService: TransactionService, private userService :UserService, private route: ActivatedRoute ){

}

onSelect(event) {
  console.log(event);
}
onActivate(data): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

  ngOnInit() {
    const userId = localStorage.getItem("userId");

    if(userId !== null){
      this.userService.getUserById(userId).subscribe((result)=>{
        if(result !==null){
          this.userService.updateUserVariable(result.data)  ;
        }

      });

    }

    const transactionCount$ = this.transactionService.getTransactionCountForLastThreeMonths();
    const gabCount$ = this.gabService.getGabs();
    
    forkJoin([transactionCount$, gabCount$]).pipe(
      map(([transactionCountResult, gabCountResult]) => {
        // Process the transaction count result
        const transactionMap = new Map(Object.entries(transactionCountResult));
        const chart1Values = [];
        for (const key of transactionMap.keys()) {
          const value = {
            name: Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, Number(key) - 1)),
            value: transactionMap.get(key),
          };
          chart1Values.push(value);
        }
    
        // Process the GAB count result
        const countInMaintenance = gabCountResult.filter(gab => gab.etatGab === 'IN_MAINTENANCE').length;
        const countInService = gabCountResult.filter(gab => gab.etatGab === 'IN_SERVICE').length;
        const countOutOfService = gabCountResult.filter(gab => gab.etatGab === 'OUT_OF_SERVICE').length;
        const countFunctional = gabCountResult.filter(gab => gab.etatGab === 'FUNCTIONAL').length;
        this.totalGabs = countFunctional+countInMaintenance+countInService+countOutOfService;
        const chart2Values = [
          { name: 'In Maintenance', value: countInMaintenance },
          { name: 'In Service', value: countInService },
          { name: 'Functional', value: countFunctional },
          { name: 'Out of service', value: countOutOfService },
        ];
      
        // Return the final result
        return { chart1Values, chart2Values };
      })
    ).subscribe(result => {
      this.isDataLoaded = false;
      this.chart1Values = result.chart1Values
      this.chart2Values = result.chart2Values
      console.log(result)
    },()=>{},()=>{this.isDataLoaded = true});











  }

}
