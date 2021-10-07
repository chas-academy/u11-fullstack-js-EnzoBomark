import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export const resolver = <T>(schema: AnyObjectSchema) => {
  return useForm<T>({
    resolver: yupResolver(schema),
  });
};
