import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const { userId } = useAuth();

  const router = useRouter();

  return (
    <div>
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center sm:pl-8 lg:pl-0">
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white">
              Online Marketplace
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              <li>
                <Link
                  href="/"
                  className={
                    "block rounded py-2 pl-3 pr-4  dark:text-white md:p-0 " +
                    `${
                      router.pathname === "/"
                        ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                        : "text-gray-900"
                    }`
                  }
                >
                  Browse
                </Link>
              </li>
              {userId && (
                <>
                  <li>
                    <Link
                      href="/sell-product"
                      className={
                        "block rounded py-2 pl-3 pr-4 hover:opacity-80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 " +
                        `${
                          router.pathname === "/sell-product"
                            ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700"
                            : "text-gray-900"
                        }`
                      }
                    >
                      Sell A Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/offers"
                      className={
                        "block rounded py-2 pl-3 pr-4 hover:opacity-80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 " +
                        `${
                          router.pathname === "/offers"
                            ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700"
                            : "text-gray-900"
                        }`
                      }
                    >
                      Offers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className={
                        "block rounded py-2 pl-3 pr-4 hover:opacity-80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 " +
                        `${
                          router.pathname === "/cart"
                            ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700"
                            : "text-gray-900"
                        }`
                      }
                    >
                      Cart
                    </Link>
                  </li>
                </>
              )}
              <li>
                <a
                  href="/about"
                  className={
                    "block rounded py-2 pl-3 pr-4 hover:opacity-80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 " +
                    `${
                      router.pathname === "/about"
                        ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700"
                        : "text-gray-900"
                    }`
                  }
                >
                  About
                </a>
              </li>

              <li>
                <div className="block rounded py-2 pl-3 pr-4 hover:opacity-80 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">
                  <UserButton />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
