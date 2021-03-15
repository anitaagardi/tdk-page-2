import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import 'node_modules/hammerjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { UserRegistrationComponent } from './user/registration/user-registration/user-registration.component';
import { UserLoginComponent } from './user/login/user-login/user-login.component';
import { UserForgottenPasswordComponent } from './user/password/user-forgotten-password/user-forgotten-password.component';
import { UserAppylingTdkComponent } from './user/application/user-appyling-tdk/user-appyling-tdk.component';
import { UserChangePasswordComponent } from './user/password/user-change-password/user-change-password.component';
import { UserFileUpploadComponent } from './user/file/user-file-uppload/user-file-uppload.component';
import { UserFileListComponent } from './user/file/user-file-list/user-file-list.component';
import { AdministratorMenuEditComponent } from './administrator/menu/administrator-menu-edit/administrator-menu-edit.component';
import { AdministratorMenuCreateComponent } from './administrator/menu/administrator-menu-create/administrator-menu-create.component';
import { AdministratorMenuElementListComponent } from './administrator/menu-element/administrator-menu-element-list/administrator-menu-element-list.component';
import { AdministratorMenuElementCreateComponent } from './administrator/menu-element/administrator-menu-element-create/administrator-menu-element-create.component';
import { AdministratorUsersComponent } from './administrator/users/administrator-users/administrator-users.component';
import { UserApplyingTdkPrintComponent } from './user/application/user-applying-tdk-print/user-applying-tdk-print.component';
import { UserService } from './services/user.service';
import { ApplicationService } from './services/application.service';
import { ExcelService } from './services/excel.service';
import { ConferenceService } from './services/conference.service';
import { TDKFileService } from './services/tdk-file.service';
import { ThesisFileService } from './services/thesis-file.service';
import { MenuService } from './services/menu.service';
import { MenuElementService } from './services/menu-element.service';
import { AuthenticationService } from './services/authentication.service';

import { UserResolverService } from './services/user.resolver';
import { MenuResolverService } from './services/menu.resolver';
import { NewsComponent } from './shared/news/news.component';
import { ReviewerDialogComponent } from './shared/reviewer-dialog/reviewer-dialog.component';
import { UserApplicationsListComponent } from './user/application/user-applications-list/user-applications-list.component';
import { BaseComponent } from './shared/base/base.component';
import { AdministratorMenuElementModifyComponent } from './administrator/menu-element/administrator-menu-element-modify/administrator-menu-element-modify.component';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from 'ng2-file-upload';
import { AdministratorPhotoGalleryCreateComponent } from './administrator/photo-gallery/administrator-photo-gallery-create/administrator-photo-gallery-create.component';
import { AdministratorPhotoGalleryListComponent } from './administrator/photo-gallery/administrator-photo-gallery-list/administrator-photo-gallery-list.component';
import { AdministratorPhotoGalleryModifyComponent } from './administrator/photo-gallery/administrator-photo-gallery-modify/administrator-photo-gallery-modify.component';
import { PhotoGalleryComponent } from './shared/photo-gallery/photo-gallery.component';
import { PhotoGalleryService } from './services/photo-gallery.service';
import { NgxGalleryModule } from 'ngx-gallery';
import { AutosizeModule } from 'ngx-autosize';
import { SummaryDialogComponent } from './shared/summary-dialog/summary-dialog.component';
import { UserFileApplicationUploadComponent } from './user/file/user-file-application-upload/user-file-application-upload.component';
import { UserFileApplicationListComponent } from './user/file/user-file-application-list/user-file-application-list.component';
import { ApplicationFileService } from './services/application-file.service';
import { AdministratorTypeOfSpecializationCreateComponent } from './administrator/type-of-specialization/administrator-type-of-specialization-create/administrator-type-of-specialization-create.component';
import { AdministratorTypeOfSpecializationListComponent } from './administrator/type-of-specialization/administrator-type-of-specialization-list/administrator-type-of-specialization-list.component';
import { AdministratorSpecializationCreateComponent } from './administrator/specialization/administrator-specialization-create/administrator-specialization-create.component';
import { AdministratorSpecializationListComponent } from './administrator/specialization/administrator-specialization-list/administrator-specialization-list.component';
import { AdministratorTDKSectionCreateComponent } from './administrator/tdksection/administrator-tdksection-create/administrator-tdksection-create.component';
import { AdministratorTDKSectionListComponent } from './administrator/tdksection/administrator-tdksection-list/administrator-tdksection-list.component';
import { FacultyService } from './services/faculty.service';
import { TypeOfSpecializationService } from './services/typeOfSpecialization.service';
import { SpecializationService } from './services/specialization.service';
import { TDKSectionService } from './services/tdkSection.service';
import { ThesisFileUploadingDialogComponent } from './shared/thesis-file-uploading-dialog/thesis-file-uploading-dialog.component';
import { ApplicationFileUploadingDialogComponent } from './shared/application-file-uploading-dialog/application-file-uploading-dialog.component';

