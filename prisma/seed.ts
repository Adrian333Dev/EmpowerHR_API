import { Prisma, PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

const departments: Prisma.DepartmentCreateInput[] = [
  { name: 'Engineering' },
  { name: 'Marketing' },
  { name: 'Sales' },
  { name: 'HR' },
];

const jobTitles: Prisma.JobTitleCreateInput[] = [
  { title: 'Software Engineer' },
  { title: 'Software Architect' },
  { title: 'Product Manager' },
  { title: 'Sales Representative' },
  { title: 'HR Manager' },
  { title: 'HR Specialist' },
  { title: 'Marketing Manager' },
  { title: 'Marketing Specialist' },
];

const employees: Prisma.EmployeeCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: { connect: { title: 'Software Engineer' } },
    department: { connect: { name: 'Engineering' } },
    salary: 70000,
    hireDate: new Date('2020-01-01'),
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    jobTitle: { connect: { title: 'Software Architect' } },
    department: { connect: { name: 'Engineering' } },
    salary: 90000,
    hireDate: new Date('2019-01-01'),
  },
  {
    name: 'Alice Johnson',
    email: 'alice.jh@example.com',
    jobTitle: { connect: { title: 'Product Manager' } },
    department: { connect: { name: 'Marketing' } },
    salary: 110000,
    hireDate: new Date('2018-01-01'),
  },
  {
    name: 'Bob Brown',
    email: 'bob.brownie@example.com',
    jobTitle: { connect: { title: 'Sales Representative' } },
    department: { connect: { name: 'Sales' } },
    salary: 80000,
    hireDate: new Date('2017-01-01'),
  },
  {
    name: 'Charlie Green',
    email: 'charli.gremlin@example.com',
    jobTitle: { connect: { title: 'HR Manager' } },
    department: { connect: { name: 'HR' } },
    salary: 120000,
    hireDate: new Date('2016-01-01'),
  },
  {
    name: 'David White',
    email: 'david.black@example.com',
    jobTitle: { connect: { title: 'HR Specialist' } },
    department: { connect: { name: 'HR' } },
    salary: 90000,
    hireDate: new Date('2015-01-01'),
  },
];

async function main() {
  console.log('Start seeding ...');

  // save departments and job titles in a map after seeding, so we can use them to connect employees
  const departmentMap = new Map<string, number>(); // key: department name, value: department ID
  const jobTitleMap = new Map<string, number>(); // key: job title, value: job title ID

  // seed departments
  for (const department of departments) {
    const createdDepartment = await prisma.department.create({ data: department });
    departmentMap.set(createdDepartment.name, createdDepartment.id);
  }

  // seed job titles
  for (const jobTitle of jobTitles) {
    const createdJobTitle = await prisma.jobTitle.create({ data: jobTitle });
    jobTitleMap.set(createdJobTitle.title, createdJobTitle.id);
  }

  // seed employees
  for (const employee of employees) {
    await prisma.employee.create({
      data: {
        ...employee,
        department: { connect: { id: departmentMap.get(employee.department.connect.name) } },
        jobTitle: { connect: { id: jobTitleMap.get(employee.jobTitle.connect.title) } },
      },
    });
  }

  console.log('Seeding finished.');
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
