import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma/prisma.service';
import { JobsService } from '../jobs/jobs.service';
import { DepartmentsService } from '../departments/departments.service';
import { JobhistoriesService } from '../jobhistories/jobhistories.service';
import {
  employee,
  employees,
  createEmployeeInput,
  updateEmployeeInput,
  job,
  department,
  jobHistories,
} from '../common/constants/jest.constants';

describe('EmployeesResolver', () => {
  let employeesResolver: EmployeesResolver;
  let employeesService: EmployeesService;
  let jobsService: JobsService;
  let departmentsService: DepartmentsService;
  let jobhistoriesService: JobhistoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        EmployeesResolver,
        EmployeesService,
        JobsService,
        DepartmentsService,
        JobhistoriesService,
      ],
    }).compile();

    employeesResolver = moduleRef.get<EmployeesResolver>(EmployeesResolver);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    jobsService = moduleRef.get<JobsService>(JobsService);
    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
    jobhistoriesService =
      moduleRef.get<JobhistoriesService>(JobhistoriesService);
  });

  describe('create', () => {
    it('should create an employee', async () => {
      jest
        .spyOn(employeesService, 'create')
        .mockImplementation(async () => employee);
      expect(await employeesResolver.createEmployee(createEmployeeInput)).toBe(
        employee,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await employeesResolver.findAll(0, 10)).toBe(employees);
    });
  });

  describe('findOne', () => {
    it('should return an employee by id', async () => {
      jest
        .spyOn(employeesService, 'findOne')
        .mockImplementation(async () => employee);
      expect(await employeesResolver.findOne(100)).toBe(employee);
    });
  });

  describe('job', () => {
    it('should return a job', async () => {
      jest.spyOn(jobsService, 'findOne').mockImplementation(async () => job);
      expect(await employeesResolver.job(employee)).toBe(job);
    });
  });

  describe('department', () => {
    it('should return a department', async () => {
      jest
        .spyOn(departmentsService, 'findOne')
        .mockImplementation(async () => department);
      expect(await employeesResolver.department(employee)).toBe(department);
    });

    it('should return null without lookup when departmentId is null', async () => {
      const findOneSpy = jest.spyOn(departmentsService, 'findOne');

      expect(
        await employeesResolver.department({ ...employee, departmentId: null }),
      ).toBeNull();
      expect(findOneSpy).not.toHaveBeenCalled();
    });
  });

  describe('manager', () => {
    it('should return an employee manager', async () => {
      jest
        .spyOn(employeesService, 'findOne')
        .mockImplementation(async () => employee);
      expect(await employeesResolver.manager(employee)).toBe(employee);
    });

    it('should return null without lookup when managerId is null', async () => {
      const findOneSpy = jest.spyOn(employeesService, 'findOne');

      expect(
        await employeesResolver.manager({ ...employee, managerId: null }),
      ).toBeNull();
      expect(findOneSpy).not.toHaveBeenCalled();
    });
  });

  describe('otherEmployees', () => {
    it('should return an array of employees', async () => {
      const findAllSpy = jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await employeesResolver.otherEmployees(employee, 2, 5)).toBe(
        employees,
      );
      expect(findAllSpy).toHaveBeenCalledWith({
        skip: 2,
        take: 5,
        where: { managerId: employee.id },
      });
    });
  });

  describe('jobHistories', () => {
    it('should return an array of jobHistories', async () => {
      const findAllSpy = jest
        .spyOn(jobhistoriesService, 'findAll')
        .mockImplementation(async () => jobHistories);
      expect(await employeesResolver.jobHistories(employee, 2, 5)).toBe(
        jobHistories,
      );
      expect(findAllSpy).toHaveBeenCalledWith({
        skip: 2,
        take: 5,
        where: { employeeId: employee.id },
      });
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      jest
        .spyOn(employeesService, 'update')
        .mockImplementation(async () => employee);
      expect(
        await employeesResolver.updateEmployee(100, updateEmployeeInput),
      ).toBe(employee);
    });
  });

  describe('remove', () => {
    it('should delete an employee by id', async () => {
      jest
        .spyOn(employeesService, 'remove')
        .mockImplementation(async () => employee);
      expect(await employeesResolver.removeEmployee(100)).toBe(employee);
    });
  });
});
