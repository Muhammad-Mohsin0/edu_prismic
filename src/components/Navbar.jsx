import { PrismicImage, PrismicLink, useAllPrismicDocumentsByType } from "@prismicio/react";
import { GoChevronDown } from "react-icons/go";

const Navbar = () => {
  const [documents] = useAllPrismicDocumentsByType("navbar_section");

  if (!documents || documents.length === 0) {
    console.log("No navbar section document found");
    return null;
  }

  const document = documents[0];
  const { logo, main_navigation, button } = document.data;

  const buttonData = button && button.length > 0 ? button[0] : null;

  // Submenu data
  const submenus = {
    Pages: ["About", "Instructor", "Event", "404"],
    Courses: ["Single Course"],
    Blog: ["Single Blog"],
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex items-center justify-between py-6">
          {/* Logo Section */}
          <PrismicImage field={logo} className="h-14 w-auto rounded-full" fallback="Logo" />

          {/* Navigation Links (Centered) */}
          <div className="hidden lg:flex space-x-8">
            {main_navigation?.map((item, index) => {
              const submenu = submenus[item.link_text]; // Check for submenus
              return (
                <div key={index} className="relative group">
                  <PrismicLink
                    field={item.link_url}
                    className="text-lg text-gray-600 flex items-center gap-3 hover:text-gray-800"
                  >
                    {item.link_text}
                    {submenu && <GoChevronDown />}
                  </PrismicLink>

                  {/* Dropdown Menu */}
                  {submenu && (
                    <div className="absolute left-0  hidden group-hover:flex flex-col w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5 z-50">
                      {submenu.map((submenuItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2  text-base text-gray-600 hover:bg-[#f1cbcd] hover:rounded-md"
                        >
                          {submenuItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Button Label */}
          {buttonData && (
            <PrismicLink
              field={buttonData.button_url}
              className="px-6 py-3 text-lg font-medium text-white bg-[#ff7e84] rounded-md border-4 border-transparent hover:border-[#da7a47] transition-all duration-300 hidden lg:block"
            >
              {buttonData.button_label}
            </PrismicLink>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
