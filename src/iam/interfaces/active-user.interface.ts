import { EmployeeRole } from "@prisma/client";

export interface IActiveUser {
  /**
   * The "subject" of the token. The value of this property is the user ID
   * that granted this token.
   */
  sub: number;

  /**
   * The subject's (user) email.
   */
  email: string;

  /**
   * The subject's (employee) role.
   */
  role: EmployeeRole;
}
