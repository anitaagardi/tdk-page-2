import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FILE_URL } from 'src/app/constants';
import { TDKFile } from 'src/app/model/TDKFile';
import { TDKFileService } from 'src/app/services/tdk-file.service';


@Component({
  selector: 'app-administrator-file-lists',
  templateUrl: './administrator-file-lists.component.html',
  styleUrls: ['./administrator-file-lists.component.css']
})
export class AdministratorFileListsComponent implements OnInit {
  tdkFiles: TDKFile[] = [];
  fileUrl = FILE_URL;
  displayedColumns: string[] = ['fileName', 'date', 'url'];
  dataSource = new MatTableDataSource(this.tdkFiles);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private tdkFileService: TDKFileService) { }

  ngOnInit() {
    this.getTDKFiles();
  }
  getTDKFiles() {
    this.tdkFileService.getAllTDKFile().subscribe(tdkFiles => {
      this.tdkFiles = tdkFiles.reverse();
      this.dataSource.paginator = this.paginator;
      this.dataSource = new MatTableDataSource(this.tdkFiles);
    }, () => {

    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === undefined) return [];
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
