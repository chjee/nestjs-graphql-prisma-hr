import { Country, Region, Location, Job, Profile, User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateUserInput } from './../../users/dto/create-user.input';
import { UpdateUserInput } from './../../users/dto/update-user.input';
import { CreateRegionInput } from './../../regions/dto/create-region.input';
import { UpdateRegionInput } from './../../regions/dto/update-region.input';
import { CreateCountryInput } from './../../countries/dto/create-country.input';
import { UpdateCountryInput } from './../../countries/dto/update-country.input';
import { CreateLocationInput } from './../../locations/dto/create-location.input';
import { UpdateLocationInput } from './../../locations/dto/update-location.input';
import { CreateProfileInput } from './../../profiles/dto/create-profile.input';
import { UpdateProfileInput } from './../../profiles/dto/update-profile.input';

export const region: Region = {
  id: 5,
  name: 'Antarctica',
};
export const regions: Region[] = [region];

export const createRegionInput: CreateRegionInput = {
  id: 5,
  name: 'Antarctica',
};

export const updateRegionInput: UpdateRegionInput = {
  name: 'Antarctic Continent',
};

export const country: Country = {
  id: 'KR',
  name: 'Republic of Korea',
  regionId: 3,
};
export const countries: Country[] = [country];

export const createCountryInput: CreateCountryInput = {
  id: 'KR',
  name: 'Korea',
  regionId: 3,
};

export const updateCountryInput: UpdateCountryInput = {
  name: 'Republic of Korea',
  regionId: 3,
};

export const location: Location = {
  id: 1100,
  streetAddress: '93091 Calle della Testa',
  postalCode: '10934',
  city: 'Venice',
  stateProvince: 'Venice',
  countryId: 'IT',
};
export const locations: Location[] = [location];

export const createLocationInput: CreateLocationInput = {
  streetAddress: '93091 Calle della Testa',
  postalCode: '10934',
  city: 'Venice',
  stateProvince: 'Venice',
  countryId: 'IT',
};

export const updateLocationInput: UpdateLocationInput = {
  streetAddress: '93091 Calle della Testa',
  postalCode: '10934',
  city: 'Venice',
  stateProvince: 'Venice',
  countryId: 'IT',
};

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

export const createProfileInput: CreateProfileInput = {
  bio: 'Happy',
  userId: 1,
};

export const updateProfileInput: UpdateProfileInput = {
  bio: 'Soso',
};

export const user: User = {
  id: 1,
  createdAt: new Date(),
  email: 'andrew@prisma.io',
  name: 'Andrew',
  password: 'whoami',
  role: 'ADMIN',
};
export const users: User[] = [user];

export const createUserInput: CreateUserInput = {
  email: 'chjee@naver.com',
  name: 'Andrew',
  password: '123456',
  role: 'ADMIN',
};

export const updateUserInput: UpdateUserInput = {
  role: 'USER',
};
