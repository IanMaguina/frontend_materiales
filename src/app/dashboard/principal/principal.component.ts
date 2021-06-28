import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})


export class PrincipalComponent implements OnInit {
  mySubscription: any;
  reload: Boolean = true;

  userInfo: any;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true, maintainAspectRatio: false
  };
  
  public pieChartLabels: Label[] = [['#', 'aprobadas'], ['#', 'pendientes']];
  public pieChartData: SingleDataSet = [2, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {
    this.userInfo = autenticacionService.getUserInfo();
    
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
        /*     if (this.reload) {
          console.log('entro');
          this.reload = false;
          
          this.reloadCurrentRoute();
        } */

  }

  ngOnInit(): void {
    //this.reloadCurrentRoute();
   // console.log("usuario => " + JSON.stringify(this.userInfo));
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
