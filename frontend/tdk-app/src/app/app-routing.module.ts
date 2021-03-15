import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministratorMenuCreateComponent } from './administrator/menu/administrator-menu-create/administrator-menu-create.component';
import { AdministratorMenuElementCreateComponent } from './administrator/menu-element/administrator-menu-element-create/administrator-menu-element-create.component';
import { AdministratorMenuEditComponent } from './administrator/menu/administrator-menu-edit/administrator-menu-edit.component';
import { AdministratorMenuElementListComponent } from './administrator/menu-element/administrator-menu-element-list/administrator-menu-element-list.component';
import { AdministratorUsersComponent } from './administrator/users/administrator-users/administrator-users.component';
import { UserApplyingTdkPrintComponent } from './user/application/user-applying-tdk-print/user-applying-tdk-print.component';
import { UserAppylingTdkComponent } from './user/application/user-appyling-tdk/user-appyling-tdk.component';
import { UserChangePasswordComponent } from './user/password/user-change-password/user-change-password.component';
import { UserFileListComponent } from './user/file/user-file-list/user-file-list.component';
import { UserFileUpploadComponent } from './user/file/user-file-uppload/user-file-uppload.component';
import { UserForgottenPasswordComponent } from './user/password/user-forgotten-password/user-forgotten-password.component';
import { UserLoginComponent } from './user/login/user-login/user-login.component';
import { UserRegistrationComponent } from './user/registration/user-registration/user-registration.component';
import { UserResolverService } from './services/user.resolver';
import { NewsComponent } from './shared/news/news.component';
import { UserApplicationsListComponent } from './user/application/user-applications-list/user-applications-list.component';
import { MenuResolverService } from './services/menu.resolver';
import { BaseComponent } from './shared/base/base.component';
import { AdministratorMenuElementModifyComponent } from './administrator/menu-element/administrator-menu-element-modify/administrator-menu-element-modify.component';
import { AdministratorPhotoGalleryCreateComponent } from './administrator/photo-gallery/administrator-photo-gallery-create/administrator-photo-gallery-create.component';
import { AdministratorPhotoGalleryListComponent } from './administrator/photo-gallery/administrator-photo-gallery-list/administrator-photo-gallery-list.component';
import { AdministratorPhotoGalleryModifyComponent } from './administrator/photo-gallery/administrator-photo-gallery-modify/administrator-photo-gallery-modify.component';
import { PhotoGalleryComponent } from './shared/photo-gallery/photo-gallery.component';
import { UserFileApplicationListComponent } from './user/file/user-file-application-list/user-file-application-list.component';
import { UserFileApplicationUploadComponent } from './user/file/user-file-application-upload/user-file-application-upload.component';
import { AdministratorTypeOfSpecializationCreateComponent } from './administrator/type-of-specialization/administrator-type-of-specialization-create/administrator-type-of-specialization-create.component';
import { AdministratorTypeOfSpecializationListComponent } from './administrator/type-of-specialization/administrator-type-of-specialization-list/administrator-type-of-specialization-list.component';
import { AdministratorSpecializationCreateComponent } from './administrator/specialization/administrator-specialization-create/administrator-specialization-create.component';
import { AdministratorSpecializationListComponent } from './administrator/specialization/administrator-specialization-list/administrator-specialization-list.component';
import { AdministratorTDKSectionCreateComponent } from './administrator/tdksection/administrator-tdksection-create/administrator-tdksection-create.component';
import { AdministratorTDKSectionListComponent } from './administrator/tdksection/administrator-tdksection-list/administrator-tdksection-list.component';
import { UserGuardService } from './services/user-guard.service';
import { FacultyAdminGuardService } from './services/faculty-admin-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { AdministratorConferenceCreateComponent } from './administrator/conference/administrator-conference-create/administrator-conference-create.component';
import { AdministratorConferenceListComponent } from './administrator/conference/administrator-conference-list/administrator-conference-list.component';
import { AdministratorConferenceListParticipantsComponent } from './administrator/conference/administrator-conference-list-participants/administrator-conference-list-participants.component';
import { AdministratorFacultyCreateComponent } from './administrator/faculty/administrator-faculty-create/administrator-faculty-create.component';
import { AdministratorFacultyListComponent } from './administrator/faculty/administrator-faculty-list/administrator-faculty-list.component';
import { AdministratorFileListsComponent } from './administrator/file/administrator-file-lists/administrator-file-lists.component';
import { AdministratorFileUploadComponent } from './administrator/file/administrator-file-upload/administrator-file-upload.component';
const routes: Routes = [
  /*{
    path: '', redirectTo: 'base', pathMatch: 'full'
  },
  {
    path: 'base',
    component: BaseComponent,
    resolve: {
      user: UserResolverService,
      menus: MenuResolverService
    },*/
  {
    path: '', resolve: {
      user: UserResolverService,
      menus: MenuResolverService
    },
    children: [
      { path: "base", component: BaseComponent },
      { path: "news", component: NewsComponent },
      { path: "photoGallery", component: PhotoGalleryComponent },
      { path: "conference/create", component: AdministratorConferenceCreateComponent, canActivate: [AdminGuardService] },
      { path: "conference/list", component: AdministratorConferenceListComponent, canActivate: [FacultyAdminGuardService] },
      { path: "conference/list/participants/:id", component: AdministratorConferenceListParticipantsComponent, canActivate: [FacultyAdminGuardService] },
      { path: "menu/create", component: AdministratorMenuCreateComponent, canActivate: [AdminGuardService] },
      { path: "menu/edit", component: AdministratorMenuEditComponent, canActivate: [AdminGuardService] },
      { path: "menu/menuElement/create", component: AdministratorMenuElementCreateComponent, canActivate: [AdminGuardService] },
      { path: "menu/menuElement/list", component: AdministratorMenuElementListComponent, canActivate: [AdminGuardService] },
      { path: "menu/menuElement/modify", component: AdministratorMenuElementModifyComponent, canActivate: [AdminGuardService] },
      { path: "faculty/create", component: AdministratorFacultyCreateComponent, canActivate: [FacultyAdminGuardService] },
      { path: "faculty/list", component: AdministratorFacultyListComponent, canActivate: [FacultyAdminGuardService] },
      { path: "typeOfSpecialization/create", component: AdministratorTypeOfSpecializationCreateComponent, canActivate: [FacultyAdminGuardService] },
      { path: "typeOfSpecialization/list", component: AdministratorTypeOfSpecializationListComponent, canActivate: [FacultyAdminGuardService] },
      { path: "specialization/create", component: AdministratorSpecializationCreateComponent, canActivate: [FacultyAdminGuardService] },
      { path: "specialization/list", component: AdministratorSpecializationListComponent, canActivate: [FacultyAdminGuardService] },
      { path: "tdkSection/create", component: AdministratorTDKSectionCreateComponent, canActivate: [FacultyAdminGuardService] },
      { path: "tdkSection/list", component: AdministratorTDKSectionListComponent, canActivate: [FacultyAdminGuardService] },
      { path: "photoGallery/create", component: AdministratorPhotoGalleryCreateComponent, canActivate: [AdminGuardService] },
      { path: "photoGallery/list", component: AdministratorPhotoGalleryListComponent, canActivate: [AdminGuardService] },
      { path: "photoGallery/tdkFiles/modify", component: AdministratorPhotoGalleryModifyComponent, canActivate: [AdminGuardService] },
      { path: "menu/file/list", component: AdministratorFileListsComponent, canActivate: [AdminGuardService] },
      { path: "menu/file/upload", component: AdministratorFileUploadComponent, canActivate: [AdminGuardService] },
      { path: "menu/users", component: AdministratorUsersComponent, canActivate: [AdminGuardService] },
      { path: "user/applyingTDK/list", component: UserApplicationsListComponent, canActivate: [UserGuardService] },
      { path: "user/applyingTDK/print", component: UserApplyingTdkPrintComponent, canActivate: [UserGuardService] },
      { path: "user/applyingTDK", component: UserAppylingTdkComponent, canActivate: [UserGuardService] },
      { path: "user/changePassword", component: UserChangePasswordComponent, canActivate: [UserGuardService] },
      { path: "user/file/list", component: UserFileListComponent, canActivate: [UserGuardService] },
      { path: "user/file/upload", component: UserFileUpploadComponent, canActivate: [UserGuardService] },
      { path: "user/applicationFile/list", component: UserFileApplicationListComponent, canActivate: [UserGuardService] },
      { path: "user/applicationFile/upload", component: UserFileApplicationUploadComponent, canActivate: [UserGuardService] },
      { path: "user/forgottenPassword", component: UserForgottenPasswordComponent },
      { path: "user/login", component: UserLoginComponent },
      { path: "user/registration", component: UserRegistrationComponent },

    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { } export const
  RoutingComponent = [NewsComponent, AdministratorConferenceCreateComponent, AdministratorConferenceListComponent, AdministratorConferenceListParticipantsComponent,
    AdministratorMenuCreateComponent, AdministratorMenuEditComponent, AdministratorMenuElementListComponent,
    AdministratorFileListsComponent, AdministratorFileUploadComponent, AdministratorUsersComponent,
    UserApplyingTdkPrintComponent, UserAppylingTdkComponent, UserChangePasswordComponent, UserFileListComponent,
    UserFileUpploadComponent, UserForgottenPasswordComponent, UserLoginComponent, UserRegistrationComponent, UserApplicationsListComponent, NewsComponent
  ];
