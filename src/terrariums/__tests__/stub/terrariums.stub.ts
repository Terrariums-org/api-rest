import { CreateTerrariumDto } from '../../domain/dto';

export const terrariumsStub = (): CreateTerrariumDto[] => {
  return [
    {
      id: 1,
      name: 'Terrario de Juan',
      user: {
        id: 1,
        email: 'juan@example.com',
        passwordUser:
          '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
        username: 'juanperez',
      },
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
    {
      id: 2,
      name: 'Terrario de Ana',
      user: {
        id: 2,
        email: 'ana@example.com',
        username: 'anamartinez',
        passwordUser:
          '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      },
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
    {
      id: 3,
      name: 'Terrario de Pedro',
      user: {
        id: 3,
        email: 'pedro@example.com',
        username: 'pedrogonzalez',
        passwordUser:
          '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      },
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
      name: 'Terrario de Pedro 2',
      user: {
        id: 3,
        email: 'pedro@example.com',
        username: 'pedrogonzalez',
        passwordUser:
          '$2b$10$.ITQwExDexLNa9/ZHy2IauMeqq0zUQu8Mx4A4gN7UpxPgCNPU7wjO', //el valor decodificado es 'contraseña'
      },
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
  ];
};
