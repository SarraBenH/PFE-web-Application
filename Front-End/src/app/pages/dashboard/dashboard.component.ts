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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  chart1Values = [];
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  isDataLoaded = false;
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
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
constructor(private router :Router , private transactionService: TransactionService, private userService :UserService, private route: ActivatedRoute ){

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

    this.transactionService.getTransactionCountForLastThreeMonths().subscribe((result)=>{
        this.isDataLoaded = false;
        if(result!== null){
          const map = new Map(Object.entries(result));   
          let array =[]; 
          for (const key of map.keys()) {            
            let value = {

              "name": Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(2000, Number(key) - 1)),
              "value": map.get(key)
            }  
            array.push(value);       
          }
          this.chart1Values = array;
        }

    },()=>{},()=>{this.isDataLoaded=true})













  }

}
