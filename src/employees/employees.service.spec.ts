import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  employee,
  employees,
  createEmployeeInput,
  updateEmployeeInput,
} from '../common/constants/jest.constants';

describe('EmployeesService', () => {
  let employeesService: EmployeesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, EmployeesService],
    }).compile();

    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
  });

  describe('create', () => {
    it('should create an employee', async () => {
      jest
        .spyOn(employeesService, 'create')
        .mockImplementation(async () => employee);
      expect(await employeesService.create(createEmployeeInput)).toBe(employee);
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await employeesService.findAll({ skip: 0, take: 10 })).toBe(
        employees,
      );
    });
  });

  describe('findOne', () => {
    it('should return an employee by id', async () => {
      jest
        .spyOn(employeesService, 'findOne')
        .mockImplementation(async () => employee);
      expect(await employeesService.findOne({ id: 100 })).toBe(employee);
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      jest
        .spyOn(employeesService, 'update')
        .mockImplementation(async () => employee);
      expect(
        await employeesService.update({
          where: { id: 100 },
          data: updateEmployeeInput,
        }),
      ).toBe(employee);
    });
  });

  describe('remove', () => {
    it('should delete an employee by id', async () => {
      jest
        .spyOn(employeesService, 'remove')
        .mockImplementation(async () => employee);
      expect(await employeesService.remove({ id: 100 })).toBe(employee);
    });
  });
});
