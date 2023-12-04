"use client";

import React from "react";
import { useSelector } from "react-redux";
import { date } from "../../../helpers/date";
import { FaRegCircleUser } from "react-icons/fa6";

function Profile() {
  const user = useSelector((state) => state.userSlice);
  return (
    <div className="w-full h-full flex justify-center p-10">
      <div className="w-[720px] h-fit bg-white rounded-lg shadow-lg p-5">
        <div className="flex justify-center text-gray-300">
          <FaRegCircleUser size={160} />
        </div>
        <h1 className="text-lg font-bold">Profile</h1>
        <div className="space-y-3">
          <Field label="Name" value={user?.data?.name} />
          <Field label="Email" value={user?.data?.email} />
          <Field
            label="Registered"
            value={date(user?.data?.created_at, "d MMMM yyyy")}
          />
        </div>
      </div>
    </div>
  );
}

const Field = ({ label = "", value = "" }) => (
  <div className="flex">
    <div className="w-40 min-w-[160px]">{label}</div>
    <span>: {value}</span>
  </div>
);

export default Profile;
