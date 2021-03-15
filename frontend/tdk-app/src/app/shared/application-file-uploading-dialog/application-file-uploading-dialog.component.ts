import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { ApplicationFile } from '../../model/ApplicationFile';
import { TDKFile } from '../../model/TDKFile';
import { visibilities } from '../../model/Visibilities';

@Component({
  selector: 'app-application-file-uploading-dialog',
  templateUrl: './application-file-uploading-dialog.component.html',
  styleUrls: ['./application-file-uploading-dialog.component.css']
})
export class ApplicationFileUploadingDialogComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef; files = [];
  public uploader: FileUploader = new FileUploader({ url: '/api/upload', itemAlias: 'file' });
  constructor(
    public dialogRef: MatDialogRef<ApplicationFileUploadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationFile) { }
  ngOnInit(): void {
    this.data.tdkFile = new TDKFile();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.data.tdkFile.fileName = response;
      alert('Sikeres fájlfeltöltés!');
      this.data.tdkFile.visible = visibilities[0];
      this.data.tdkFile.date = new Date();
    };

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}