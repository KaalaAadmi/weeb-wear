import React from "react";

const NotFound = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      {/* Container */}
      <div className="px-5 py-20 md:px-10 md:py-20">
        {/* Component */}
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <img
            src="/assets/images/404.png"
            alt=""
            className="mx-auto rounded-full mb-8 inline-block h-56 w-56 flex-none object-cover"
          />
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-gray-500 sm:text-base md:mb-6 lg:mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been removed, had its name changed, or is temporarily
            unavailable. Don&apos;t worry, let&apos;s get you back on track!
          </p>
          <a
            href="/"
            className="inline-block items-center rounded-md bg-black px-8 py-4 text-center font-semibold text-white"
          >
            Back Home
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
