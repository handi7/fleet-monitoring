"use client";

import { forwardRef, useEffect, useState } from "react";
import InputLabel from "./InputLabel";
import { MdGpsFixed } from "react-icons/md";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Button from "../Button";
import { useSelector } from "react-redux";

const InputLatLng = forwardRef(function InputLatLng(
  { id, label, required = false, error, value, onChange, ...rest },
  ref
) {
  const [val, setValue] = useState({
    lat: value?.lat || "",
    lng: value?.lng || "",
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    onChange(val);
  }, [val]);

  return (
    <div className="flex flex-col space-y-1">
      {!!label && <InputLabel id={id} label={label} required={required} />}
      <div className="flex space-x-1">
        <input
          ref={ref}
          id={id}
          type="number"
          className={`flex-auto text-xs text-primary border rounded-md outline-none px-3 py-2 ${
            error ? "border-red-600" : ""
          }`}
          placeholder="Latitude"
          value={val?.lat?.toString()}
          onChange={(e) => setValue({ ...val, lat: +e.target.value || "" })}
          {...rest}
        />

        <input
          ref={ref}
          id={id}
          type="number"
          className={`flex-auto text-xs text-primary border rounded-md outline-none px-3 py-2 ${
            error ? "border-red-600" : ""
          }`}
          placeholder="Longitude"
          value={val?.lng?.toString()}
          onChange={(e) => setValue({ ...val, lng: +e.target.value || "" })}
          {...rest}
        />

        <button
          type="button"
          className="flex initial p-2"
          onClick={() => setOpen(true)}
        >
          <MdGpsFixed />
        </button>
      </div>
      <span className="text-xs text-red-700">{error}</span>
      {isOpen && (
        <MapsModal
          isOpen={isOpen}
          close={() => setOpen(false)}
          value={val}
          onChange={setValue}
        />
      )}
    </div>
  );
});

const MapsModal = ({
  isOpen,
  close = null,
  value = null,
  onChange = (val) => console.log(val),
}) => {
  const mapState = useSelector((state) => state.mapSlice);
  const mapCenter = { lat: -0.001, lng: 119.012 };
  const [selected, select] = useState({
    lat: value?.lat || mapCenter?.lat,
    lng: value?.lng || mapCenter?.lng,
  });

  const onSelect = (latLng) => {
    select({ lat: latLng?.lat(), lng: latLng?.lng() });
  };

  const onSave = () => {
    onChange(selected);
    close && close();
  };

  return (
    <div
      className={`w-screen h-[calc(100vh+50px)] fixed flex flex-col justify-start items-center space-y-2 bg-black/40 backdrop-blur-sm -top-5 left-0 pt-10 duration-500 ${
        isOpen ? "scale-100" : `scale-0`
      }`}
    >
      <div className="w-[95%] h-[70%] lg:w-[70%] lg:h-[70%] bg-white rounded-lg overflow-hidden">
        {mapState?.isLoaded && (
          <GoogleMap
            id="input-latLng"
            mapContainerClassName="w-full h-full"
            zoom={5}
            center={selected}
            onClick={(data) => onSelect(data?.latLng)}
          >
            <Marker
              draggable
              position={selected}
              onDragEnd={(data) => onSelect(data?.latLng)}
            />
          </GoogleMap>
        )}
      </div>
      <div className="w-[95%] lg:w-[70%] flex flex-col lg:flex-row justify-between items-center bg-white rounded-lg p-3 space-y-2 lg:space-y-0">
        <p className="p-2 border rounded-md">
          {selected?.lat}, {selected?.lng}
        </p>
        <div className="space-x-2">
          <Button onClick={close}>Cancel</Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default InputLatLng;
