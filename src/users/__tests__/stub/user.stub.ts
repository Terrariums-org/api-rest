import { UserInterface } from '../../domain/entities';

export const userStub = (): UserInterface[] => {
  return [
    {
      id: 1,
      email: 'juan@example.com',
      username: 'juanperez',
      passwordUser:
        '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      userProfile: {
        id: 1,
        name: 'Juan',
        last_name: 'Pérez',
      },
      terrariums: [
        {
          id: 1,
          codeEsp : '0123456789',
          name: 'Terrario de Juan',
          terrariumProfile: {
            id: 1,
            max_temp: 30,
            min_temp: 20,
            max_humidity: 80,
            min_humidity: 50,
            max_uv: 8,
            min_uv: 2,
          },
        },
      ],
    },
    {
      id: 2,
      email: 'ana@example.com',
      username: 'anamartinez',
      passwordUser:
        '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      userProfile: {
        id: 2,
        name: 'Ana',
        last_name: 'Martínez',
      },
      terrariums: [
        {
          id: 2,
          codeEsp : '0123456789',
          name: 'Terrario de Ana',
          terrariumProfile: {
            id: 2,
            max_temp: 39,
            min_temp: 10,
            max_humidity: 50,
            min_humidity: 20,
            max_uv: 20,
            min_uv: 5,
          },
        },
      ],
    },
    {
      id: 3,
      email: 'pedro@example.com',
      username: 'pedrogonzalez',
      passwordUser:
        '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      userProfile: {
        id: 3,
        name: 'Pedro',
        last_name: 'González',
      },
      terrariums: [
        {
          id: 3,
          codeEsp : '0123456789',
          name: 'Terrario de Pedro',
          terrariumProfile: {
            id: 3,
            max_temp: 20,
            min_temp: 10,
            max_humidity: 30,
            min_humidity: 10,
            max_uv: 25,
            min_uv: 3,
          },
        },
        {
          id: 4,
          codeEsp : '0123456789',
          name: 'Terrario de Pedro 2',
          terrariumProfile: {
            id: 4,
            max_temp: 40,
            min_temp: 5,
            max_humidity: 50,
            min_humidity: 30,
            max_uv: 50,
            min_uv: 25,
          },
        },
      ],
    },
  ];
};
