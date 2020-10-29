var REQUIRED_PASSWORD_CHARACTERS = "!@#$%^&*";

const setMessage = (id, message) => {
  var messageBox = document.getElementById(id);
   messageBox.innerText = message;
}

const clearMessage = (id) =>  {
    setMessage( id, "");
}

const getInputValue = (id) => {
  return  document.getElementById(id).value;
}

const isUpper = (character) =>  {
  return (character >= "A" && character <= "Z");
}

const isLower = (character) =>  {
  return (character >= "a" && character <= "z");
}

const isLetter = (character) =>  {
  return isUpper(character)
  || isLower(character);
}

const isNumber = (character) =>  {
  return (character >= 0 && character <= 9);
}

const isSpecial = (character) =>  {
  return (REQUIRED_PASSWORD_CHARACTERS.indexOf(character) >= 0);
}

const isValidUserNameChar = (character)  =>  {
  return isLetter(character) || (character === " ");
}

const validateUserName = () => {
  var value = getInputValue("userName");
  
  clearMessage("userNameMessage");

  if (value == "")  {
    setMessage("userNameMessage", "First and Last Name may be letters only, separated by a space.");
  }

  for(var i = 0; i < value.length; i++) {
    var character = value.charAt(i);
 
    if(!isValidUserNameChar(character))  {
      setMessage("userNameMessage", "Character '" + character + "' is invalid in Name.");
    }
  }
}

const isValidStreetAddressChar = (character)  =>  {
  return isLetter(character) || isNumber(character) || (character === " ") || (character === ".");
}

const validateStreetAddress = () => {
  var value = getInputValue("streetAddress");

  clearMessage("streetAddressMessage");

  if (value == "")  {
    setMessage("streetAddressMessage", "Street Address may contain only alphanumeric characters, spaces or '.'");
  }

  for(var i = 0; i < value.length; i++) {
    var character = value.charAt(i);

    if(!isValidStreetAddressChar(character))  {
      setMessage("streetAddressMessage", "Character '" + character + "' is invalid in Street Address.");
    }
  }
}

const isValidCityChar = (character) =>  {
  return isLetter(character) || (character === " ") || (character === ".");
}

const validateCity = () => {
  var value = getInputValue("city");

  clearMessage("cityMessage");

  if (value == "")  {
    setMessage("cityMessage", "City input may contain only alphanumeric characters, spaces or '.'");
  }

  for(var i = 0; i < value.length; i++) {
    var character = value.charAt(i);

    if(!isValidCityChar(character)) {
      setMessage("cityMessage", "Character '" + character + "' is invalid in City.");
    }
  }
}

const validateLengthZipCode = (value) =>  {
  if (value == "")  {
    setMessage("zipCodeMessage", "Zip Code may only contain numeric characters.");
  } else if (value.length >= 6)  {
    setMessage("zipCodeMessage", "Zip Code may not exceed 5 characters in length.")
  } else if (value.length < 5)  {
    setMessage("zipCodeMessage", "Zip Code must be 5 characters in length.")
  }
}

const validateZipCode = () => {
  var value = getInputValue("zipCode");

  clearMessage("zipCodeMessage");
  validateLengthZipCode(value);

  for(var i = 0; i < value.length; i++) {
    var character = value.charAt(i);

    if (!isNumber(character))  {
      setMessage("zipCodeMessage", "Character '" + character + "' is invalid in Zip Code.");
    }
  }
}

const isValidPasswordChar = (character) =>  {
  return isLetter(character) || isNumber(character) || isSpecial(character);
}

const validateLengthPassword = (value) => {
  if (value == "")  {
    setMessage("createPasswordMessage", "Password must contain at least 8 alphanumeric or special characters.");
  } 

  if (value.length < 8) {
    setMessage("createPasswordMessage", "Password must be at least 8 characters in length.");
    return;
  }
} 

const checkRequirementsPassword = (value) => {
  var hasUpper = false;
  var hasNumber = false;
  var hasSpecial = false;

  for (var i = 0; i < value.length; i++) {
    var character = value.charAt(i);

    if (isUpper(character)) {
      hasUpper = true;
    } else if (isNumber(character)) {
      hasNumber = true;
    } else if (isSpecial(character))  {
      hasSpecial = true;
    }
  }

    if (!hasUpper)  {
      setMessage("createPasswordMessage", "Password must have at least 1 uppercase letter.");
    } else if (!hasNumber)  {
      setMessage("createPasswordMessage", "Password must have at least 1 number.");
    } else if (!hasSpecial) {
      setMessage("createPasswordMessage", "Password must contain one of the following characters: '" + REQUIRED_PASSWORD_CHARACTERS + "'.");
    }

    if(!isValidPasswordChar(character)) {
      setMessage("createPasswordMessage", "Character '" + character + "' is invalid in Password.");
    }
}

const validateCreatePassword = () => {
  var value = getInputValue("createPassword");

 clearMessage("createPasswordMessage");
 validateLengthPassword(value);
 checkRequirementsPassword(value);
}

function init() {
  document.getElementById("userName").addEventListener("input", validateUserName);
  document.getElementById("streetAddress").addEventListener("input", validateStreetAddress);
  document.getElementById("city").addEventListener("input", validateCity);
  document.getElementById("zipCode").addEventListener("input", validateZipCode);
  document.getElementById("createPassword").addEventListener("input", validateCreatePassword);
}

window.addEventListener("load", init);

