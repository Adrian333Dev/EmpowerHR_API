# Schema Samples

## Current Schema

```prisma
model Organization {
  org_id      Int          @id @default(autoincrement())
  name        String       @unique @db.VarChar(100)
  description String?      @db.Text
  departments Department[]
  employees   Employee[]

  @@map(name: "organizations")
}

model Department {
  department_id        Int          @id @default(autoincrement())
  org_id               Int
  manager_id           Int?
  parent_department_id Int?
  name                 String       @db.VarChar(100)
  organization         Organization @relation(fields: [org_id], references: [org_id])
  manager              Employee?    @relation("manager", fields: [manager_id], references: [employee_id], onDelete: Restrict)
  parent_department    Department?  @relation("parent_department", fields: [parent_department_id], references: [department_id], onDelete: Restrict)
  child_departments    Department[] @relation("parent_department")
  employees            Employee[]

  @@unique([org_id, name], name: "department_name_unique")
  @@map(name: "departments")
}

model User {
  user_id       Int       @id @default(autoincrement())
  first_name    String    @db.VarChar(50)
  last_name     String    @db.VarChar(50)
  email         String    @unique @db.VarChar(100)
  password_hash String    @db.VarChar(255)
  employee      Employee?

  @@map(name: "users")
}

enum EmployeeRole {
  EMPLOYEE
  MANAGER
  ADMIN
}

model Employee {
  employee_id         Int          @id @default(autoincrement())
  user_id             Int          @unique
  department_id       Int
  org_id              Int
  role                EmployeeRole @default(EMPLOYEE)
  job_title           String?      @default("Unassigned") @db.VarChar(100)
  user                User         @relation(fields: [user_id], references: [user_id])
  department          Department   @relation(fields: [department_id], references: [department_id])
  organization        Organization @relation(fields: [org_id], references: [org_id])
  managed_departments Department[] @relation("manager")

  @@index([employee_id], name: "employee_id_index")
  @@map(name: "employees")
}

```

## Additions

```prisma
// performance_goals               PerformanceGoal[]
// performance_reviews_as_employee PerformanceReview[] @relation("performance_reviews_as_employee")
// performance_reviews_as_reviewer PerformanceReview[] @relation("performance_reviews_as_reviewer")
// attendance_records              AttendanceRecord[]

// enum GoalStatus {
//   OPEN
//   IN_PROGRESS
//   COMPLETED
// }

// model PerformanceGoal {
//   id          Int        @id @default(autoincrement())
//   employee_id Int
//   title       String     @db.VarChar(100)
//   description String?    @db.Text
//   deadline    DateTime
//   status      GoalStatus
//   employee    Employee   @relation(fields: [employee_id], references: [employee_id])

//   @@map(name: "performance_goals")
// }

// model PerformanceReview {
//   id          Int      @id @default(autoincrement())
//   employee_id Int
//   reviewer_id Int
//   date        DateTime
//   rating      Float
//   comments    String?
//   employee    Employee @relation("performance_reviews_as_employee", fields: [employee_id], references: [employee_id])
//   reviewer    Employee @relation("performance_reviews_as_reviewer", fields: [reviewer_id], references: [employee_id])

//   @@map(name: "performance_reviews")
// }

// enum AttendanceStatus {
//   PRESENT
//   ABSENT
//   LATE
// }

// model AttendanceRecord {
//   id             Int              @id @default(autoincrement())
//   employee_id    Int
//   check_in_time  DateTime
//   check_out_time DateTime?
//   status         AttendanceStatus
//   employee       Employee         @relation(fields: [employee_id], references: [employee_id])

//   @@map(name: "attendance_records")
// }

```