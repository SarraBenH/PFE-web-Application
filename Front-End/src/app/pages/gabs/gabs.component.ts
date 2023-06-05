import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
import { Gab } from 'src/app/models/gab.model';
import { User } from 'src/app/models/user.model';
import { GabService } from 'src/app/services/gab.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gabs',
  templateUrl: './gabs.component.html',
  styleUrls: ['./gabs.component.scss']
})
export class GabsComponent implements OnInit {
user :User ;
  constructor(private userService :UserService , private route: ActivatedRoute , private gabService :GabService  ,private http:HttpClient) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  performance : number ;
  mostSuccessfulCity="Calculating...";
  mostSuccessfulCityValue=0;
  worstCity="Calculating...";
  worstCityValue=0;
  nbGabOutOfService =0 ;
  selectedRows = [];
  selectedRowsIds = [];
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Identifiant', field: 'identifiant' , resizable: true, minWidth: 140,  tooltipField: 'identifiant', sortable: true, filter: true , editable : true},
		{headerName: 'Enseigne', field: 'enseigne' , resizable: true, minWidth: 140,  tooltipField: 'enseigne', sortable: true, filter: true , editable : true},
    {headerName: 'Address', field: 'address', resizable: true, minWidth: 140,  tooltipField: 'address', sortable: true, filter: true, editable : true },
    {headerName: 'Statut Gab', field: 'statutGab' , resizable: true, minWidth: 150,  tooltipField: 'statutGab', sortable: true, filter: true , cellRenderer : 'BtnCellRenderer' , editable : true} ,
    {headerName: 'Etat Suppl Journal', field: 'etatSuppJournal', resizable: true, minWidth: 140,  tooltipField: 'etatSuppJournal', sortable: true, filter: true, editable : true },
    {headerName: 'Etat Hard Journal', field: 'jdab', resizable: true, minWidth: 140,  tooltipField: 'jdab', sortable: true, filter: true , editable : true },
    {headerName: 'Etat Communication', field: 'etatCommunication', resizable: true, minWidth: 140,  tooltipField: 'etatCommunication', sortable: true, filter: true, editable : true },
    {headerName: 'City', field: 'city', resizable: true, minWidth: 140,  tooltipField: 'city', sortable: true, filter: true, editable : true },

	];
  frameworkComponents = {
    BtnCellRenderer: BtnCustomComponent,
  };

	rowData = [



	];
  ngOnInit() {
    const userId = localStorage.getItem("userId");

    if(userId !== null){
      this.userService.getUserById(userId).subscribe((result)=>{
        if(result !==null){
          this.userService.updateUserVariable(result.data)  ;
        }

      });
    }
    this.gabService.getGabs().subscribe((result)=>{
      this.rowData = result ;
      let nbGabsInService = result.filter((gab)=> gab.statutGab == '1').length ;
      this.performance = (nbGabsInService / result.length) *100 ;
      this.nbGabOutOfService = result.filter((gab)=> gab.statutGab == '2').length ;


    })

    this.gabService.getMostSuccessfulCity().subscribe((result)=>{
      if(result){
        this.mostSuccessfulCity = result[0].city;
        this.mostSuccessfulCityValue = result[0].count
      }
    })
    this.gabService.getWorstCity().subscribe((result)=>{
      if(result){
        this.worstCity = result[0].city;
        this.worstCityValue = result[0].count
      }
    })
  }
  selectionChanged(event){
    this.selectedRowsIds = [];
    this.selectedRows = event.api.getSelectedRows() ;
    this.selectedRows.forEach(elt => {
      this.selectedRowsIds.push(elt.id);
    });
    }
  onCellEditingStopped(event){
    this.gabService.updateGab(event.data.id , event.data).subscribe(()=>{},()=>{},()=>{
      this.gabService.getGabs().subscribe((result)=>{
        this.rowData = result ;
        let nbGabsInService = result.filter((gab)=> gab.statutGab == '1').length ;
        this.performance = (nbGabsInService / result.length) *100 ;
        this.nbGabOutOfService = result.filter((gab)=> gab.statutGab == '2').length ;

      })
    }
    )
    ;

  }
  onCellEditingStarted(event){

  }
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
    params.api.sizeColumnsToFit();

  }

  onBtnExport(): void {
    const params = { suppressQuotes:  true };
    this.gridApi.exportDataAsCsv(params);

}

deleteGabs(){
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.gabService.deleteGabsByIds(this.selectedRowsIds).subscribe(()=>{

      } ,
      ()=>{

      },
      ()=>{
        Swal.fire(
          'Deleted!',
          'Gabs has been deleted successfully.',
          'success'
        )
        .then(()=>{
          this.gabService.getGabs().subscribe((result)=>{
            this.rowData = result ;
            let nbGabsInService = result.filter((gab)=> gab.statutGab == '1').length ;
            this.performance = (nbGabsInService / result.length) *100 ;
            this.nbGabOutOfService = result.filter((gab)=> gab.statutGab == '2').length ;

          })
        })
      }
      )

    }
  })
}


}



