"use client";
import Link from "next/link";
import AuthInfo from "./AuthInfo";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];
  return (
    <div>
      <div className="navbar border-b-3 border-gray-200 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      pathName === link.href
                        ? "text-blue-600 font-bold border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">BookNook</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    pathName === link.href
                      ? "text-blue-600 font-bold border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end gap-1.5">
          <AuthInfo></AuthInfo>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
