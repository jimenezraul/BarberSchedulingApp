import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className='bg-img flex'>
        <div className='container mx-auto md:px-14 mt-5 flex'>
          <div className='flex-1 flex flex-col justify-center'>
            <div className='w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mx-auto'>
              <h1 className='mb-2 font-bold text-3xl text-gray-100 my-font2 outline-4'>
                Welcome
              </h1>
              <h1 className='shadow-lg mb-5 border border-gray-500 rounded-full bg-gray-800 filter drop-shadow-lg text-center font-bold py-2 text-4xl text-gray-300 my-font'>
                <span className='text-red-600'>Raul</span>
                TheBarber
              </h1>
              <Link
                to='/booknow'
                className='block text-center text-gray-200 hover:bg-gray-200 hover:text-gray-700 font-bold rounded-full border py-2 text-2xl my-font2 uppercase'
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <div className='flex flex-wrap justify-center py-10'>
          <div className='w-10/12 md:w-3/12 p-1'>
            <img
              className='mx-auto rounded-lg'
              src='/assets/img/IMG_3391.png'
              alt=''
            />
          </div>
          <div className='w-5/12 md:w-3/12 p-1'>
            <img
              className='mx-auto rounded-lg'
              src='/assets/img/IMG_3392.png'
              alt=''
            />
          </div>
          <div className='w-5/12 md:w-3/12 p-1'>
            <img
              className='mx-auto rounded-lg'
              src='/assets/img/IMG_3393.png'
              alt=''
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
