

export function passwordValidator(string, length) {
    /*validates if a string confirms to the password standard of this app*/

  if (string === undefined || string === null || string === ""){return false; }

  // Check if the password includes at least one uppercase letter
  if (!/[A-Z]/.test(string)) {return false; }
  // Check if the password includes at least one lowercase letter
  if (!/[a-z]/.test(string)) {return false; }
  // Check if the password includes at least one number
  if (!/\d/.test(string)) {return false; }
  // Check if the password includes at least one symbol
  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(string)){return false; }
  // Check if the password is at least 12 characters long
  if(string.length < length){return false; }
  // If all conditions are met, the password is strong
  return true;
}

export function emailValidator(string){
    /* validate if input string is a valid email */
        return String(string)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export function lengthValidator(string, length){
  if (length === 0){return true;}
  if (string === undefined || string === null || string === ""){return false; }
  if (string.length < length) {return false; }
  return true;


}

export function isEmptyString(value){
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}


