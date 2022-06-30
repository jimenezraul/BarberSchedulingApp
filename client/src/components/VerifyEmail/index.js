const VerifyEmail = (props) => {
  const { user } = props;
  return (
    <div className='py-2 px-3 align-middle flex justify-center min-w-full mb-32'>
      <div className='bg-gray-800 shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600 text-center py-10 px-2'>
        <h1 className='text-gray-50 text-2xl border-b border-gray-600 pb-4'>
          Please verify your email address
        </h1>
        <div className="pt-4">
          <p className='text-gray-50'>
            We've sent you an email to{" "}
            <span className='font-bold'>{user.email}</span>
          </p>
          <p className='text-gray-50'>
            Please click the link in the email to verify your email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
