import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions, IServerSideGetRowsParams } from 'ag-grid-community';
import { BtnCustomComponent } from 'src/app/components/btn-custom/btn-custom.component';
import { User } from 'src/app/models/user.model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
user :User ;
  constructor(private userService :UserService , private route: ActivatedRoute , private transactionService :TransactionService) { }
  title = 'app';
  private gridApi;
  private gridColumnApi;
  gridOptions: GridOptions;
  rowModelType = 'serverSide'; // earlier it was like this -> rowModelType: 'serverSide';
  performance : number ;
  selectedRows = [];
  selectedRowsIds = [];
  private serverSideDatasource;

	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 140,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Credit card number', field: 'numeroCarte' , resizable: true, minWidth: 140,  tooltipField: 'numeroCarte', sortable: true, filter: true , editable : true},
		{headerName: 'BIN', field: 'bin', resizable: true, minWidth: 140,  tooltipField: 'bin', sortable: true, filter: true , editable : true },
		{headerName: 'Bank brand', field: 'enseigne' , resizable: true, minWidth: 140,  tooltipField: 'enseigne', sortable: true, filter: true , editable : true},
    {headerName: 'Operation date', field: 'dateOperation' , resizable: true, minWidth: 140,  tooltipField: 'dateOperation', sortable: true, filter: true , editable : true} ,
    {headerName: 'Operation status', field: 'statutOperation' , resizable: true, minWidth: 140,  tooltipField: 'statutOperation', sortable: true, filter: true , editable : true} ,
    {headerName: 'Transaction type', field: 'typeTransaction', resizable: true, minWidth: 140,  tooltipField: 'typeTransaction', sortable: true, filter: true , editable : true },

    {headerName: 'Operation type', field: 'typeOperation', resizable: true, minWidth: 140,  tooltipField: 'typeOperation', sortable: true, filter: true , editable : true },
    {headerName: 'Amount', field: 'montantOperation', resizable: true, minWidth: 140,  tooltipField: 'montantOperation', sortable: true, filter: true , editable : true },
    {headerName: 'Response Code', field: 'codeReponse', resizable: true, minWidth: 140,  tooltipField: 'codeReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Extended code response', field: 'extendedCodeReponse', resizable: true, minWidth: 140,  tooltipField: 'extendedCodeReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Extended message response', field: 'extendedMsgReponse', resizable: true, minWidth: 140,  tooltipField: 'extendedMsgReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Terminal code', field: 'codeTerminal', resizable: true, minWidth: 140,  tooltipField: 'codeTerminal', sortable: true, filter: true, editable : true },

    {headerName: 'Affiliate code', field: 'codeAffilie', resizable: true, minWidth: 140,  tooltipField: 'codeAffilie', sortable: true, filter: true, editable : true },

    {headerName: 'Country', field: 'pays', resizable: true, minWidth: 140,  tooltipField: 'pays', sortable: true, filter: true, editable : true },
    {headerName: 'MCC', field: 'mcc', resizable: true, minWidth: 140,  tooltipField: 'mcc', sortable: true, filter: true, editable : true },



	];
  frameworkComponents = {
    BtnCellRenderer: BtnCustomComponent,
  };

  ngOnInit() {
    this.gridOptions = {
      rowMultiSelectWithClick:true,
      rowSelection:"multiple",
      pagination:true,
      paginationPageSize:20,
      columnDefs: this.columnDefs,
      rowModelType: 'serverSide',
      serverSideDatasource: this.serverSideDatasource,
    };
    const userId = this.route.snapshot.paramMap.get('id');

    if(userId !== null){
      this.userService.getUserById(userId).subscribe((result)=>{
        if(result !==null){
          this.userService.updateUserVariable(result.data)  ;
        }
       
      });
    }
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
    this.transactionService.updateTransaction(event.data.id , event.data).subscribe() ;

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
    this.serverSideDatasource = {
      getRows: (params: IServerSideGetRowsParams) => {
        let pageNumber = this.gridApi.paginationGetCurrentPage()
        if(pageNumber === 0){
          this.transactionService.getAllTransactions(0,20)
          .subscribe((response) => {
            const rowsThisPage = response['response'];
            const lastRow = response['totalRows'];

            params.successCallback(rowsThisPage, lastRow);
          });
        }
        
      },
    };

    this.gridApi.setServerSideDatasource(this.serverSideDatasource);
  }

  onBtnExport(): void {
    const params = { suppressQuotes:  true };
    this.gridApi.exportDataAsCsv(params);
  
}


loadPage (pageNumber){
  this.serverSideDatasource = {
    getRows: (params: IServerSideGetRowsParams) => {
      const startRow = params.request.startRow;
      const endRow = params.request.endRow;

      this.transactionService.getAllTransactions(pageNumber,20)
        .subscribe((response) => {
          const rowsThisPage = response['response'];
          const lastRow = response['totalRows'];

          params.successCallback(rowsThisPage, lastRow);
        });
    },
  };
  this.gridApi.setServerSideDatasource(this.serverSideDatasource);

}

deleteTransactions(){
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
      this.transactionService.deleteTransactionsByIds(this.selectedRowsIds).subscribe(()=>{

      } ,
      ()=>{

      },
      ()=>{
        Swal.fire(
          'Deleted!',
          'transactions has been deleted successfully.',
          'success'
        )
        .then(()=>{
         
        })
      }
      )    
     
    }
  })
}
}



