import { Application } from './Application';
import { ApplicationFile } from './ApplicationFile';
import { ThesisFile } from './ThesisFile';

export class ListComponent {
    position: number;
    thesisFiles: ThesisFile[] = [];
    applicationFiles: ApplicationFile[] = [];
    application: Application;
}