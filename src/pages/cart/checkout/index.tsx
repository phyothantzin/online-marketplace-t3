import type { Cart } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

function OrderItem({ orderItem }: { orderItem: Cart }) {
  return (
    <div className="flex flex-col rounded-lg bg-slate-800 sm:flex-row">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={`https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/${orderItem?.itemName.replaceAll(
          " ",
          "-"
        )}?${Date.now()}`}
        alt=""
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{orderItem.itemName}</span>
        <span className="float-right text-gray-400">{orderItem.quantity}</span>
        <p className="text-lg font-bold">${orderItem.itemPrice}</p>
      </div>
    </div>
  );
}

function PaymentMethod({ methodName }: { methodName: string }) {
  return (
    <div className="relative">
      <input
        className="peer hidden"
        id="radio_1"
        type="radio"
        name="radio"
        checked
      />
      <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
      <label
        className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-slate-950"
        htmlFor="radio_1"
      >
        <img
          className="w-14 object-contain"
          src="https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/fedex.png"
          alt=""
        />
        <div className="ml-5">
          <span className="mt-2 font-semibold">{methodName}</span>
          <p className="text-sm leading-6 text-slate-500">Delivery: 2-4 Days</p>
        </div>
      </label>
    </div>
  );
}

export default function CheckoutPage() {
  const { data, isLoading } = api.listing.getCart.useQuery();

  const deleteCart = api.listing.deleteCart.useMutation();

  const orderItems = data;
  let totalPrice = 0;
  let totalQuantity = 0;

  if (orderItems !== undefined)
    for (let i = 0; i < orderItems?.length; i++) {
      totalPrice =
        totalPrice +
        (orderItems[i]?.itemPrice ?? 0) * (orderItems[i]?.quantity ?? 0);
      totalQuantity = totalQuantity + (orderItems[i]?.quantity ?? 0);
    }

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
        {isLoading && (
          <div className="flex h-80 items-center justify-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <div className="relative overflow-x-auto">
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="px-4 pt-8">
              <p className="text-xl font-medium">Order Summary</p>
              <p className="text-gray-400">
                Check your items. And select a suitable shipping method.
              </p>
              <div className="mt-8 space-y-3 rounded-lg border bg-transparent px-2 py-4 sm:px-6">
                {orderItems
                  ? orderItems.map((orderItem) => (
                      <OrderItem key={orderItem.id} orderItem={orderItem} />
                    ))
                  : ""}
              </div>

              <p className="mt-8 text-lg font-medium">Shipping Methods</p>
              <form className="mb-6 mt-5 grid gap-6">
                <PaymentMethod methodName="Fedex Delivery" />
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-gray-700"></span>
                  <label
                    className="flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-slate-950"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-14 object-contain"
                      src="https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/dhl.png"
                      alt=""
                    />
                    <div className="ml-5">
                      <span className="mt-2 font-semibold">DHL Delivery</span>
                      <p className="text-sm leading-6 text-slate-500">
                        Delivery: 3-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </form>
              <Link
                href="/cart"
                className="mr-2 mt-2 w-20 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              >
                Back
              </Link>
            </div>

            <div className="mt-10 rounded-md bg-slate-800 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Payment Details</p>
              <p className="text-gray-400">
                Complete your order by providing your payment details.
              </p>
              <div className="">
                <label
                  htmlFor="email"
                  className="mb-2 mt-4 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full rounded-md border border-gray-200 bg-gray-800 px-4 py-3 pl-11 text-sm text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@gmail.com"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  htmlFor="card-holder"
                  className="mb-2 mt-4 block text-sm font-medium"
                >
                  Card Holder
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="card-holder"
                    name="card-holder"
                    className="w-full
                  rounded-md border border-gray-200 bg-gray-800 px-4 py-3 pl-11 text-sm uppercase text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your full name here"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  htmlFor="card-no"
                  className="mb-2 mt-4 block text-sm font-medium"
                >
                  Card Details
                </label>
                <div className="flex gap-1">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input
                      type="text"
                      id="card-no"
                      name="card-no"
                      className="w-full
                    rounded-md border border-gray-200 bg-gray-800 px-2 py-3 pl-11 text-sm text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                      </svg>
                    </div>
                  </div>
                  <input
                    type="text"
                    name="credit-expiry"
                    className="w-full
                  rounded-md border border-gray-200 bg-gray-800 px-2 py-3 text-sm text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    name="credit-cvc"
                    className="w-1/6
                  flex-shrink-0 rounded-md border border-gray-200 bg-gray-800 px-2 py-3 text-sm text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="CVC"
                  />
                </div>
                <label
                  htmlFor="billing-address"
                  className="mb-2 mt-4 block text-sm font-medium"
                >
                  Billing Address
                </label>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="text"
                    id="billing-address"
                    name="billing-address"
                    className="w-full
                    rounded-md border border-gray-200 bg-gray-800 px-4 py-3 pl-4 text-sm text-white shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                  />
                </div>

                <div className="mt-6 border-b border-t py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Subtotal</p>
                    <p className="font-semibold text-white">${totalPrice}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">Shipping</p>
                    <p className="font-semibold text-white">
                      ${totalQuantity * 3}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-white">Total</p>
                  <p className="text-2xl font-semibold text-white">
                    ${totalPrice + totalQuantity * 3}
                  </p>
                </div>
              </div>

              <button
                data-modal-target="purchaseModal"
                data-modal-toggle="purchaseModal"
                className="mb-8 mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white hover:bg-gray-950"
              >
                Place Order
              </button>

              {/* modal */}

              <div
                id="purchaseModal"
                data-modal-backdrop="static"
                aria-hidden="true"
                className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
              >
                <div className="relative max-h-full w-full max-w-2xl">
                  <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Thank you for purchasing
                      </h3>
                    </div>
                    <div className="space-y-6 p-6">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        The Items you purchase will be deliver to you in 2-3
                        days
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Warning: This is a testing of development website and
                        the purchases you made will not be delivered
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600">
                      <button
                        onClick={() => {
                          deleteCart.mutate();
                          window.location.replace("/");
                        }}
                        type="button"
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Continue Browsing
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
