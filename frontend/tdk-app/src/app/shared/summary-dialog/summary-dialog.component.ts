import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
@Component({
  selector: 'app-summary-dialog',
  templateUrl: './summary-dialog.component.html',
  styleUrls: ['./summary-dialog.component.css']
})
export class SummaryDialogComponent implements OnInit {
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  constructor(
    public dialogRef: MatDialogRef<SummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string, private _ngZone: NgZone) { }

  ngOnInit(): void {

  }


  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}


