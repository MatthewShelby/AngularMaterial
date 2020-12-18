import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-stop-dialog',
  templateUrl: './stop-dialog.component.html',
  styleUrls: ['./stop-dialog.component.css']
})
export class StopDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
    //console.log('StopDialogComponent constructor been Called!! ');
  }




  ngOnInit(): void {
  }

}
