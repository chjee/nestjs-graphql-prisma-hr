import { Test, TestingModule } from '@nestjs/testing';
import { JobhistoriesService } from './jobhistories.service';
import { PrismaService } from '../prisma/prisma.service';
import { jobHistory, jobHistories } from '../common/constants/jest.constants';

describe('JobhistoriesService', () => {
  let jobhistoriesService: JobhistoriesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, JobhistoriesService],
    }).compile();

    jobhistoriesService =
      moduleRef.get<JobhistoriesService>(JobhistoriesService);
  });

  describe('create', () => {
    it('should create a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'create')
        .mockImplementation(async () => jobHistory);
      expect(await jobhistoriesService.create(jobHistory)).toBe(jobHistory);
    });
  });

  describe('findAll', () => {
    it('should return an array of jobhistories', async () => {
      jest
        .spyOn(jobhistoriesService, 'findAll')
        .mockImplementation(async () => jobHistories);
      expect(
        await jobhistoriesService.findAll({
          skip: 0,
          take: 10,
          where: { employeeId: 100 },
          orderBy: { startedAt: 'desc' },
        }),
      ).toBe(jobHistories);
    });
  });

  describe('findOne', () => {
    it('should return a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'findOne')
        .mockImplementation(async () => jobHistory);
      expect(
        await jobhistoriesService.findOne({
          employeeId_startedAt: { employeeId: 100, startedAt: '2023-12-01' },
        }),
      ).toBe(jobHistory);
    });
  });

  describe('update', () => {
    it('should update a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'update')
        .mockImplementation(async () => jobHistory);
      expect(
        await jobhistoriesService.update({
          where: {
            employeeId_startedAt: { employeeId: 100, startedAt: '2023-12-01' },
          },
          data: { endedAt: new Date() },
        }),
      ).toBe(jobHistory);
    });
  });

  describe('remove', () => {
    it('should delete a jobhistory', async () => {
      jest
        .spyOn(jobhistoriesService, 'remove')
        .mockImplementation(async () => jobHistory);
      expect(
        await jobhistoriesService.remove({
          employeeId_startedAt: { employeeId: 100, startedAt: '2023-12-01' },
        }),
      ).toBe(jobHistory);
    });
  });
});
