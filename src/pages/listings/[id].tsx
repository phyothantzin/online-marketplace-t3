import { useUser } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import Loading from "../Loading";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const listing = api.listing.get.useQuery(
    { listingId: router.query.id as string },
    {
      enabled: !!router.query.id,
    }
  );
  const user = useUser();

  const sendMessage = api.listing.sendMessage.useMutation();
  const deleteItem = api.listing.delete.useMutation();

  const listingItem = listing.data;

  if (!listingItem) {
    return null;
  }

  return (
    <>
      <Head>
        <title>View Product</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-900 px-12 py-2">
        {listing.isLoading && <Loading />}
        {listing.isFetched && (
          <div className="container mx-auto flex flex-col gap-12">
            <Link
              href="/"
              className="mr-2 mt-2 w-20 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Back
            </Link>
            <div className="-mt-8 flex flex-row">
              <h1 className=" inline text-4xl">{listingItem.name}</h1>
              {listingItem.userId === user.user?.id && (
                <div className="ml-auto inline">
                  <Link
                    href={`edit/${listingItem.id}`}
                    className="mb-2 mr-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() =>
                      deleteItem
                        .mutateAsync({
                          listingId: listingItem.id,
                        })
                        .then(() => router.push("/"))
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <Link href="#">
              <img
                className="w-96 rounded-t-lg"
                src={`https://vljhhdzkmaqsnyiewqlk.supabase.co/storage/v1/object/public/marketplace/${listingItem?.name.replaceAll(
                  " ",
                  "-"
                )}?${Date.now()}`}
                alt={listingItem.name}
              />
            </Link>
            <p>{listingItem.description}</p>
            <p>$ {listingItem.price}</p>

            {user.isSignedIn && listingItem.userId !== user.user?.id ? (
              <form
                className="-mt-4 mb-4 flex flex-col gap-4"
                onSubmit={handleSubmit((formData) => {
                  sendMessage
                    .mutateAsync({
                      message: formData.message,
                      listingId: listingItem.id,
                      forItem: listingItem.name,
                    })
                    .then(() => {
                      reset();
                    });
                })}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    rows={4}
                    {...register("message", { required: true })}
                  />
                </div>
                <button className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Send Message
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        )}
      </main>
    </>
  );
}
