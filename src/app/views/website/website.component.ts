import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MyDialogComponent } from './my-dialog.component';
@Component({
//   selector: 'app-dashboard',
  templateUrl: 'website.component.html'
})
export class WebsiteComponent { 
  constructor(public dialog: MatDialog){
    

  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: 1,
    title: 'Angular For Beginners'
    };
    const dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog was closed' )
    console.log(result)
    });
    }
}
