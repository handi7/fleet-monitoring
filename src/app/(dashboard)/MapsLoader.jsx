"use client";

import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoaded } from "../../store/slices/mapSlice";

function MapsLoader() {
  const dispatch = useDispatch();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAP_KEY,
  });

  useEffect(() => {
    if (isLoaded) dispatch(setLoaded());
  }, [isLoaded, dispatch]);

  return null;
}

export default MapsLoader;
