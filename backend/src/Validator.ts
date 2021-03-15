import { User } from "./Model/User";
import { Error } from "./Model/Error";
import { Application } from "./Model/Application";
import { Supervisor } from "./Model/Supervisor";
import { Author } from "./Model/Author";
import { Menu } from "./Model/Menu";
import { MenuElement } from "./Model/MenuElement";
import { Conference } from "./Model/Conference";
import { TDKFile } from "./Model/TDKFile";
import { ThesisFile } from "./Model/ThesisFile";
import { UserChangePassword } from "./Model/UserChangePassword";
import { PhotoGallery } from "./Model/PhotoGallery";
import { Faculty } from "./Model/Faculty";
import { TypeOfSpecialization } from "./Model/TypeOfSpecialization";
import { Specialization } from "./Model/Specialization";
import { TDKSection } from "./Model/TDKSection";
export class Validator {
  static userChangePasswordPostError(
    userChangePassword: UserChangePassword
  ): Error[] {
    let errors: Error[] = [];
    if (!userChangePassword) {
      errors.push(
        new Error(
          "user",
          "A felhasználót jelszavának módosításához kapcsolódó adatokat kötelező megadni!"
        )
      );
      return errors;
    }
    if (!userChangePassword.email) {
      errors.push(
        new Error(
          "userChangePassword.email",
          "A felhasználó email címét kötelező megadni!"
        )
      );
    }
    if (!userChangePassword.oldPassword) {
      errors.push(
        new Error(
          "userChangePassword.oldPassword",
          "A felhasználó régi jelszavát kötelező megadni!"
        )
      );
    }
    if (!userChangePassword.newPassword1) {
      errors.push(
        new Error(
          "userChangePassword.newPassword1",
          "A felhasználó új jelszavát kötelező megadni!"
        )
      );
    }
    if (!userChangePassword.newPassword2) {
      errors.push(
        new Error(
          "userChangePassword.newPassword2",
          "A felhasználó új jelszavát kötelező megadni!"
        )
      );
    }
    if (userChangePassword.newPassword1 && userChangePassword.newPassword2) {
      if (userChangePassword.newPassword1 != userChangePassword.newPassword2) {
        errors.push(
          new Error(
            "userChangePassword.newPassword1!=userChangePassword.newPassword2",
            "A felhasználó új jelszavainak egyezni kell kötelező megadni!"
          )
        );
      }
    }
  }
  static userForgottenPasswordEmailPostError(user: User): Error[] {
    let errors: Error[] = [];
    if (!user) {
      errors.push(new Error("user", "A felhasználót kötelező megadni!"));
      return errors;
    }
    if (!user.email) {
      errors.push(
        new Error("user.email", "A felhasználó email címét kötelező megadni!")
      );
    }
  }

