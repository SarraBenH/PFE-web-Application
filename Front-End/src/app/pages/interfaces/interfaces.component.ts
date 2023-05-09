import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
import { User } from 'src/app/models/user.model';
import { InterfaceService } from 'src/app/services/interface.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.scss']
})
export class InterfacesComponent implements OnInit {
user :User ;
  constructor(private userService :UserService , private route: ActivatedRoute , private interfaceService :InterfaceService) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  selectedRows = [];
  selectedRowsIds = [];
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
    {headerName: 'Interface Code', field: 'intCode' , resizable: true, minWidth: 140,  tooltipField: 'intCode', sortable: true, filter: true , editable : true},
		{headerName: 'Interface Identifiant', field: 'intIden', resizable: true, minWidth: 140,  tooltipField: 'intIden', sortable: true, filter: true , editable : true },
		{headerName: 'Interface Port', field: 'intPrimPort' , resizable: true, minWidth: 140,  tooltipField: 'intPrimPort', sortable: true, filter: true , editable : true},
    {headerName: 'Interface Address IP', field: 'intPrimAdre', resizable: true, minWidth: 140,  tooltipField: 'intPrimAdre', sortable: true, filter: true, editable : true },
    {headerName: 'Status', field: 'status', resizable: true, minWidth: 140,  tooltipField: 'status', sortable: true, filter: true, editable : true },
    {headerName: 'Interface Label', field: 'intLabe', resizable: true, minWidth: 140,  tooltipField: 'intLabe', sortable: true, filter: true, editable : true },
   // {headerName: 'Interface Label', field: 'etatGab' , resizable: true, minWidth: 150,  tooltipField: 'etatGab', sortable: true, filter: true , cellRenderer : 'BtnCellRenderer'} ,
  
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
    this.interfaceService.getInterfaces().subscribe((result)=>{
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
    this.interfaceService.updateInterface(event.data.id , event.data).subscribe() ;

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
deleteInterfaces(){
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
      this.interfaceService.deleteInterfacesByIds(this.selectedRowsIds).subscribe(()=>{

      } ,
      ()=>{

      },
      ()=>{
        Swal.fire(
          'Deleted!',
          'Interfaces has been deleted successfully.',
          'success'
        )
        .then(()=>{
          this.interfaceService.getInterfaces().subscribe((result)=>{
            this.rowData = result ;
          })
        })
      }
      )

    }
  })
}
}

