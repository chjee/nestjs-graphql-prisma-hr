import { Test, TestingModule } from '@nestjs/testing';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesService } from '../employees/employees.service';
import {
  job,
  jobs,
  createJobInput,
  updateJobInput,
  employees,
} from '../common/constants/jest.constants';

describe('JobsResolver', () => {
  let jobsResolver: JobsResolver;
  let jobsService: JobsService;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, JobsResolver, JobsService, EmployeesService],
    }).compile();

    jobsResolver = moduleRef.get<JobsResolver>(JobsResolver);
    jobsService = moduleRef.get<JobsService>(JobsService);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
  });

  describe('create', () => {
    it('should create a job', async () => {
      jest.spyOn(jobsService, 'create').mockImplementation(async () => job);
      expect(await jobsResolver.createJob(createJobInput)).toBe(job);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      jest.spyOn(jobsService, 'findAll').mockImplementation(async () => jobs);
      expect(await jobsResolver.findAll(0, 10)).toBe(jobs);
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      jest.spyOn(jobsService, 'findOne').mockImplementation(async () => job);
      expect(await jobsResolver.findOne('AC_MGR')).toBe(job);
    });
  });

  describe('employees', () => {
    it('should return an array of employees', async () => {
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await jobsResolver.employees('AC_MGR')).toBe(employees);
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      jest.spyOn(jobsService, 'update').mockImplementation(async () => job);
      expect(await jobsResolver.updateJob('AC_MGR', updateJobInput)).toBe(job);
    });
  });

  describe('delete', () => {
    it('should delete a job', async () => {
      jest.spyOn(jobsService, 'remove').mockImplementation(async () => job);
      expect(await jobsResolver.removeJob('AC_MGR')).toBe(job);
    });
  });
});
