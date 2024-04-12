import { User, Employee, Prisma } from '@prisma/client';

export interface IEmployeeProfile
  extends Pick<Employee, 'empId' | 'orgId' | 'role'> {}

export interface IJWTPayload {
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
   * User's Employee Profiles.
   */
  employeeProfiles: IEmployeeProfile[];
}

export interface IUserOutput extends Omit<User, 'password' | 'refreshToken'> {}

export interface IAccessTokenPayload {
  email: string;
}

export interface IRefreshTokenPayload {
  refreshToken: string;
}

// User with employee profiles.
// export interface IUserWithEmployeeProfiles
//   extends Prisma.UserGetPayload<{
//     include: {
//       employeeProfiles: { select: { empId: true; orgId: true; role: true } };
//     };
  // }> {}
export interface IUserWithEmployeeProfiles
  extends Pick<
    Prisma.UserGetPayload<{
      include: {employeeProfiles: { select: { empId: true; orgId: true; role: true } };};
    }>,
    'userId' | 'email' | 'employeeProfiles'
  > {}