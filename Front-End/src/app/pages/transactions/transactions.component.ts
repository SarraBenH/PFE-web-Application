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
  constructor(private userService :UserService , private route: ActivatedRoute , private transactionService :TransactionService) {

  }
  private gridApi;
  private gridColumnApi;
  gridOptions: GridOptions;
  performance : number ;
  selectedRows = [];
  rowData: any[];
  selectedRowsIds = [];
  pageSize =1000;
	columnDefs = [
    {headerName: 'id', field: 'id' , resizable: true, minWidth: 200,  tooltipField: 'id', sortable: true, filter: true , hide: true,suppressToolPanel: true} ,
		{headerName: 'Credit card number', field: 'numeroCarte' , resizable: true, minWidth: 200,  tooltipField: 'numeroCarte', sortable: true, filter: true , editable : true},
		{headerName: 'BIN', field: 'bin', resizable: true, minWidth: 200,  tooltipField: 'bin', sortable: true, filter: true , editable : true },
		{headerName: 'Bank brand', field: 'enseigne' , resizable: true, minWidth: 200,  tooltipField: 'enseigne', sortable: true, filter: true , editable : true},
    {headerName: 'Operation date', field: 'dateOperation' , resizable: true, minWidth: 200,  tooltipField: 'dateOperation', sortable: true, filter: true , editable : true} ,
    {headerName: 'Operation status', field: 'statutOperation' , resizable: true, minWidth: 200,  tooltipField: 'statutOperation', sortable: true, filter: true , editable : true} ,
    {headerName: 'Transaction type', field: 'typeTransaction', resizable: true, minWidth: 200,  tooltipField: 'typeTransaction', sortable: true, filter: true , editable : true },

    {headerName: 'Operation type', field: 'typeOperation', resizable: true, minWidth: 200,  tooltipField: 'typeOperation', sortable: true, filter: true , editable : true },
    {headerName: 'Amount', field: 'montantOperation', resizable: true, minWidth: 200,  tooltipField: 'montantOperation', sortable: true, filter: true , editable : true },
    {headerName: 'Response Code', field: 'codeReponse', resizable: true, minWidth: 200,  tooltipField: 'codeReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Extended code response', field: 'extendedCodeReponse', resizable: true, minWidth: 200,  tooltipField: 'extendedCodeReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Extended message response', field: 'extendedMsgReponse', resizable: true, minWidth: 200,  tooltipField: 'extendedMsgReponse', sortable: true, filter: true, editable : true },
    {headerName: 'Terminal code', field: 'codeTerminal', resizable: true, minWidth: 200,  tooltipField: 'codeTerminal', sortable: true, filter: true, editable : true },

    {headerName: 'Affiliate code', field: 'codeAffilie', resizable: true, minWidth: 200,  tooltipField: 'codeAffilie', sortable: true, filter: true, editable : true },

    {headerName: 'Country', field: 'pays', resizable: true, minWidth: 200,  tooltipField: 'pays', sortable: true, filter: true, editable : true },
    {headerName: 'MCC', field: 'mcc', resizable: true, minWidth: 200,  tooltipField: 'mcc', sortable: true, filter: true, editable : true },



	];
  frameworkComponents = {
    BtnCellRenderer: BtnCustomComponent,
  };

  ngOnInit() {
    this.gridOptions = {
      rowMultiSelectWithClick:true,
      rowSelection:"multiple",
      pagination:true,
      paginationPageSize:1000,
      columnDefs: this.columnDefs,
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
    this.getPageTransactions(0);

   }

// Function to retrieve transactions for a specific page
getPageTransactions(pageNumber: number) {
  this.gridApi.showLoadingOverlay();
  const startIndex = pageNumber * this.pageSize;
  this.transactionService.getAllTransactions(pageNumber, this.pageSize).subscribe((response) => {
    const data = response['response'];
    const total = response['totalRows']
    let rowData: any[] = Array(total).fill({});
    rowData.splice(startIndex, this.pageSize, ...data);
    this.rowData = rowData
  },()=>{},()=>{this.gridApi.hideOverlay();}
  );
}

// Function to handle pagination events from the grid
onPaginationChanged(event: any) {
 if(event.newPage){
  let currentPageNumber = this.gridApi.paginationGetCurrentPage();
  this.getPageTransactions(currentPageNumber)
 }
}

  onBtnExport(): void {
    let currentPageNumber = this.gridApi.paginationGetCurrentPage();
    const startIndex = currentPageNumber * this.pageSize;
    const params = { suppressQuotes:  true , rowPosition: { start: 0, end: 999 }

    };
    this.gridApi.exportDataAsCsv(params);

}

deleteTransactions(){
  console.log('test')
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



