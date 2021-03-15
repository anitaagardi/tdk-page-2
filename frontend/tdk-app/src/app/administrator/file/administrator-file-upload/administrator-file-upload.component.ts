import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TDKFile } from 'src/app/model/TDKFile';
import { visibilities } from 'src/app/model/Visibilities';
import { TDKFileService } from 'src/app/services/tdk-file.service';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-administrator-file-upload',
  templateUrl: './administrator-file-upload.component.html',
  styleUrls: ['./administrator-file-upload.component.css']
})
export class AdministratorFileUploadComponent implements OnInit {
  @ViewChild('fileUploadForm', { static: false, read: ElementRef }) fileUploadForm: ElementRef;
  tdkFile: TDKFile = new TDKFile();
  public uploader: FileUploader = new FileUploader({ url: '/api/upload', itemAlias: 'file' });
  constructor(private tdkFileService: TDKFileService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any) => {
      this.tdkFile.fileName = response;
      alert('Sikeres fájlfeltöltés!');
    };
  }
  fileUploadFunction() {

    this.tdkFile.visible = visibilities[0];
    this.tdkFile.date = new Date();
    let conf = confirm("Biztos, hogy szeretné feltölteni a fájlt?");
    if (conf) {
      this.tdkFileService.addTDKFile(this.tdkFile).subscribe(() => {
        alert("A fájl feltöltése sikeres");
        this.tdkFile = new TDKFile();
        this.fileUploadForm.nativeElement.reset();
      }, () => {
        alert("Hiba történt a fájl felöltése során");
      }
      );
    }
  }
}
