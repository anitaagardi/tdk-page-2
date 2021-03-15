import { TDKFile } from './TDKFile';

export class PhotoGallery {
    _id: string;
    name: string;
    tdkFiles: TDKFile[] = [];
    constructor(photoGallery: any) {
        this._id = photoGallery._id;
        this.name = photoGallery.name;
        if (photoGallery.tdkFiles) {
            this.tdkFiles = [];
            for (let i = 0; i < photoGallery.tdkFiles.length; i++) {
                this.tdkFiles.push(new TDKFile(photoGallery.tdkFiles[i]));
            }
        }
    }
}