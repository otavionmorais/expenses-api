import { User } from './users.entity';

export const userMock = new User();

Object.assign(userMock, {
  id: '957e79fd-a744-44d9-894a-ec21f95e2774',
  name: 'Example User',
  email: 'exampleuser@mailprovider.com',
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
});
