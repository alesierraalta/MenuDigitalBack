import { Comida } from './comida.entity';

export const comidaProviders = [
  {
    provide: 'COMIDA_REPOSITORY',
    useValue: Comida,
  },
];
