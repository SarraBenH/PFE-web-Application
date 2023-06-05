import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
import { User } from 'src/app/models/user.model';
import { TpeService } from 'src/app/services/tpe.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tpe',
  templateUrl: './tpe.component.html',
  styleUrls: ['./tpe.component.scss']
})
export class TpeComponent implements OnInit {
  user :User ;
  constructor(private userService :UserService , private route: ActivatedRoute , private tpeService :TpeService  ,private http:HttpClient) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  selectedRows = [];
  selectedRowsIds = [];
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Last Trx Code', field: 'lastTrxCode' , resizable: true, minWidth: 140,  tooltipField: 'lastTrxCode', sortable: true, filter: true , editable : true},
		{headerName: 'Last Trx Type', field: 'lastTrxType' , resizable: true, minWidth: 140,  tooltipField: 'lastTrxType', sortable: true, filter: true , editable : true},
    {headerName: 'SPH Time Received', field: 'sphTimeReceived' , resizable: true, minWidth: 140,  tooltipField: 'sphTimeReceived', sortable: true, filter: true , editable : true},
		{headerName: 'SPH Atp Name', field: 'sphAtpName' , resizable: true, minWidth: 140,  tooltipField: 'sphAtpName', sortable: true, filter: true , editable : true},
		{headerName: 'SPH CARD ACCP ID CODE F042', field: 'sphCard' , resizable: true, minWidth: 140,  tooltipField: 'sphCard', sortable: true, filter: true , editable : true},
		{headerName: 'SPH MER CORP NAME', field: 'sphMer' , resizable: true, minWidth: 140,  tooltipField: 'sphMer', sortable: true, filter: true , editable : true},
		{headerName: 'SPH IS REVERSAL', field: 'sphIsREVERSAL' , resizable: true, minWidth: 140,  tooltipField: 'sphIsREVERSAL', sortable: true, filter: true , editable : true},

    {headerName: 'SPH Terminal Id', field: 'sphTerminalId' , resizable: true, minWidth: 140,  tooltipField: 'sphTerminalId', sortable: true, filter: true , editable : true},


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
    this.tpeService.getAllTpe().subscribe((result)=>{
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
 
    this.tpeService.updateTpe(event.data.id , event.data).subscribe() ;
    
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
deleteTpee(){
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
      this.tpeService.deleteTpeByIds(this.selectedRowsIds).subscribe(()=>{

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
          this.tpeService.getAllTpe().subscribe((result)=>{
            this.rowData = result ;
          })
        })
      }
      )

    }
  })
}
}
