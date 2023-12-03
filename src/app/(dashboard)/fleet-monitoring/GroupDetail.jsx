"use client";

import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { getMonitoringGroup } from "../../../services/monitoring";
import InputSearch from "../../../components/input/InputSearch";
import DataTable from "react-data-table-component";
import { date } from "../../../helpers/date";

function GroupDetail({ id, loading }) {
  const [group, setGroup] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedVesel, setSelectedVessel] = useState(null);
  const [filteredVessels, setFilteredVessels] = useState(null);
  const [drawer, setDrawer] = useState({ open: false, data: null });

  console.log(group);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAP_KEY,
  });

  const getDetail = async (groupId) => {
    try {
      setLoading(true);
      const res = await getMonitoringGroup(groupId);
      setGroup(res);
      setSelectedVessel(res?.vessels?.[0]);
      setFilteredVessels(res?.vessels);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSearch = (e) => {
    const val = e.target.value;
    if (!val) return setFilteredVessels(group?.vessels);
    const filtered = [...group?.vessels].filter((v) => {
      const key = val?.toLowerCase();
      const matchName = v?.vessel_name?.toLowerCase()?.includes(key);
      const matchOrigin = v?.origin?.toLowerCase()?.includes(key);
      const matchDestination = v?.destination?.toLowerCase()?.includes(key);
      return matchName || matchOrigin || matchDestination;
    });
    setFilteredVessels(filtered);
  };

  const onMarkerClick = (type) => {
    const open = type === drawer?.data?.type ? !drawer?.open : true;
    const name = selectedVesel[type.toLowerCase()];
    const loc = selectedVesel[type.toLowerCase() + "_geojson"];
    const latLng = `(${loc[0]}, ${loc[1]})`;
    setDrawer({ open, data: { type, name, latLng } });
  };

  useEffect(() => {
    if (id) {
      getDetail(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  const columns = [
    {
      name: "Vessel Name",
      selector: (row) => row.vessel_name,
      sortable: true,
    },
    {
      name: "Callsign",
      selector: (row) => row.vessel_callsign || "-",
      sortable: true,
    },
    {
      name: "Imo",
      selector: (row) => row.vessel_imo || "-",
      sortable: true,
    },
    {
      name: "MMSI",
      selector: (row) => row.vessel_mmsi || "-",
      sortable: true,
    },
    {
      name: "Origin",
      selector: (row) => row.origin,
      sortable: true,
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
  ];

  if (isLoading || loading) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white rounded-lg">
        <Spinner size={30} />
      </div>
    );
  }

  if (!isLoading && !id) {
    return (
      <div className="w-full h-full flex justify-center items-center bg-white rounded-lg">
        <span>No Data</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">{group?.name}</h1>
        <span className="text-xs font-semibold">{date(group?.created_at)}</span>
      </div>
      <div className="relative w-full aspect-[2/1] min-h-[320px] bg-white rounded-lg shadow-lg overflow-hidden">
        {isLoaded && (
          <GoogleMap
            id="google-map-script"
            options={{
              disableDefaultUI: true,
              clickableIcons: true,
              scrollwheel: false,
            }}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: -0.001, lng: 119.012 }}
            zoom={5}
          >
            <Marker
              position={{
                lat: selectedVesel?.origin_geojson[0],
                lng: selectedVesel?.origin_geojson[1],
              }}
              onClick={() => onMarkerClick("Origin")}
            />
            <Marker
              position={{
                lat: selectedVesel?.destination_geojson[0],
                lng: selectedVesel?.destination_geojson[1],
              }}
              onClick={() => onMarkerClick("Destination")}
            />
          </GoogleMap>
        )}
        <div
          className={`absolute h-full bg-white/50 backdrop-blur-sm right-0 top-0 duration-500 overflow-hidden ${
            drawer?.open ? "w-72 p-3" : "w-0"
          }`}
        >
          <h2 className="text-sm font-semibold">{drawer?.data?.type}</h2>
          <p>{drawer?.data?.name}</p>
          <p className="text-xs">{drawer?.data?.latLng}</p>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b p-3">
          <h2 className="text-lg font-semibold">Vessel List</h2>
          <InputSearch onChange={onSearch} />
        </div>
        <div className="p-3">
          {!!filteredVessels && (
            <DataTable
              highlightOnHover
              columns={columns}
              data={filteredVessels}
              persistTableHead
              customStyles={{
                headRow: { style: { backgroundColor: "#f3f4f6" } },
              }}
              onRowClicked={(data) => console.log(data)}
              conditionalRowStyles={[
                {
                  when: (row) => row?.id === selectedVesel?.id,
                  style: { backgroundColor: "#f3f4f6" },
                },
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupDetail;
