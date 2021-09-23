import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

export const resolver = <T>(schema: AnyObjectSchema) => {
  return useForm<T>({
    resolver: yupResolver(schema),
  });
};