  static userPostError(user: User): Error[] {
    let errors: Error[] = [];
    if (!user) {
      errors.push(new Error("user", "A felhasználót kötelező megadni!"));
      return errors;
    }
    if (!user.name) {
      errors.push(
        new Error("user.name", "A felhasználó nevét kötelező megadni!")
      );
    }
    if (!user.email) {
      errors.push(
        new Error("user.email", "A felhasználó email címét kötelező megadni!")
      );
    }
    if (!user.password) {
      errors.push(
        new Error("user.password", "A felhasználó jelszavát kötelező megadni!")
      );
    }
    if (!user.permission) {
      errors.push(
        new Error(
          "user.permission",
          "A felhasználó jogosultságát kötelező megadni!"
        )
      );
    }
    if (!user.registrationDate) {
      errors.push(
        new Error(
          "user.registrationDate",
          "A felhasználó regisztrációjának dátumát kötelező megadni!"
        )
      );
    }
    return errors;
  }
  static applicationsPostError(application: Application): Error[] {
    let errors: Error[] = [];

    if (!application) {
      errors.push(new Error("application", "A jelentkezést kötelező megadni!"));
      return errors;
    }
    if (!application.userId) {
      errors.push(
        new Error(
          "application.userId",
          "A felhasználót kötelező megadni!"
        )
      );
    }
    if (!application.tdkConferenceId) {
      errors.push(
        new Error(
          "application.tdkConferenceId",
          "A TDK konferenciát kötelező megadni!"
        )
      );
    }
    if (!application.status) {
      errors.push(
        new Error(
          "application.status",
          "A jelentkezés státuszát kötelező megadni!"
        )
      );
    }
    if (!application.tdkTitle) {
      errors.push(
        new Error("application.tdkTitle", "A tdk címét kötelező megadni!")
      );
    }
    if (!application.tdkTitle_EN) {
      errors.push(
        new Error("application.tdkTitle_EN", "A tdk címét (angol) kötelező megadni!")
      );
    }
    if (!application.facultySectionName) {
      errors.push(
        new Error(
          "application.facultySectionName",
          "A kari szekciót kötelező megadni!"
        )
      );
    }
    if (!application.facultyName) {
      errors.push(
        new Error("application.facultyName", "A kart kötelező megadni!")
      );
    }
    if (!application.supervisors) {
      errors.push(
        new Error("application.supervisors", "A témavezetőt kötelező megadni!")
      );
    }
    if (!application.authors) {
      errors.push(
        new Error("application.authors", "A szerzőt kötelező megadni!")
      );
    }
    if (application.supervisors) {
      errors.push.apply(
        errors,
        this.supervisorsPostError(application.supervisors)
      );
    }
    if (application.authors) {
      errors.push.apply(errors, this.authorsPostError(application.authors));
    }
    if (!application.summary) {
      errors.push(
        new Error("application.summary", "A tdk összefoglalását kötelező megadni!")
      );
    }
    if (!application.language) {
      errors.push(
        new Error("application.language", "A tdk nyelvét kötelező megadni!")
      );
    }
  }
  static supervisorsPostError(supervisors: Supervisor[]): Error[] {
    let errors: Error[] = [];
    if (!supervisors) {
      errors.push(new Error("supervisors", "A témavezetőt kötelező megadni!"));
      return errors;
    }
    for (let i = 0; i < supervisors.length; i++) {
      if (!supervisors[i]) {
        errors.push(
          new Error("supervisors", "A témavezetőt kötelező megadni!")
        );
      } else {
        if (!supervisors[i].name) {
          errors.push(
            new Error(
              "supervisors.name",
              "A témavezető nevét kötelező megadni!"
            )
          );
        }
        if (!supervisors[i].position) {
          errors.push(
            new Error(
              "supervisors.position",
              "A témavezető beosztását kötelező megadni!"
            )
          );
        }
        if (!supervisors[i].faculty) {
          errors.push(
            new Error("supervisors.faculty", "A kart kötelező megadni!")
          );
        }
        if (!supervisors[i].institute) {
          errors.push(
            new Error("supervisors.institute", "Az intézetet kötelező megadni!")
          );
        }
      }
    }
    return errors;
  }
  static authorsPostError(authors: Author[]): Error[] {
    let errors: Error[] = [];
    if (!authors) {
      errors.push(new Error("authors", "A szerzőt kötelező megadni!"));
      return errors;
    }
    for (let i = 0; i < authors.length; i++) {
      if (!authors[i]) {
        errors.push(new Error("authors", "A szerzőt kötelező megadni!"));
      } else {
        if (!authors[i].name) {
          errors.push(
            new Error("authors.name", "A szerző nevét kötelező megadni!")
          );
        }
        if (!authors[i].facultyName) {
          errors.push(
            new Error("authors.facultyName", "A kart kötelező megadni!")
          );
        }
        if (!authors[i].specialization) {
          errors.push(
            new Error("authors.specialization", "A szakot kötelező megadni!")
          );
        }
        if (!authors[i].year) {
          errors.push(
            new Error(
              "authors.year",
              "A szerző  évfolyamát kötelező megadni!"
            )
          );
        }
        if (!authors[i].isGraduate) {
          errors.push(
            new Error(
              "authors.year",
              "A szerző  végzésére vonatkozó adatot kötelező megadni!"
            )
          );
        }
        if (!authors[i].neptunCode) {
          errors.push(
            new Error(
              "authors.neptunCode",
              "A szerző neptun kódját kötelező megadni!"
            )
          );
        }
        if (!authors[i].idNumber) {
          errors.push(
            new Error(
              "authors.idNumber",
              "A szerző személyi igazolvány számát kötelező megadni!"
            )
          );
        }

        if (!authors[i].typeOfTheSpecialization) {
          errors.push(
            new Error(
              "authors.typeOfTheSpecialization",
              "A képzés típusát kötelező megadni!"
            )
          );
        }

        if (!authors[i].taxStatus) {
          errors.push(
            new Error(
              "authors.taxStatus",
              "Az adózási státuszt kötelező megadni!"
            )
          );
        }

        if (!authors[i].isEmployee) {
          errors.push(
            new Error(
              "authors.isEmployee",
              "Azt, hogy a szerző dolgozó-e kötelező megadni!"
            )
          );
        }

        if (!authors[i].taxIdentificationNumber) {
          errors.push(
            new Error(
              "authors.taxIdentificationNumber",
              "Az adóazonosító jelet kötelező megadni!"
            )
          );
        }
        if (!authors[i].birthPlace) {
          errors.push(
            new Error(
              "authors.birthPlace",
              "A szerző születés helyét kötelező megadni!"
            )
          );
        }
        if (!authors[i].nameOfTheMother) {
          errors.push(
            new Error(
              "authors.nameOfTheMother",
              "A szerző anyja nevét kötelező megadni!"
            )
          );
        }
        if (!authors[i].zipCode) {
          errors.push(
            new Error(
              "authors.zipCode",
              "A szerző lakcíménél az irányítószámot kötelező megadni!"
            )
          );
        }
        if (!authors[i].town) {
          errors.push(
            new Error(
              "authors.town",
              "A szerző lakcíménél a várost kötelező megadni!"
            )
          );
        }
        if (!authors[i].streetAndNumber) {
          errors.push(
            new Error(
              "authors.streetAndNumber",
              "A szerző lakcíménél az utcát és házszámot kötelező megadni!"
            )
          );
        }

        if (!authors[i].telephoneNumber) {
          errors.push(
            new Error(
              "authors.telephoneNumber",
              "A szerző telefonszámát kötelező megadni!"
            )
          );
        }

        if (!authors[i].email) {
          errors.push(
            new Error("authors.email", "A szerző email címét kötelező megadni!")
          );
        }
        if (!authors[i].bankAccountNumber) {
          errors.push(
            new Error(
              "authors.bankAccountNumber",
              "A szerző bankszámla számát kötelező megadni!"
            )
          );
        }
      }
    }
    return errors;
  }

