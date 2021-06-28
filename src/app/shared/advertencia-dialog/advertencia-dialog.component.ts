import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-advertencia-dialog',
  templateUrl: './advertencia-dialog.component.html',
  styleUrls: ['./advertencia-dialog.component.css']
})
export class AdvertenciaDialogComponent implements OnInit {
  mensaje:any;
  constructor(public dialogRef: MatDialogRef<AdvertenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
    ) { 
      this.mensaje=data;

    }

  ngOnInit(): void {
  }

  confirmar(res:any): void {
    
      this.dialogRef.close(res);
    
  }
}
