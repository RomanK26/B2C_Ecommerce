import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const CheckYourMail = () => {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="flex flex-col items-center justify-center space-y-4  border-indigo-600 px-8 py-6">
        <div className="text-center mb-9 font-bold">
          <p className="text-2xl leading-10  tracking-wider">
            Please Check Your Inbox.
          </p>
          <p>We've sent a verification link.</p>
        </div>
        <button className="flex items-center border bg-indigo-600 p-2 font-medium text-white hover:border hover:border-indigo-600 hover:bg-white hover:text-indigo-600">
          <div className="hidden hover:block">
            <ArrowLeft></ArrowLeft>
          </div>

          <Link to={"/signup"}>Go Back</Link>
        </button>
      </div>
        <p className="text-xs font-light">Note: The email might take a few minutes to arrive.</p>
    </div>
  );
};

export default CheckYourMail;
