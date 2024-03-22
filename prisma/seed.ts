import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


interface DepartmentSeed {
  name: string;
  children?: DepartmentSeed[];
}

interface JobTitleSeed {
  title: string;
  department: string | number; // department name or ID
}

interface EmployeeSeed {
  name: string;
  email: string;
  jobTitle: string | number; // job title name or ID
  department: string | number; // department name or ID
  salary: number;
  hireDate: Date;
}

const departments: DepartmentSeed[] = [
  {
    name: 'Engineering',
    children: [
      {
        name: 'Software Engineering',
        children: [{ name: 'Frontend' }, { name: 'Backend' }],
      },
      { name: 'Quality Assurance' },
    ],
  },
  { name: 'HR' },
  {
    name: 'Marketing',
    children: [{ name: 'Content' }, { name: 'Design' }],
  },
];

const jobTitles: JobTitleSeed[] = [
  { title: 'Software Engineer', department: 'Software Engineering' },
  { title: 'Frontend Developer', department: 'Frontend' },
  { title: 'Backend Developer', department: 'Backend' },
  { title: 'QA Engineer', department: 'Quality Assurance' },
  { title: 'HR Manager', department: 'HR' },
  { title: 'Content Writer', department: 'Content' },
  { title: 'Graphic Designer', department: 'Design' },
];

const employees: EmployeeSeed[] = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    jobTitle: 'Software Engineer',
    department: 'Software Engineering',
    salary: 90000,
    hireDate: new Date('2022-01-15'),
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    jobTitle: 'Frontend Developer',
    department: 'Frontend',
    salary: 85000,
    hireDate: new Date('2023-02-10'),
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    jobTitle: 'Backend Developer',
    department: 'Backend',
    salary: 88000,
    hireDate: new Date('2021-07-21'),
  },
  {
    name: 'Diana Ross',
    email: 'diana.ross@example.com',
    jobTitle: 'QA Engineer',
    department: 'Quality Assurance',
    salary: 75000,
    hireDate: new Date('2022-05-05'),
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    jobTitle: 'HR Manager',
    department: 'HR',
    salary: 80000,
    hireDate: new Date('2020-11-15'),
  },
  {
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
    jobTitle: 'Content Writer',
    department: 'Content',
    salary: 70000,
    hireDate: new Date('2021-08-25'),
  },
  {
    name: 'George Lucas',
    email: 'george.lucas@example.com',
    jobTitle: 'Graphic Designer',
    department: 'Design',
    salary: 72000,
    hireDate: new Date('2022-09-09'),
  },
  {
    name: 'Hannah Montana',
    email: 'hannah.montana@example.com',
    jobTitle: 'Software Engineer',
    department: 'Software Engineering',
    salary: 92000,
    hireDate: new Date('2021-12-20'),
  },
  {
    name: 'Ian Somerhalder',
    email: 'ian.somerhalder@example.com',
    jobTitle: 'Frontend Developer',
    department: 'Frontend',
    salary: 86000,
    hireDate: new Date('2023-01-30'),
  },
  {
    name: 'Julia Roberts',
    email: 'julia.roberts@example.com',
    jobTitle: 'Backend Developer',
    department: 'Backend',
    salary: 89000,
    hireDate: new Date('2020-10-10'),
  },
];

const createDepartment = async (
  department: DepartmentSeed,
  departmentMap: Map<string, number>,
  parentId?: number,
) => {
  const newDepartment = await prisma.department.create({
    data: {
      name: department.name,
      parentId,
    },
  });

  departmentMap.set(department.name, newDepartment.id);

  if (department.children) {
    for (const child of department.children) {
      const childDepartmentMap = await createDepartment(
        child,
        departmentMap,
        newDepartment.id,
      );
      for (const [key, value] of childDepartmentMap) {
        departmentMap.set(key, value);
      }
    }
  }

  return departmentMap;
};

const createAllDepartments = async (departments: DepartmentSeed[]) => {
  const departmentMap = new Map<string, number>();

  for (const department of departments) {
    const newDepartmentMap = await createDepartment(department, departmentMap);
    for (const [key, value] of newDepartmentMap) {
      departmentMap.set(key, value);
    }
  }

  return departmentMap;
};

const createAllJobTitles = async (
  jobTitles: JobTitleSeed[],
  departmentMap: Map<string, number>,
): Promise<Map<string, number>> => {
  const jobTitleMap = new Map<string, number>();

  for (const { department, title } of jobTitles) {
    const departmentId =
      typeof department === 'string'
        ? departmentMap.get(department)
        : department;

    const newJobTitle = await prisma.jobTitle.create({
      data: { title, department: { connect: { id: departmentId } } },
    });

    jobTitleMap.set(title, newJobTitle.id);
  }

  return jobTitleMap;
};

async function main() {
  console.log('Start seeding ...');

  // seed departments
  const departmentMap = await createAllDepartments(departments);

  // seed job titles
  const jobTitleMap = await createAllJobTitles(jobTitles, departmentMap);

  // seed employees
  for (const employee of employees) {
    const jobTitleId =
      typeof employee.jobTitle === 'string'
        ? jobTitleMap.get(employee.jobTitle)
        : employee.jobTitle;

    const departmentId =
      typeof employee.department === 'string'
        ? departmentMap.get(employee.department)
        : employee.department;

    await prisma.employee.create({
      data: {
        name: employee.name,
        email: employee.email,
        jobTitle: { connect: { id: jobTitleId } },
        department: { connect: { id: departmentId } },
        salary: employee.salary,
        hireDate: employee.hireDate,
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
