import React from "react";

function HirePhotographer() {
  return (
    <div className="w-full flex items-center mb-[400px]">
      <div className="flex m-auto justify-evenly ">
        <div className="flex m-auto w-9/12 mt-4 mr-8">
          <a
            href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/308127116_2024025151321048_5750858192271853462_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=wLWmOm9sxnYAX9gQOCp&_nc_ht=scontent.fdac31-1.fna&oh=00_AfA6azAevcceh-yg9IJaTbYK_sJlbE2RIkNXMpRsrLHBWw&oe=65D9DFB3"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-start text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Muhtasim Billah Nahin
              </h5>
              <p class="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Email: </span>
                muhtasimbillah@gmail.com
              </p>
              <p className="text-start">
                Portfolio:{" "}
                <a
                  href="https://nahinbafsd.wixsite.com/mbnahin"
                  className="hover:text-blue-500 font-bold"
                  target="__blank"
                >
                  https://nahinbafsd.wixsite.com/mbnahin
                </a>
              </p>
            </div>
          </a>
        </div>
        <div className="flex m-auto w-9/12 mt-4">
          <a
            href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="https://scontent.fdac31-1.fna.fbcdn.net/v/t39.30808-6/308127116_2024025151321048_5750858192271853462_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=wLWmOm9sxnYAX9gQOCp&_nc_ht=scontent.fdac31-1.fna&oh=00_AfA6azAevcceh-yg9IJaTbYK_sJlbE2RIkNXMpRsrLHBWw&oe=65D9DFB3"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-start text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Muhtasim Billah Nahin
              </h5>
              <p class="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Email: </span>
                muhtasimbillah@gmail.com
              </p>
              <p className="text-start">
                Portfolio:{" "}
                <a
                  href="https://nahinbafsd.wixsite.com/mbnahin"
                  className="hover:text-blue-500 font-bold"
                  target="__blank"
                >
                  https://nahinbafsd.wixsite.com/mbnahin
                </a>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HirePhotographer;
