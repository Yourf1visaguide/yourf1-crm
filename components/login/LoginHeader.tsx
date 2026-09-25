import Image from "next/image";
import React from "react";

function LoginHeader() {
  return (
    <header className=" pb-36  z-50 relative">
       <div className=" aspect-square relative h-[37.5px] w-[150px]">
        <Image src="/images/crm/logo.png" alt="Your F1 Visa Guide Logo" fill/>
       </div>
      <div className="flex items-center pt-12 justify-center flex-col max-w-3xl mx-auto ">
        <h1 className="md:text-5xl/tight text-4xl/tight pb-6 text-center font-semibold  tracking-wide ">
          <span className="relative ">
            <span className="z-50 ">Everything </span>
            <span className="h-4 w-full -ml-1 bg-indigo-300 absolute top-2 left-0 rounded-full -rotate-1 -z-10 " />
            <span className="h-4 -ml-4  w-full bg-indigo-300 absolute top-5 left-0 rounded-full -rotate-1 -z-10 " />

            <span className="h-4 ml-0  w-full bg-indigo-300 absolute top-8 left-0 rounded-full -rotate-2 -z-10 " />
            <span className="h-4 -ml-2 md:inline hidden  w-full bg-indigo-300 absolute top-11 left-0 rounded-full -rotate-1 -z-10 " />
          </span>
          your team needs, <br className="hidden sm:block" />
          <span className="text-">in one place</span>
        </h1>
        <p className="text-lg font-normal text-center max-w-2xl  mx-auto text-zinc-700">
          Manage leads, students, documents, payments, follow-ups and workflows
          from a single connected workspace.
        </p>
      </div>
    </header>
  );
}

export default LoginHeader;
