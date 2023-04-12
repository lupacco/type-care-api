function conflictError(message) {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "There is already an user using this email",
    email,
  };
}

function duplicatedCpf(cpf){
  return {
    name: "DuplicatedCpfError",
    message: "There is already an user using this CPF",
    cpf,
  };
}

function duplicatedCrm(crm){
  return {
    name: "DuplicatedCrmError",
    message: "There is already an user using this CRM",
    crm,
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError() {
  return {
    name: "NotFoundError",
    message: "The requested resource could not be found",
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are not valid",
  };
}

function invalidTypeOfUserError(){
  return{
    name: "InvalidTypeOfUserError",
    message: "Your type of user don't have permissions for this action"
  }
}

export default {
  conflictError,
  duplicatedEmailError,
  duplicatedCpf,
  duplicatedCrm,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
  invalidTypeOfUserError
};
