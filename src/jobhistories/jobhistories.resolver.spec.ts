import { Test, TestingModule } from '@nestjs/testing';
import { JobhistoriesResolver } from './jobhistories.resolver';
import { JobhistoriesService } from './jobhistories.service';
import { DepartmentsService } from '../departments/departments.service';
import { EmployeesService } from '../employees/employees.service';
import { JobsService } from '../jobs/jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  jobHistory,
  jobHistories,
  job,
  employee,
  department,
} from '../common/constants/jest.constants';

describe('JobhistoriesResolver', () => {
  let jobhistoriesResolver: JobhistoriesResolver;
  let jobhistoriesService: JobhistoriesService;
  let jobsService: JobsService;
  let employeesService: EmployeesService;
  let departmentsService: DepartmentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        JobhistoriesResolver,
        JobhistoriesService,
        JobsService,
        EmployeesService,
        DepartmentsService,
      ],
    }).compile();

    jobhistoriesResolver =
      moduleRef.get<JobhistoriesResolver>(JobhistoriesResolver);
    jobhistoriesService =
      moduleRef.get<JobhistoriesService>(JobhistoriesService);
    jobsService = moduleRef.get<JobsService>(JobsService);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
  });

  describe('create', () => {
    it('should create a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'create')
        .mockImplementation(async () => jobHistory);
      expect(await jobhistoriesResolver.createJobhistory(jobHistory)).toBe(
        jobHistory,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of jobhistories', async () => {
      jest
        .spyOn(jobhistoriesService, 'findAll')
        .mockImplementation(async () => jobHistories);
      expect(await jobhistoriesResolver.findAll(0, 10)).toBe(jobHistories);
    });
  });

  describe('findOne', () => {
    it('should return a jobhistory by id', async () => {
      jest
        .spyOn(jobhistoriesService, 'findOne')
        .mockImplementation(async () => jobHistory);
      expect(
        await jobhistoriesResolver.findOne(100, new Date('2001-09-17')),
      ).toBe(jobHistory);
    });
  });

  describe('job', () => {
    it('should return a job', async () => {
      jest.spyOn(jobsService, 'findOne').mockImplementation(async () => job);
      expect(await jobhistoriesResolver.job(jobHistory)).toBe(job);
    });
  });

  describe('employee', () => {
    it('should return an employee', async () => {
      jest
        .spyOn(employeesService, 'findOne')
        .mockImplementation(async () => employee);
      expect(await jobhistoriesResolver.employee(jobHistory)).toBe(employee);
    });
  });

  describe('department', () => {
    it('should return a department', async () => {
      jest
        .spyOn(departmentsService, 'findOne')
        .mockImplementation(async () => department);
      expect(await jobhistoriesResolver.department(jobHistory)).toBe(
        department,
      );
    });
  });

  describe('remove', () => {
    it('should remove a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'remove')
        .mockImplementation(async () => jobHistory);
      expect(
        await jobhistoriesResolver.removeJobhistory(
          100,
          new Date('2001-09-17'),
        ),
      ).toBe(jobHistory);
    });
  });
});
