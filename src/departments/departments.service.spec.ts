import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  department,
  departments,
  createDepartmentInput,
  updateDepartmentInput,
} from '../common/constants/jest.constants';

describe('DepartmentsService', () => {
  let departmentsService: DepartmentsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, DepartmentsService],
    }).compile();

    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
  });

  describe('create', () => {
    it('should create a department', async () => {
      jest
        .spyOn(departmentsService, 'create')
        .mockImplementation(async () => department);
      expect(await departmentsService.create(createDepartmentInput)).toBe(
        department,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      jest
        .spyOn(departmentsService, 'findAll')
        .mockImplementation(async () => departments);
      expect(await departmentsService.findAll({ skip: 0, take: 3 })).toBe(
        departments,
      );
    });
  });

  describe('findOne', () => {
    it('should return a department by id', async () => {
      jest
        .spyOn(departmentsService, 'findOne')
        .mockImplementation(async () => department);
      expect(await departmentsService.findOne({ id: 1 })).toBe(department);
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      jest
        .spyOn(departmentsService, 'update')
        .mockImplementation(async () => department);
      expect(
        await departmentsService.update({
          where: { id: 1 },
          data: updateDepartmentInput,
        }),
      ).toBe(department);
    });
  });

  describe('remove', () => {
    it('should delete a department', async () => {
      jest
        .spyOn(departmentsService, 'remove')
        .mockImplementation(async () => department);
      expect(await departmentsService.remove({ id: 1 })).toBe(department);
    });
  });
});
