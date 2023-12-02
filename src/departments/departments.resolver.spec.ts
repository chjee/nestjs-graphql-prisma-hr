import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsResolver } from './departments.resolver';
import { DepartmentsService } from './departments.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeesService } from '../employees/employees.service';
import { LocationsService } from '../locations/locations.service';
import {
  department,
  departments,
  createDepartmentInput,
  updateDepartmentInput,
  location,
  employee,
  employees,
} from '../common/constants/jest.constants';

describe('DepartmentsResolver', () => {
  let departmentsResolver: DepartmentsResolver;
  let departmentsService: DepartmentsService;
  let employeesService: EmployeesService;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        DepartmentsResolver,
        DepartmentsService,
        EmployeesService,
        LocationsService,
      ],
    }).compile();

    departmentsResolver =
      moduleRef.get<DepartmentsResolver>(DepartmentsResolver);
    departmentsService = moduleRef.get<DepartmentsService>(DepartmentsService);
    employeesService = moduleRef.get<EmployeesService>(EmployeesService);
    locationsService = moduleRef.get<LocationsService>(LocationsService);
  });

  describe('create', () => {
    it('should create a department', async () => {
      jest
        .spyOn(departmentsService, 'create')
        .mockImplementation(async () => department);
      expect(
        await departmentsResolver.createDepartment(createDepartmentInput),
      ).toBe(department);
    });
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      jest
        .spyOn(departmentsService, 'findAll')
        .mockImplementation(async () => departments);
      expect(await departmentsResolver.findAll(0, 10)).toBe(departments);
    });
  });

  describe('findOne', () => {
    it('should return a department by id', async () => {
      jest
        .spyOn(departmentsService, 'findOne')
        .mockImplementation(async () => department);
      expect(await departmentsResolver.findOne(10)).toBe(department);
    });
  });

  describe('location', () => {
    it('should return a location', async () => {
      jest
        .spyOn(locationsService, 'findOne')
        .mockImplementation(async () => location);
      expect(await departmentsResolver.location(department)).toBe(location);
    });
  });

  describe('manager', () => {
    it('should return an employee', async () => {
      jest
        .spyOn(employeesService, 'findOne')
        .mockImplementation(async () => employee);
      expect(await departmentsResolver.manager(department)).toBe(employee);
    });
  });

  describe('employees', () => {
    it('should return an array of employees', async () => {
      jest
        .spyOn(employeesService, 'findAll')
        .mockImplementation(async () => employees);
      expect(await departmentsResolver.employees(department)).toBe(employees);
    });
  });

  describe('update', () => {
    it('should update a department', async () => {
      jest
        .spyOn(departmentsService, 'update')
        .mockImplementation(async () => department);
      expect(
        await departmentsResolver.updateDepartment(1, updateDepartmentInput),
      ).toBe(department);
    });
  });

  describe('remove', () => {
    it('should delete a department', async () => {
      jest
        .spyOn(departmentsService, 'remove')
        .mockImplementation(async () => department);
      expect(await departmentsResolver.removeDepartment(1)).toBe(department);
    });
  });
});
