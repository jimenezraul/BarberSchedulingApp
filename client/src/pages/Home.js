import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className='bg-img flex'>
        <div className='container mx-auto md:px-14 mt-5 flex'>
          <div className='flex-1 flex flex-col justify-center'>
            <div className='w-11/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mx-auto mt-24'>
              <h1 className='mb-2 font-bold text-3xl text-gray-100 my-font2 outline-4'>
                Welcome
              </h1>
              <h1 className='shadow-lg mb-5 border border-gray-500 rounded-full bg-gray-800 filter drop-shadow-lg text-center font-bold py-2 text-4xl text-gray-300 my-font'>
                <span className='text-red-600'>Raul</span>
                TheBarber
              </h1>
              <Link
                to='/appointments'
                className='block text-center text-gray-200 hover:bg-gray-200 hover:text-gray-700 font-bold rounded-full border py-2 text-2xl my-font2 uppercase'
              >
                Book Now
              </Link>
              <div className='mt-6 w-full text-center'>
                <div
                  className='fb-like'
                  data-href='https://raulthebarber.net'
                  data-width=''
                  data-layout='button_count'
                  data-action='like'
                  data-size='large'
                  data-share='true'
                ></div>
                <div className='mt-5 pt-5 flex flex-wrap justify-center divide-y-2 border-t border-gray-500'>
                  <div className='w-full text-center flex justify-center items-center'>
                    <Link to='https://www.facebook.com/raulthebarber81'>
                      <i className='mr-3 text-3xl text-gray-100 bi bi-facebook'></i>
                    </Link>
                    <Link to='https://www.instagram.com/raul.thebarber/'>
                      <i className='ml-3 text-3xl text-gray-100 bi bi-instagram'></i>
                    </Link>
                  </div>
                </div>
              </div>
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
