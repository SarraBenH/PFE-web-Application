import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
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
  constructor(private userService :UserService , private route: ActivatedRoute , private gabService :GabService) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  performance : number ;
  nbGabOutOfService =0 ;
  selectedRows = [];
  selectedRowsIds = [];
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Identifiant', field: 'identifiant' , resizable: true, minWidth: 140,  tooltipField: 'identifiant', sortable: true, filter: true , editable : true},
		{headerName: 'Etat Service', field: 'etatService', resizable: true, minWidth: 140,  tooltipField: 'etatService', sortable: true, filter: true , editable : true },
		{headerName: 'Enseigne', field: 'enseigne' , resizable: true, minWidth: 140,  tooltipField: 'enseigne', sortable: true, filter: true , editable : true},
    {headerName: 'Etat Gab', field: 'etatGab' , resizable: true, minWidth: 140,  tooltipField: 'etatGab', sortable: true, filter: true , cellRenderer : 'BtnCellRenderer'} ,
    {headerName: 'Etat K7', field: 'etatK7', resizable: true, minWidth: 140,  tooltipField: 'etatK7', sortable: true, filter: true , editable : true },
    {headerName: 'JDAB', field: 'jdab', resizable: true, minWidth: 140,  tooltipField: 'jdab', sortable: true, filter: true , editable : true },
    {headerName: 'Etat Communication', field: 'etatCommunication', resizable: true, minWidth: 140,  tooltipField: 'etatCommunication', sortable: true, filter: true, editable : true },
    {headerName: 'Etat Keys', field: 'etatKeys', resizable: true, minWidth: 140,  tooltipField: 'etatKeys', sortable: true, filter: true, editable : true },

	];
  frameworkComponents = {
    BtnCellRenderer: BtnCustomComponent,
  };

	rowData = [



	];
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');

    if(userId !== null){
      this.userService.getUserById(userId).subscribe((result)=>{
        if(result !==null){
          this.userService.updateUserVariable(result.data)  ;
        }

      });
    }
    this.gabService.getGabs().subscribe((result)=>{
      this.rowData = result ;
      let nbGabsInService = result.filter((gab)=> gab.etatGab == 'IN_SERVICE').length ;
      this.performance = (nbGabsInService / result.length) *100 ;
      this.nbGabOutOfService = result.filter((gab)=> gab.etatGab == 'OUT_OF_SERVICE').length ;


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
    console.log(event.data);
    this.gabService.updateGab(event.data.id , event.data).subscribe() ;

  }
  onCellEditingStarted(event){

  }
  onGridReady(params){
    console.log(params)
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
            let nbGabsInService = result.filter((gab)=> gab.etatGab == 'IN_SERVICE').length ;
            this.performance = (nbGabsInService / result.length) *100 ;
            this.nbGabOutOfService = result.filter((gab)=> gab.etatGab == 'OUT_OF_SERVICE').length ;

          })
        })
      }
      )

    }
  })
}
}

