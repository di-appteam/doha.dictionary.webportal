import { AbstractControl  } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = "";
        if (AC.get('password')) {
            password = AC.get('password')!.value; // to get value in input tag
        }
        else if (AC.get('newpassword')) {
            password = AC.get('newpassword')!.value;
        }
        let confirmpassword = AC.get('confirmpassword')!.value; // to get value in input tag
        if (password != confirmpassword) {
            AC.get('confirmpassword')!.setErrors({ MatchPassword: true })
        }
    }

    public static Strong(control: AbstractControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return {};
    }
}
