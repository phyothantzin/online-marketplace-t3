import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Loading from "./Loading";
import { Message } from "@prisma/client";

const Home: NextPage = () => {
  const { data, isLoading, isFetched } = api.listing.getMessage.useQuery();
  const messages = data;

  return (
    <>
      <Head>
        <title>Offers</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col gap-12 bg-gray-800">
        {isLoading && <Loading />}
        {isFetched && (
          <div className="container mx-auto">
            <h1 className="mb-8 mt-12 pl-4 text-4xl">Your Offers</h1>

            <div className="relative mb-16 overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      From
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Message
                    </th>
                    <th scope="col" className="px-3 py-3">
                      For Item
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages?.map((message) => (
                    <tr
                      key={message.id}
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <td className="px-6 py-4">{message.fromUserName}</td>
                      <td className="px-6 py-4">{message.message}</td>
                      <td className="px-3 py-4">{message.forItem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
