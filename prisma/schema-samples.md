# Schema Samples

## Current Schema

```prisma
model Organization {
  orgId      Int          @id @default(autoincrement())
  name        String       @unique @db.VarChar(100)
  description String?      @db.Text
  departments Department[]
  employees   Employee[]

  @@map(name: "organizations")
}

model Department {
  department_id        Int          @id @default(autoincrement())
  orgId               Int
  manager_id           Int?
  parent_department_id Int?
  name                 String       @db.VarChar(100)
  organization         Organization @relation(fields: [orgId], references: [orgId])
  manager              Employee?    @relation("manager", fields: [manager_id], references: [employee_id], onDelete: Restrict)
  parent_department    Department?  @relation("parent_department", fields: [parent_department_id], references: [department_id], onDelete: Restrict)
  child_departments    Department[] @relation("parent_department")
  employees            Employee[]

  @@unique([orgId, name], name: "department_name_unique")
  @@map(name: "departments")
}

model User {
  userId       Int       @id @default(autoincrement())
  firstName    String    @db.VarChar(50)
  lastName     String    @db.VarChar(50)
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
  userId             Int          @unique
  department_id       Int
  orgId              Int
  role                EmployeeRole @default(EMPLOYEE)
  jobTitle           String?      @default("Unassigned") @db.VarChar(100)
  user                User         @relation(fields: [userId], references: [userId])
  department          Department   @relation(fields: [department_id], references: [department_id])
  organization        Organization @relation(fields: [orgId], references: [orgId])
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
