import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth0 } from "@auth0/auth0-react";

const menu_navigation = [
  { name: "Home", href: "/", current: false },
  { name: "BookNow", href: "/booknow", current: false },
  { name: "Gallery", href: "/gallery", current: false },
  { name: "Prices", href: "/prices", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(menu_navigation);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();
  const currentpath = window.location.pathname;
  const pageClickHandler = (url) => {
    // on click set current to true
    setNavigation(
      menu_navigation.map((item) => {
        if (item.href === url) {
          return { ...item, current: true };
        }
        return item;
      })
    );
    setIsOpen(false);
  };

  useEffect(() => {
    setNavigation(
      menu_navigation.map((item) => {
        if (item.href === currentpath) {
          return { ...item, current: true };
        }
        return item;
      })
    );
  }, [currentpath]);

  const profileHandleClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      loginWithPopup();
    }
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                >
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </button>
              </div>
              <div className='flex-shrink-0 flex items-center'>
                <img
                  className='hidden md:block h-12 w-auto bg-gray-50 rounded-full'
                  src='/assets/img/Logo-face.svg'
                  alt='Workflow'
                />
              </div>
              <div className='hidden sm:block'>
                <div className='navbar flex space-x-3 border border-gray-600 bg-gray-900 rounded-full'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => pageClickHandler(item.href)}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-50 hover:bg-gray-700 hover:text-white",
                        "buttons rounded-full text-mg font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='bg-gray-400 flex text-sm rounded-full focus:outline-none border-2 border-gray-700'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-10 w-10 rounded-full'
                        src={!user ? "/assets/img/user.png" : user?.picture}
                        alt=''
                        referrerPolicy='no-referrer'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-52 rounded-md shadow-lg shadow-gray-800 py-1 border border-gray-600 bg-gray-700 focus:outline-none'>
                      {isAuthenticated ? (
                        <>
                          <p className='text-center text-sm font-medium text-gray-100 border-b border-gray-600 pb-2'>
                            {user?.given_name}
                          </p>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => profileHandleClick()}
                                className={classNames(
                                  active && "bg-gray-800 shadow-lg",
                                  "w-full px-4 py-2 text-sm text-gray-100"
                                )}
                              >
                                Your Profile
                              </button>
                            )}
                          </Menu.Item>
                          
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active && "bg-gray-800 shadow-lg",
                                  "w-full px-4 py-2 text-sm text-gray-100"
                                )}
                                onClick={() => {
                                  logout({ returnTo: window.location.origin });
                                }}
                              >
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active && "bg-gray-800",
                                "w-full px-4 py-2 text-sm text-gray-50"
                              )}
                              onClick={loginWithPopup}
                            >
                              Login
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <div className={`${!isOpen && "hidden"}`}>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  as='a'
                  to={item.href}
                  onClick={() => pageClickHandler(item.href)}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "flex flex-col text-center px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
