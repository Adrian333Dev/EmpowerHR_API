# Employee Management App

## Requirements & Features

1. **User Authentication & Authorization:**

   - **Authentication:** Login, Register, Forgot Password, Reset Password.
   - **Authorization:** Role-based access control with roles like Admin, HR Manager, Employee.

2. **Organizations:**

   - **Organization Management:** Create and manage organizations.
   - **Organization Assignment:** Assign users and departments to an organization.

3. **Advanced Department Management:**

   - **Department Hierarchy:** Create a tree-like structure to represent the organization's structure.
   - **Department Details:** Manage details like name, manager, and number of employees.
   - **Department Assignments:** Assign employees to departments.

4. **Advanced Employee Management:**

   - **Employee Profiles:** Manage personal details, job title, contact information.
   - **Employee Assignments:** Assign employees to departments and organizations.
   - **Employee Documents:** Upload and manage employee-related documents.

5. **Employee Performance Management:**
   - **Goal Setting:** Set and track individual and departmental goals.
   - **Performance Reviews:** Conduct periodic performance reviews.
   - **Feedback System:** Provide a platform for feedback from managers and peers.

## Design Considerations

- **User Interface:** Aim for a clean and intuitive design that allows users to navigate easily.
- **Responsive Design:** Ensure the app is accessible on various devices, especially mobile.
- **Accessibility:** Consider accessibility best practices to make the app usable for everyone.

## Data Modeling

- **Organizations:** ID, Name, Description, etc.
- **Departments:** ID, Name, OrganizationID, ParentDepartmentID, ManagerID, etc.
- **Employees:** ID, Name, DepartmentID, Role, ContactInfo, etc.
- **Performance Goals:** ID, EmployeeID, Title, Description, Deadline, Status, etc.
- **Performance Reviews:** ID, EmployeeID, ReviewerID, Date, Rating, Comments, etc.

## Technical Architecture

- **Frontend:** Angular with (Angular Material/Bootstrap), optinally NgRx, some advanced component libraries, etc.
- **Backend:** NestJS with TypeORM, GraphQL, etc.
- **Database:** PostgreSQL for data storage.
- **Authentication:** Implement JWT for secure user authentication and authorization.
- **Deployment:** Consider cloud platforms like AWS.
