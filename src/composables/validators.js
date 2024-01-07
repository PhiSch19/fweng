

export function passwordValidator(string, length) {
    /*validates if a string confirms to the password standard of this app*/

  console.log(`passwordValidator: ${string}  length: ${length}`)
    
  if (string === undefined || string === null || string === ""){console.log("condition 1"); return false; }

  // Check if the password includes at least one uppercase letter
  if (!/[A-Z]/.test(string)) {console.log("condition 2"); return false; }
  // Check if the password includes at least one lowercase letter
  if (!/[a-z]/.test(string)) {console.log("condition 3"); return false; }
  // Check if the password includes at least one number
  if (!/\d/.test(string)) {console.log("condition 4"); return false; }
  // Check if the password includes at least one symbol
  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(string)){console.log("condition 5"); return false; } 
  // Check if the password is at least 12 characters long
  if(string.length < length){console.log("condition 6"); return false; }
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
  console.log(`length: ${length}`)
  if (length === 0){return true;} 
  if (string === undefined || string === null || string === ""){return false; }
  if (string.length < length) {return false; }
  return true;


}

export function isEmptyString(value){
  return (value == null || (typeof value === "string" && value.trim().length === 0));
}


