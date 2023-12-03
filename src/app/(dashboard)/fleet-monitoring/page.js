"use client";

import { useEffect, useState } from "react";
import { getMonitoringGroups } from "../../../services/monitoring";
import GroupDetail from "./GroupDetail";
import { date } from "../../../helpers/date";

export default function Home() {
  const [data, setData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getGroupList = async () => {
    try {
      setLoading(true);
      const res = await getMonitoringGroups();
      setData(res);
      if (res?.data?.length) setSelectedGroup(res?.data?.[0]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroupList();
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex-initial w-72 h-full min-w-[288px] bg-white border-r shadow-lg p-5 space-y-3">
        <div className="flex justify-between items-center"></div>
        <h1 className="text-lg font-bold">Fleet Monitoring</h1>
        {!isLoading &&
          data?.data?.map((group, i) => {
            const selected = selectedGroup?.id === group?.id;
            return (
              <div
                key={i}
                className={`text-sm border rounded-lg p-3 cursor-pointer hover:bg-primary/20 duration-300 space-y-2 ${
                  selected ? "bg-primary/20" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-gray-600">Group Name</span>
                  <span className="text-primary font-semibold">
                    {group?.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Created</span>
                  <span className="text-primary text-xs font-semibold">
                    {date(group?.created_at)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">Updated</span>
                  <span className="text-primary text-xs font-semibold">
                    {date(group?.updated_at)}
                  </span>
                </div>
              </div>
            );
          })}
        {isLoading && <div>Loading...</div>}
      </div>

      <div className="flex-auto p-5 overflow-auto">
        <GroupDetail id={selectedGroup?.id} loading={isLoading} />
      </div>
    </div>
  );
}