import { LocaleService } from './services/locale.service';
import { datePipe } from './pipes/date.pipe';
import { NgxPrintModule } from 'ngx-print';
import { UserGuardService } from './services/user-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { FacultyAdminGuardService } from './services/faculty-admin-guard.service';
import { AdministratorFileUploadComponent } from './administrator/file/administrator-file-upload/administrator-file-upload.component';
import { AdministratorFileListsComponent } from './administrator/file/administrator-file-lists/administrator-file-lists.component';
import { AdministratorConferenceCreateComponent } from './administrator/conference/administrator-conference-create/administrator-conference-create.component';
import { AdministratorConferenceListComponent } from './administrator/conference/administrator-conference-list/administrator-conference-list.component';
import { AdministratorConferenceListParticipantsComponent } from './administrator/conference/administrator-conference-list-participants/administrator-conference-list-participants.component';
import { AdministratorFacultyCreateComponent } from './administrator/faculty/administrator-faculty-create/administrator-faculty-create.component';
import { AdministratorFacultyListComponent } from './administrator/faculty/administrator-faculty-list/administrator-faculty-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    UserForgottenPasswordComponent,
    UserAppylingTdkComponent,
    UserChangePasswordComponent,
    UserFileUpploadComponent,
    UserFileListComponent,
    AdministratorMenuEditComponent,
    AdministratorMenuCreateComponent,
    AdministratorMenuElementListComponent,
    AdministratorMenuElementCreateComponent,
    AdministratorFileUploadComponent,
    AdministratorFileListsComponent,
    AdministratorConferenceCreateComponent,
    AdministratorConferenceListComponent,
    AdministratorConferenceListParticipantsComponent,
    AdministratorUsersComponent,
    UserApplyingTdkPrintComponent,
    NewsComponent,
    ReviewerDialogComponent,
    UserApplicationsListComponent,
    BaseComponent,
    AdministratorMenuElementModifyComponent,

    AdministratorPhotoGalleryCreateComponent,
    AdministratorPhotoGalleryListComponent,
    AdministratorPhotoGalleryModifyComponent,
    PhotoGalleryComponent,
    SummaryDialogComponent,
    UserFileApplicationUploadComponent,
    UserFileApplicationListComponent,
    AdministratorFacultyCreateComponent,
    AdministratorFacultyListComponent,
    AdministratorTypeOfSpecializationCreateComponent,
    AdministratorTypeOfSpecializationListComponent,
    AdministratorSpecializationCreateComponent,
    AdministratorSpecializationListComponent,
    AdministratorTDKSectionCreateComponent,
    AdministratorTDKSectionListComponent,
    ThesisFileUploadingDialogComponent,
    ApplicationFileUploadingDialogComponent,
    datePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatNativeDateModule,
    AngularEditorModule,
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    NgxGalleryModule,
    AutosizeModule,
    FileUploadModule,
    NgxPrintModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    /*{
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: (LocaleService: { locale: string; }) => LocaleService.locale
    },*/
    UserService, MatDatepickerModule, ApplicationService, ExcelService, ConferenceService,
    TDKFileService, ThesisFileService, ApplicationFileService, MenuService, MenuElementService, AuthenticationService, UserResolverService, MenuResolverService
    , PhotoGalleryService, FacultyService, TypeOfSpecializationService, SpecializationService, TDKSectionService, LocaleService, UserGuardService
    , AdminGuardService, FacultyAdminGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ReviewerDialogComponent, SummaryDialogComponent, ApplicationFileUploadingDialogComponent, ThesisFileUploadingDialogComponent],
  exports: [ReviewerDialogComponent, SummaryDialogComponent, ApplicationFileUploadingDialogComponent, ThesisFileUploadingDialogComponent]

})


export class AppModule { }