  static menuPostError(menu: Menu): Error[] {
    let errors: Error[] = [];
    if (!menu) {
      errors.push(new Error("menu", "A menüt kötelező megadni!"));
      return errors;
    }
    if (!menu.name) {
      errors.push(new Error("menu.name", "A menü nevét kötelező megadni!"));
    }
    if (menu.visible == null || menu.visible == undefined) {
      errors.push(
        new Error("menu.visible", "A menü láthatóságát kötelező megadni!")
      );
    }
    if (!menu.position) {
      errors.push(
        new Error("menu.position", "A menü pozícióját kötelező megadni!")
      );
    }
    if (!menu.date) {
      errors.push(new Error("menu.date", "A menü dátumát kötelező megadni!"));
    }
    return errors;
  }

  static menuElementsPostError(menuElement: MenuElement): Error[] {
    let errors: Error[] = [];
    if (!menuElement) {
      errors.push(new Error("menuElement", "A menüt elemet kötelező megadni!"));
      return errors;
    }

    if (!menuElement.title) {
      errors.push(
        new Error("menuElement.title", "A menüelem címét kötelező megadni!")
      );
    }
    if (menuElement.visible == undefined || menuElement.visible == null) {
      errors.push(
        new Error(
          "menuElement.visible",
          "A menüelem láthatóságát kötelező megadni!"
        )
      );
    }
    if (!menuElement.content) {
      errors.push(
        new Error(
          "menuElement.content",
          "A menüelem tartalmát kötelező megadni!"
        )
      );
    }

    return errors;
  }

  static conferencePostError(conference: Conference): Error[] {
    let errors: Error[] = [];
    if (!conference) {
      errors.push(new Error("conference", "A konferenciát kötelező megadni!"));
      return errors;
    }
    if (!conference.name) {
      errors.push(
        new Error("conference.name", "A konferencia nevét kötelező megadni!")
      );
    }
    if (!conference.beginDate) {
      errors.push(
        new Error(
          "conference.beginDate",
          "A konferencia kezdetét kötelező megadni!"
        )
      );
    }
    if (!conference.endDate) {
      errors.push(
        new Error("conference.endDate", "A konferencia végét kötelező megadni!")
      );
    }
    if (conference.beginDate && conference.endDate) {
      if (conference.beginDate > conference.endDate) {
        errors.push(
          new Error(
            "conference.beginDate&&conference.endDate",
            "A konferencia kezdete nem lehet nagyobb mint a vége kötelező megadni!"
          )
        );
      }
    }
    return errors;
  }
  static tdkFilePostError(tdkFile: TDKFile): Error[] {
    let errors: Error[] = [];
    if (!tdkFile) {
      errors.push(new Error("tdkFile", "A fájlt kötelező megadni!"));
      return errors;
    }
    if (!tdkFile.fileName) {
      errors.push(
        new Error("tdkFile.fileName", "A fájl nevét kötelező megadni!")
      );
    }
    if (tdkFile.visible == undefined || tdkFile.visible == null) {
      errors.push(
        new Error("tdkFile.visible", "A fájl láthatóságát kötelező megadni!")
      );
    }
    if (!tdkFile.date) {
      errors.push(
        new Error("tdkFile.date", "A fájl dátumát kötelező megadni!")
      );
    }
    if (tdkFile.fileName == undefined) {
      errors.push(new Error("tdkFile.fileName", "A fájlt kötelező megadni!"));
    }
    return errors;
  }
  static thesisFilePostError(thesisFile: ThesisFile): Error[] {
    let errors: Error[] = [];
    if (!thesisFile) {
      errors.push(new Error("thesisFile", "A fájlt kötelező megadni!"));
      return errors;
    }
    if (!thesisFile.conferenceId) {
      errors.push(
        new Error("thesisFile.conference", "A konferenciát kötelező megadni!")
      );
    }
    if (!thesisFile.tdkFile) {
      errors.push(new Error("thesisFile.tdkFile", "A fájlt kötelező megadni!"));
    }

    if (thesisFile.tdkFile) {
      errors.push.apply(errors, this.tdkFilePostError(thesisFile.tdkFile));
    }
    return errors;
  }
  static applicationFilePostError(applicationFile: ThesisFile): Error[] {
    let errors: Error[] = [];
    if (!applicationFile) {
      errors.push(new Error("applicationFile", "A fájlt kötelező megadni!"));
      return errors;
    }
    if (!applicationFile.conferenceId) {
      errors.push(
        new Error("applicationFile.conference", "A konferenciát kötelező megadni!")
      );
    }
    if (!applicationFile.tdkFile) {
      errors.push(new Error("applicationFile.tdkFile", "A fájlt kötelező megadni!"));
    }

    if (applicationFile.tdkFile) {
      errors.push.apply(errors, this.tdkFilePostError(applicationFile.tdkFile));
    }
    return errors;
  }

