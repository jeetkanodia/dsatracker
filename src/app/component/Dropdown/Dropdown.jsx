import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ handleFilter }) {
  const menuItems = ["All", "easy", "medium", "hard"];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-white hover:bg-[#4b2770]">
          Filters
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-18 origin-top-right rounded-md bg-[#2B2B2B] shadow-lg focus:outline-none">
          <div className="">
            {menuItems.map((item, idx) => {
              return (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <div
                      onClick={() => handleFilter(item)}
                      className={classNames(
                        active ? "bg-[#3c3c3c] text-white" : "text-white ",
                        `${idx === 0 ? "rounded-t-md" : ""} ${
                          idx === menuItems.length - 1 ? "rounded-b-md" : ""
                        } block px-4 py-2 text-sm`
                      )}
                    >
                      {item}
                    </div>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
