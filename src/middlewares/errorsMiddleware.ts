import httpStatus from "http-status";
//Types
import {Request, Response, NextFunction} from "express"

export function handleApplicationErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  if (
    err.name === "ConflictError" ||
    err.name === "DuplicatedEmailError" ||
    err.name === "DuplicatedCpfError" ||
    err.name === "DuplicatedCrmError"
  ) {
    return res
      .status(httpStatus.CONFLICT)
      .send({ message: err.message });
  }

  if (
    err.name === "UnauthorizedError" ||
    err.name === "InvalidCredentialsError" || err.name === "InvalidTypeOfUserError"
  ) {
    return res.status(httpStatus.UNAUTHORIZED).send({ message: err.message });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({ message: err.message });
  }

  console.log(err)

  return res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .send({ error: "InternalServerError", message: "Internal Server Error" });
}
