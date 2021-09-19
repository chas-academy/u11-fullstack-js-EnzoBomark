const index = () => {
  return <></>;
};

export const getStaticProps = async () => {
  return {
    redirect: { destination: '/home' },
  };
};

export default index;
