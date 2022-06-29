import Loader from "../components/Loader";
import PriceTable from "../components/PriceTable";
import { useEffect, useState } from "react";
import { get_services, get_categories } from "../api";

const Prices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get_services()
      .then((data) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
    get_categories().then((data) => {
      setCategories(data);
    });
  }, []);

  let kid, men, other;
  let menServices, kidServices, otherServices;
  if (!services.length) {
    menServices = "";
    kidServices = "";
    otherServices = "";
    kid = "";
    men = "";
    other = "";
  } else {
    kid = categories[1];
    men = categories[2];
    other = categories[3];
    kidServices = services
      .filter((service) =>
        kid?.serviceIdList.map((cat) => cat).includes(service.key)
      )
      .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
    menServices = services
      .filter((service) =>
        men?.serviceIdList.map((cat) => cat).includes(service.key)
      )
      .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
    otherServices = services
      .filter((service) =>
        other?.serviceIdList.map((cat) => cat).includes(service.key)
      )
      .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));
    kidServices = kidServices.map((service) => (
      <PriceTable
        service={service.service_name}
        price={service.cost}
        key={service.key}
      />
    ));
    menServices = menServices.map((service) => (
      <PriceTable
        service={service.service_name}
        price={service.cost}
        key={service.key}
      />
    ));
    otherServices = otherServices.map((service) => (
      <PriceTable
        service={service.service_name}
        price={service.cost}
        key={service.key}
      />
    ));
  }
  return (
      <div className='mt-16 pt-3 text-gray-200 min-h-screen w-full p-2'>
      <div className='flex flex-col w-full overflow-y-auto'>
        <div className='flex justify-center w-full text-center'>
          <div className='flex justify-center text-gray-300 shadow-lg bg-gray-800 py-3 rounded-lg border border-gray-600 text-1xl font-bold w-10/12 md:w-8/12 lg:w-5/12 mb-2'>
                      Services
          </div>
        </div>
        {!services.length ? (
            <div className="py-2 px-3 align-middle flex justify-center min-w-full mb-32">
              <div className="shadow-lg overflow-hidden border-gray-200 w-full md:w-9/12 lg:w-6/12 rounded-lg border dark:border-gray-600">
                <table className="min-w-full divide-y divide-gray-600">
                  <thead className="bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="flex justify-center font-bold text-center px-10 py-3 text-gray-500 dark:text-gray-200 text-1xl border-r border-gray-300 dark:border-gray-600"
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
            <div className='py-2 px-3 align-middle flex justify-center min-w-full mb-10'>
              <div className='shadow-lg overflow-hidden w-full md:w-9/12 lg:w-6/12 rounded-lg border border-gray-600'>
                <table className='min-w-full divide-y divide-gray-600'>
                  <thead className='bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='font-bold text-center px-10 py-3 text-gray-200 text-1xl border-r border-gray-600'
                      >
                        {men?.categoryName}
                      </th>
                      <th
                        scope='col'
                        className='font-bold text-center px-6 py-3 text-gray-200 text-1xl'
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  {menServices}
                  <thead className='bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='font-bold text-center px-10 py-3 text-gray-200 text-1xl border-r border-gray-600'
                      >
                        {kid?.categoryName}
                      </th>
                      <th
                        scope='col'
                        className='font-bold text-center px-6 py-3 text-gray-200 text-1xl'
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  {kidServices}
                  <thead className='bg-gray-800'>
                    <tr>
                      <th
                        scope='col'
                        className='font-bold text-center px-10 py-3 text-gray-200 text-1xl border-r border-gray-600'
                      >
                        {other?.categoryName}
                      </th>
                      <th
                        scope='col'
                        className='font-bold text-center px-6 py-3 text-gray-200 text-1xl'
                      >
                        Price
                      </th>
                    </tr>
                  </thead>
                  {otherServices}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prices;
