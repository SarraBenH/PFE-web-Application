import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
import { User } from 'src/app/models/user.model';
import { CassetteService } from 'src/app/services/cassette.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cassette',
  templateUrl: './cassette.component.html',
  styleUrls: ['./cassette.component.scss']
})
export class CassetteComponent implements OnInit {
  user :User ;
  constructor(private userService :UserService , private route: ActivatedRoute , private cassetteService :CassetteService  ,private http:HttpClient) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  selectedRows = [];
  selectedRowsIds = [];
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Enseigne Gab', field: 'enseigneGab' , resizable: true, minWidth: 140,  tooltipField: 'enseigneGab', sortable: true, filter: true , editable : true},
		{headerName: 'Total Coffret', field: 'totalCoffre' , resizable: true, minWidth: 140,  tooltipField: 'totalCoffre', sortable: true, filter: true , editable : true},
    {headerName: 'Last Date charged', field: 'lastDateCharged', resizable: true, minWidth: 140,  tooltipField: 'lastDateCharged', sortable: true, filter: true, editable : true },
    {headerName: 'Amount Billed', field: 'montantCharged' , resizable: true, minWidth: 150,  tooltipField: 'montantCharged', sortable: true, filter: true , editable : true} ,
    {headerName: 'Amount Discharged', field: 'montantDecharged', resizable: true, minWidth: 140,  tooltipField: 'montantDecharged', sortable: true, filter: true, editable : true },
    {headerName: 'k71 value', field: 'valeurk71', resizable: true, minWidth: 140,  tooltipField: 'valeurk71', sortable: true, filter: true , editable : true },
    {headerName: 'k72 value', field: 'valeurK72', resizable: true, minWidth: 140,  tooltipField: 'valeurK72', sortable: true, filter: true , editable : true },
    {headerName: 'k73 value', field: 'valeurK73', resizable: true, minWidth: 140,  tooltipField: 'valeurK73', sortable: true, filter: true , editable : true },
    {headerName: 'k74 value', field: 'valeurK74', resizable: true, minWidth: 140,  tooltipField: 'valeurK74', sortable: true, filter: true , editable : true },
   
    {headerName: 'Solde K71', field: 'soldeK71', resizable: true, minWidth: 140,  tooltipField: 'soldeK71', sortable: true, filter: true , editable : true },
    {headerName: 'Solde K72', field: 'soldeK72', resizable: true, minWidth: 140,  tooltipField: 'soldeK72', sortable: true, filter: true , editable : true },
    {headerName: 'Solde K73', field: 'soldeK73', resizable: true, minWidth: 140,  tooltipField: 'soldeK73', sortable: true, filter: true , editable : true },
    {headerName: 'Solde K74', field: 'soldeK74', resizable: true, minWidth: 140,  tooltipField: 'soldeK74', sortable: true, filter: true , editable : true },


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
    this.cassetteService.getCassette().subscribe((result)=>{
      this.rowData = result ;
    
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
 
    this.cassetteService.updateCassette(event.data.id , event.data).subscribe() ;
    
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
deleteCassette(){
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
      this.cassetteService.deleteCassetteByIds(this.selectedRowsIds).subscribe(()=>{

      } ,
      ()=>{

      },
      ()=>{
        Swal.fire(
          'Deleted!',
          'Cassette has been deleted successfully.',
          'success'
        )
        .then(()=>{
          this.cassetteService.getCassette().subscribe((result)=>{
            this.rowData = result ;
          })
        })
      }
      )

    }
  })
}
}
