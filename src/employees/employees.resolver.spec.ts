import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma/prisma.service';
import { JobsService } from '../jobs/jobs.service';
import { DepartmentsService } from '../departments/departments.service';
import {
  employee,
  employees,
  createEmployeeInput,
  updateEmployeeInput,
  job,
  department,
} from '../common/constants/jest.constants';

describe('EmployeesResolver', () => {
  let employeesResolver: EmployeesResolver;
  let employeesService: EmployeesService;
  let jobsService: JobsService;
  let departmentsService: DepartmentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        EmployeesResolver,
        EmployeesService,
        JobsService,
        DepartmentsService,
      ],
    }).compile();

    employeesResolver = moduleRef.get<EmployeesResolver>(EmployeesResolver);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    jobsService = moduleRef.get<JobsService>(JobsService);
    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
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
  });

  describe('otherEmployees', () => {
    it('should return an array of employees', async () => {
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await employeesResolver.otherEmployees(employee)).toBe(employees);
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
