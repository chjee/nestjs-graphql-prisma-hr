import { Country, Region, Location, Job, Profile, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const country: Country = {
  id: 'KR',
  name: 'Republic of Korea',
  regionId: 3,
};
export const countries: Country[] = [country];

export const region: Region = {
  id: 5,
  name: 'Antarctica',
};
export const regions: Region[] = [region];

export const location: Location = {
  id: 1100,
  streetAddress: '93091 Calle della Testa',
  postalCode: '10934',
  city: 'Venice',
  stateProvince: 'Venice',
  countryId: 'IT',
};
export const locations: Location[] = [location];

export const job: Job = {
  id: 'AC_MGR',
  title: 'Accounting Manager',
  minSalary: new Decimal(100000),
  maxSalary: new Decimal(200000),
};
export const jobs: Job[] = [job];

export const profile: Profile = {
  id: 1,
  bio: 'Happy',
  userId: 1,
};
export const profiles: Profile[] = [profile];

export const user: User = {
  id: 1,
  createdAt: new Date(),
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: 'ADMIN',
};
export const users: User[] = [user];
