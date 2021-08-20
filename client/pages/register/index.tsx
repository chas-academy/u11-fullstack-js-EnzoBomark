import { InputStyle } from '../../styles/ui/form-elements/Input.style';
import { DarkFormButton } from '../../styles/ui/buttons/dark-form-button.style';
import { RegisterStyle } from './Register.style';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = object({
  name: string().required('Name is required'),
  email: string().email('Email must be a valid email address').required('Email is required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

const formSubmitHandler = (values: Props) => {
  console.log(values);
};

type Props = InferType<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  return (
    <RegisterStyle>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div>
          <InputStyle>
            <label htmlFor="name">
              <span>Name</span>
              <input placeholder="Jane Doe" id="name" {...register('name')} />
            </label>
            <span>{errors?.name?.message}</span>
          </InputStyle>

          <InputStyle>
            <label htmlFor="email">
              <span>Email</span>
              <input placeholder="jane.doe@email.com" id="email" {...register('email')} />
            </label>
            <span>{errors?.email?.message}</span>
          </InputStyle>

          <InputStyle>
            <label htmlFor="password">
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                id="password"
                {...register('password')}
              />
            </label>
            <span>{errors?.password?.message}</span>
          </InputStyle>

          <InputStyle>
            <label htmlFor="password-confirmation">
              <span>Password Confirmation</span>
              <input
                type="password"
                placeholder="Password Confirmation"
                id="password-onfirmation"
                {...register('passwordConfirmation')}
              />
            </label>
            <span>{errors?.passwordConfirmation?.message}</span>
          </InputStyle>
        </div>
        <div>
          <DarkFormButton>Submit</DarkFormButton>
        </div>
      </form>
    </RegisterStyle>
  );
};

export default Register;
