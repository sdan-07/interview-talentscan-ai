import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  // err.status = err.status || "error";

  // if (process.env.NODE_ENV !== "production") {
  //   res.status(err.statusCode).json({
  //     status: err.status,
  //     error: err,
  //     message: err.message,
  //     stack: err.stack,
  //   });
  // } else {
  //   // Production: don't leak stack traces
  //   if (err.isOperational) {
  //     res.status(err.statusCode).json({
  //       status: err.status,
  //       message: err.message,
  //     });
  //   } else {
  //     // Programming or other unknown error
  //     console.error("ERROR 💥", err);
  //     res.status(500).json({
  //       status: "error",
  //       message: "Something went very wrong!",
  //     });
  //   }
  // }

  if (err.isOperational) {
    //client-side errors (handled)
    res.status(err.statusCode).json({
      status: "fail",
      //statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    //server-side errors (unhandled)
    console.error("Server error: ",err);
    res.status(500).json({
      status: "Server error",
      //statusCode: err.statusCode,
      message: err.message
    });
  }

  next();
};

export default errorMiddleware;
