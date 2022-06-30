import Loader from "../components/Loader";
import PriceTable from "../components/PriceTable";
import { useEffect, useState } from "react";
import { get_services, get_categories, get_all_services } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

const Prices = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();
      const services = await get_all_services(token);
      setAllServices(services);
    }
    fetchData();
  }, [getAccessTokenSilently]);
  return (
    <div className='mt-16 pt-3 text-gray-200 min-h-screen w-full p-2'>
      <div className='flex flex-col w-full overflow-y-auto'>
        <div className='flex justify-center w-full text-center'>
          <div className='flex justify-center text-gray-300 shadow-lg bg-gray-800 py-3 rounded-lg border border-gray-600 text-1xl font-bold w-10/12 md:w-8/12 lg:w-5/12 mb-2'>
            Services
          </div>
        </div>
        {!allServices.length ? (
          <div className='py-2 px-3 align-middle flex justify-center min-w-full mb-32'>
            <div className='shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600'>
              <table className='min-w-full'>
                <thead className='bg-gray-800'>
                  <tr>
                    <th
                      scope='col'
                      className='flex justify-center font-bold text-center px-10 py-3 text-gray-500 dark:text-gray-200 text-1xl'
                    >
                      <Loader />
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        ) : (
          <div>
            {allServices.map((service) => (
              <div className='py-2 px-3 align-middle flex justify-center min-w-full'>
                <div className='shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600'>
                  <table
                    key={service.key}
                    className='min-w-full divide-y divide-gray-600'
                  >
                    <thead className='bg-gray-800'>
                      <tr>
                        <th
                          scope='col'
                          className='font-bold text-center px-10 py-3 text-gray-200 text-1xl border-r border-gray-600'
                        >
                          {service.categoryName}
                        </th>
                        <th
                          scope='col'
                          className='font-bold text-center px-6 py-3 text-gray-200 text-1xl'
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    {service.services.map((service) => (
                      <PriceTable
                        key={service.key}
                        service_key={service.key}
                        service={service.service_name}
                        price={service.cost}
                      />
                    ))}
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prices;
