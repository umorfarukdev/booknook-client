"use client";
import Link from "next/link";
import Image from "next/image";
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
    <div className="border-b-3 border-base-300 bg-base-100">
      <div className="navbar max-w-7xl mx-auto">
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
                        : "text-base-content hover:text-blue-600"
                    }
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="btn btn-ghost px-2 text-xl"
            aria-label="BookNook home"
          >
            <Image
              src="/booknook.png"
              alt="BookNook logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-bold">BookNook</span>
          </Link>
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
                      : "text-base-content hover:text-blue-600"
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
