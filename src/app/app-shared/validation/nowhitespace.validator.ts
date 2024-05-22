import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NoWhitespaceValidator {
  static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
      if((control.value as string).trim() == ''){
          return {cannotContainSpace: true}
      }

      return null;
  }
}
