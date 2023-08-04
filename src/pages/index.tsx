"use client";
import { SignIn, useAuth } from "@clerk/nextjs";
import type { Listing } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function Card({ listing }: { listing: Listing }) {
  const addCart = api.listing.addCart.useMutation();
  const { userId } = useAuth();

  return (
    <>
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <Link href={`listings/${listing.id}`}>
          <img
            className="h-60 w-full rounded-t-lg pb-3"
            src={`https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/${listing?.name.replaceAll(
              " ",
              "-"
            )}?${Date.now()}`}
            alt={listing.name}
          />
        </Link>
        <div className="mt-3 px-5 pb-8">
          <Link href={`listings/${listing.id}`}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {listing.name}
            </h5>
          </Link>
          <div className="mb-5 mt-2.5 flex items-center">
            <svg
              className="mr-1 h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="mr-1 h-4 w-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
              className="h-4 w-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="ml-3 mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex-1 text-3xl font-bold text-gray-900 dark:text-white">
              ${listing.price}
            </span>
            <Link
              href={`listings/${listing.id}`}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View
            </Link>

            {listing.userId == userId ? (
              <button
                onClick={() =>
                  void addCart
                    .mutateAsync({
                      itemName: listing.name,
                      itemPrice: listing.price,
                    })
                    .catch((error) => console.error(error))
                }
                disabled
                className="ml-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Cart
              </button>
            ) : (
              <button
                onClick={() =>
                  addCart
                    .mutateAsync({
                      itemName: listing.name,
                      itemPrice: listing.price,
                    })
                    .catch((error) => console.error(error))
                    .then(() =>
                      toast.success(`${listing.name} is added to your cart`)
                    )
                }
                className="ml-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const { userId } = useAuth();

  const listings = api.listing.all.useQuery();

  return (
    <>
      <Head>
        <title>Online Market Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css"
          rel="stylesheet"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js"
          defer
        ></script>
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-900 px-12 py-2">
        {userId && <h1 className="my-4 text-4xl">Items for Sale</h1>}

        {!userId && (
          <div className="container flex items-center justify-center gap-4 md:grid-cols-2 md:justify-start lg:grid-cols-3 lg:justify-center">
            <SignIn />
          </div>
        )}

        {userId && listings.isLoading && <Loading />}

        {userId &&
        listings.isFetched &&
        !listings.isFetching &&
        !listings.isLoading ? (
          <div className="container grid grid-cols-1 items-center justify-start gap-4 md:grid-cols-2 md:justify-start lg:grid-cols-3 lg:justify-center">
            {listings?.data?.map((listing) => (
              <Card key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
