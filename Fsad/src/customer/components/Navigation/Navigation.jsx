import { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { navigation } from "./NavigationData";

import { useNavigate, useLocation } from "react-router-dom"; // updated import
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const [open, setOpen] = useState(false);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);

  // inside Navigation component
  const navigate = useNavigate();
  const location = useLocation(); // new
  
  const handleCartClick = () => {
    if (location.pathname === "/cart") {
      navigate(-1); // go back
    } else {
      navigate("/cart"); // go to cart
    }
  };
  
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
    setOpen(false);
  };

  return (
    <div className="bg-white pb-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="mb-2 px-4 flex space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>

                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <p
                                onClick={() => handleCategoryClick(category.id)}
                                className="block mt-2 font-medium text-gray-900 cursor-pointer"
                              >
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">Shop now</p>
                            </div>
                          ))}
                        </div>

                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p className="font-medium text-gray-900">{section.name}</p>
                            <ul className="mt-6 flex flex-col space-y-6">
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="cursor-pointer p-2 text-gray-500 hover:text-gray-800"
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop navigation */}
      <header className="relative bg-white">
        <p className="flex h-12 items-center justify-center font-semibold bg-gradient-to-r from-[#7fb0d6] via-[#aacbe4] to-[#d4e5f2] text-[#1f2937] tracking-wide shadow-md">
          Freshness Delivered, Happiness Guaranteed!
        </p>

        <nav className="mx-auto">
          <div className="border-b border-[#7fb0d6]">
            <div className="flex h-16 items-center px-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div
                onClick={() => navigate("/")}
                className="ml-4 flex lg:ml-0 cursor-pointer"
              >
                <img
                  alt="Your Company"
                  src="./images/logo.png"
                  className="h-10 w-auto"
                />
              </div>

              {/* Categories */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-6">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="relative flex items-center">
                      <Popover.Button className="flex items-center justify-center px-4 py-1 rounded-[20px] border-1 border-[#3e7089] bg-gradient-to-r from-[#7fb0d6] to-[#d4e5f2] text-sm font-medium text-gray-700 leading-none shadow-md hover:shadow-lg hover:text-gray-900">
                        {category.name}
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-0 z-10 mt-3 w-screen max-w-md px-2 sm:px-0 top-full">
                          {({ close }) => (
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-gradient-to-r from-[#7fb0d6] to-[#d4e5f2] px-5 py-6 sm:gap-8 sm:p-8">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p className="font-medium text-gray-900">{section.name}</p>
                                    <ul className="mt-2 space-y-2">
                                      {section.items.map((item) => (
                                        <li key={item.name}>
                                          <p
                                            onClick={() => {
                                              handleCategoryClick(category.id);
                                              close();
                                            }}
                                            className="cursor-pointer text-gray-600 hover:text-gray-800"
                                          >
                                            {item.name}
                                          </p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </Popover>
                  ))}
                </div>
              </div>

              {/* Right icons */}
              <div className="ml-auto flex items-center space-x-4">
                {/* Custom Avatar */}
                <>
                  <Avatar
                    src="/images/user.png"
                    sx={{ cursor: "pointer", width: 40, height: 40 }}
                    onClick={handleUserClick}
                  />
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button onClick={() => navigate("/account/order")}>My Orders</Button>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
                  </Menu>
                </>

                {/* Search */}
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Cart Image */}
                <img
                  src="/images/cart.png"
                  alt="Cart"
                  onClick={handleCartClick} 
                  className="h-9 w-9 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