  static photoGalleryPostError(photoGallery: PhotoGallery): Error[] {
    let errors: Error[] = [];
    if (!photoGallery) {
      errors.push(new Error("photoGallery", "A fotó galériát kötelező megadni!"));
      return errors;
    }
    if (!photoGallery.name) {
      errors.push(
        new Error("photoGallery.name", "A fotó galéria nevét kötelező megadni!")
      );
    }
    if (photoGallery.name == undefined) {
      errors.push(new Error("photoGallery.name", "A fotó galéria nevét kötelező megadni!"));
    }
    return errors;
  }

  static facultyPostError(faculty: Faculty): Error[] {
    let errors: Error[] = [];
    if (!faculty) {
      errors.push(new Error("faculty", "A kart kötelező megadni!"));
      return errors;
    }
    if (!faculty.name) {
      errors.push(
        new Error("faculty.name", "A kar nevét kötelező megadni!")
      );
    }
    if (!faculty.name_EN) {
      errors.push(
        new Error("faculty.name_EN", "A kar angol nevét kötelező megadni!")
      );
    }
    return errors;
  }
  static typeOfSpecializationPostError(typeOfTheSpecialization: TypeOfSpecialization): Error[] {
    let errors: Error[] = [];
    if (!typeOfTheSpecialization) {
      errors.push(new Error("typeOfTheSpecialization", "A képzés típusát kötelező megadni!"));
      return errors;
    }
    if (!typeOfTheSpecialization.name) {
      errors.push(
        new Error("typeOfTheSpecialization.name", "A képzés típusának nevét kötelező megadni!")
      );
    }
    if (!typeOfTheSpecialization.name_EN) {
      errors.push(
        new Error("typeOfTheSpecialization.name_EN", "A képzés típusának angol nevét kötelező megadni!")
      );
    }
    return errors;
  }
  static specializationPostError(specialization: Specialization): Error[] {
    let errors: Error[] = [];
    if (!specialization) {
      errors.push(new Error("specialization", "A képzési szakot kötelező megadni!"));
      return errors;
    }
    if (!specialization.facultyId) {
      errors.push(
        new Error("specialization.facultyId", "A képzési szak nevét kötelező megadni!")
      );
    }
    if (!specialization.typeOfSpecializationId) {
      errors.push(
        new Error("specialization.typeOfSpecializationId", "A képzési szak típusát kötelező megadni!")
      );
    }
    if (!specialization.name) {
      errors.push(
        new Error("specialization.name", "A képzési szak nevét nevét kötelező megadni!")
      );
    }
    if (!specialization.name_EN) {
      errors.push(
        new Error("specialization.name_EN", "A képzés szak angol nevét kötelező megadni!")
      );
    }
    return errors;
  }
  static tdkSectionPostError(tdkSection: TDKSection): Error[] {
    let errors: Error[] = [];
    if (!tdkSection) {
      errors.push(new Error("tdkSection", "A TDK szekciót kötelező megadni!"));
      return errors;
    }
    if (!tdkSection.facultyId) {
      errors.push(
        new Error("tdkSection.facultyId", "A kart kötelező megadni!")
      );
    }
    if (!tdkSection.name) {
      errors.push(
        new Error("tdkSection.name", "A TDK szekció nevét kötelező megadni!")
      );
    }
    if (!tdkSection.name_EN) {
      errors.push(
        new Error("tdkSection.name_EN", "A TDK szekció angol nevét kötelező megadni!")
      );
    }
    return errors;
  }

}
