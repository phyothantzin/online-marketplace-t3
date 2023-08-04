import type { Cart } from "@prisma/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Loading from "../Loading";
import Image from "next/image";

function CartItemRow({ cartItem }: { cartItem: Cart }) {
  const updateItemQuantity = api.listing.updateCartItemQuantity.useMutation();
  const removeCartItem = api.listing.removeCartItem.useMutation();

  return (
    <>
      <td className="w-80 md:p-4">
        <Image
          className="pl-2"
          src={`https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/${cartItem?.itemName.replaceAll(
            " ",
            "-"
          )}?${Date.now()}`}
          alt={cartItem.itemName}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {cartItem.itemName}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
            onClick={() => {
              updateItemQuantity
                .mutateAsync({
                  itemId: cartItem.id,
                  newQuantity:
                    cartItem.quantity !== 1
                      ? cartItem.quantity - 1
                      : cartItem.quantity,
                })
                .catch((error) => console.error(error))
                .then(() => window.location.reload());
            }}
          >
            <span className="sr-only">Quantity button</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <div>
            <input
              type="number"
              id="first_product"
              className="block w-14 rounded-lg border border-gray-300 bg-gray-50 px-2.5 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="1"
              defaultValue={cartItem.quantity}
              required
              disabled
            />
          </div>
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white p-1 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            type="button"
            onClick={() => {
              updateItemQuantity
                .mutateAsync({
                  itemId: cartItem.id,
                  newQuantity:
                    cartItem.quantity < 99
                      ? cartItem.quantity + 1
                      : cartItem.quantity,
                })
                .catch((error) => console.error(error))
                .then(() => window.location.reload());
            }}
          >
            <span className="sr-only">Quantity button</span>
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {cartItem.itemPrice * cartItem.quantity}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() =>
            removeCartItem
              .mutateAsync({ itemId: cartItem.id })
              .catch((error) => console.error(error))
              .then(() => window.location.reload())
          }
          className="font-medium text-red-600 hover:underline dark:text-red-500"
        >
          Remove
        </button>
      </td>
    </>
  );
}

export default function CartPage() {
  const {
    data,
    error,
    isSuccess,
    isLoading,
    isFetched,
    isFetching,
    isRefetching,
  } = api.listing.getCart.useQuery();
  const cartItems = data;
  let totalPrice = 0;
  let totalQuantity = 0;
  const router = useRouter();

  if (cartItems !== undefined)
    for (let i = 0; i < cartItems?.length; i++) {
      totalPrice =
        totalPrice +
        (cartItems[i]?.itemPrice ?? 0) * (cartItems[i]?.quantity ?? 0);
      totalQuantity = totalQuantity + (cartItems[i]?.quantity ?? 0);
    }

  if (error) router.push("/");
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
      <main className="flex min-h-screen flex-col bg-gray-900 px-4 py-2">
        <h1 className="my-4 text-4xl">Your Cart</h1>

        {isLoading && isFetching && isRefetching ? <Loading /> : ""}

        {isFetched && isSuccess && !isFetching && !isRefetching ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems
                  ? cartItems.map((cartItem) => (
                      <tr
                        key={cartItem.id}
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                      >
                        <CartItemRow cartItem={cartItem} />
                      </tr>
                    ))
                  : ""}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th scope="row" className="px-6 py-3 text-base">
                    Total
                  </th>
                  <td className="px-6 py-3">{totalQuantity}</td>
                  <td className="px-6 py-3">{totalPrice.toFixed(2)}</td>
                  {totalQuantity !== 0 && (
                    <td className="px-2 py-3">
                      <button
                        onClick={() =>
                          window.location.replace("/cart/checkout")
                        }
                        // href="/cart/checkout"
                        className="hover rounded-md bg-blue-400 px-0 py-2 transition hover:bg-blue-500 md:px-6"
                      >
                        Check out
                      </button>
                    </td>
                  )}
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
