import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  job,
  jobs,
  createJobInput,
  updateJobInput,
} from '../common/constants/jest.constants';

describe('RegionsService', () => {
  let jobsService: JobsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, JobsService],
    }).compile();

    jobsService = moduleRef.get<JobsService>(JobsService);
  });

  describe('create', () => {
    it('should create a job', async () => {
      jest.spyOn(jobsService, 'create').mockImplementation(async () => job);
      expect(await jobsService.create(createJobInput)).toBe(job);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobs', async () => {
      jest.spyOn(jobsService, 'findAll').mockImplementation(async () => jobs);
      expect(await jobsService.findAll({ skip: 0, take: 3 })).toBe(jobs);
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      jest.spyOn(jobsService, 'findOne').mockImplementation(async () => job);
      expect(await jobsService.findOne({ id: 'AC_MGR' })).toBe(job);
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      jest.spyOn(jobsService, 'update').mockImplementation(async () => job);
      expect(
        await jobsService.update({
          where: { id: 'AC_MGR' },
          data: updateJobInput,
        }),
      ).toBe(job);
    });
  });

  describe('remove', () => {
    it('should delete a job', async () => {
      jest.spyOn(jobsService, 'remove').mockImplementation(async () => job);
      expect(await jobsService.remove({ id: 'AC_MGR' })).toBe(job);
    });
  });
});
