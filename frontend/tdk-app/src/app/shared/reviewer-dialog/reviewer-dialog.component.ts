import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reviewer } from '../../model/Reviewer';
@Component({
  selector: 'app-reviewer-dialog',
  templateUrl: './reviewer-dialog.component.html',
  styleUrls: ['./reviewer-dialog.component.css']
})
export class ReviewerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReviewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reviewer) { }
  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
