import { InputStyle } from '../../styles/ui/form-elements/Input.style';
import { DarkFormButton } from '../../styles/ui/buttons/dark-form-button.style';
import { ForgotPasswordStyle } from './ForgotPassword.style';
import { object, string, number, InferType, ref } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { POST } from '../../helpers/Rest.helper';

const schema = object({
  email: string().email('Email must be a valid email address').required('Email is required'),
});

const formSubmitHandler = async (values: Props) => {
  const response = await POST('auth/forgot-password', values);

  console.log(response);
};

type Props = InferType<typeof schema>;

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(schema),
  });

  return (
    <ForgotPasswordStyle>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div>
          <InputStyle>
            <label htmlFor="email">
              <span>Email</span>
              <input placeholder="jane.doe@email.com" id="email" {...register('email')} />
            </label>
            <span>{errors?.email?.message}</span>
          </InputStyle>
        </div>
        <div>
          <DarkFormButton>Submit</DarkFormButton>
        </div>
      </form>
    </ForgotPasswordStyle>
  );
};

export default ForgotPassword;