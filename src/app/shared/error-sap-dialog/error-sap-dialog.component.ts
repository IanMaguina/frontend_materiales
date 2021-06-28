import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-sap-dialog',
  templateUrl: './error-sap-dialog.component.html',
  styleUrls: ['./error-sap-dialog.component.css']
})
export class ErrorSapDialogComponent implements OnInit {
  error:any;
  constructor(public dialogRef: MatDialogRef<ErrorSapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    ) { 
      this.error = data;

    }

  ngOnInit(): void {
  }
  confirmar(res:any): void {
    
    this.dialogRef.close();
  
}

}
