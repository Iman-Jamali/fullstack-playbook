export const checkValidation = (value, validationRules) => {
  let isValid = true;
  let validationErrors = {};
  let input = value;
  input = input.trim();

  if (!validationRules.required && input === "") {
    return {
      status: isValid,
      validationErrors: validationErrors,
    };
  }

  if (validationRules.required) {
    isValid = input !== "" && isValid;
    if (input !== "") {
      delete validationErrors.required;
    } else {
      validationErrors.required = "Not allowed to be empty";
    }
  }

  if (validationRules.minLength && input !== "") {
    isValid = input.length >= validationRules.minLength && isValid;
    if (input.length >= validationRules.minLength) {
      delete validationErrors.minLength;
    } else {
      validationErrors.minLength = `Length must be at least ${validationRules.minLength} characters long`;
    }
  }

  if (validationRules.maxLength && input !== "") {
    isValid = input.length <= validationRules.maxLength && isValid;
    if (input.length <= validationRules.maxLength) {
      delete validationErrors.maxLength;
    } else {
      validationErrors.maxLength = `Length must be at most ${validationRules.maxLength} characters long`;
    }
  }

  if (validationRules.isEmail && input !== "") {
    const pattern =
      /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;
    isValid = pattern.test(input) && isValid;

    if (pattern.test(input)) {
      delete validationErrors.isEmail;
    } else {
      validationErrors.isEmail = "Email must be a valid email address";
    }
  }

  if (validationRules.isPassword && input !== "") {
    const pattern = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    isValid = pattern.test(input) && isValid;

    if (pattern.test(input)) {
      delete validationErrors.isPassword;
    } else {
      validationErrors.isPassword = "Password too week!";
    }
  }

  return {
    status: isValid,
    validationErrors: validationErrors,
  };
};
