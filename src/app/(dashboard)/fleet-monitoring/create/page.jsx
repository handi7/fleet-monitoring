"use client";

import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import InputText from "../../../../components/input/InputText";
import InputLatLng from "../../../../components/input/InputLatLng";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import Button from "../../../../components/Button";
import { useRouter } from "next/navigation";
import Spinner from "../../../../components/Spinner";
import { createMonitoringGroup } from "../../../../services/monitoring";
import { toast } from "react-toastify";

const vessel = {
  vessel_name: "",
  vessel_mmsi: "",
  origin: "",
  destination: "",
  origin_geojson: [],
  destination_geojson: [],
};
const defaultValues = { groupName: "", vessels: [vessel] };

function CreateMonitoring() {
  const router = useRouter();

  const form = useForm({ defaultValues });
  const { register, handleSubmit, control, formState } = form;
  const { isSubmitting, errors } = formState;

  const { fields, append, remove } = useFieldArray({
    name: "vessels",
    control,
  });

  const onSubmit = async (data) => {
    try {
      await createMonitoringGroup(data);
      toast.success("Group created successfully");
      router.back();
    } catch (error) {
      console.log(error);
      toast.warn("Failed create group");
    }
  };

  return (
    <div className="p-5 lg:p-10 space-y-3">
      <button className="flex items-center space-x-1" onClick={router.back}>
        <IoIosArrowBack size={24} />
        <h1 className="text-lg font-bold">Create Group Monitoring</h1>
      </button>
      <div className="bg-white rounded-lg shadow-lg p-5">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:w-[50%] lg:pr-3">
            <InputText
              required
              label="Group Name"
              placeholder="Group Name"
              {...register("groupName", { required: "Group Name is required" })}
              error={errors?.groupName?.message}
            />
          </div>
          <hr className="border-yellow-500" />
          {fields?.map((v, i, arr) => (
            <div key={i} className="">
              <div className="flex flex-col lg:flex-row lg:space-x-5">
                <div className="flex-1 space-y-1">
                  <InputText
                    required
                    label="Vessel Name"
                    placeholder="Vessel Name"
                    {...register(`vessels.${i}.vessel_name`, {
                      required: "Vessel Name is required",
                    })}
                    error={errors?.vessels?.at(i)?.vessel_name?.message}
                  />
                  <InputText
                    required
                    label="Origin"
                    placeholder="Origin"
                    {...register(`vessels.${i}.origin`, {
                      required: "Origin is required",
                    })}
                    error={errors?.vessels?.at(i)?.origin?.message}
                  />
                  <Controller
                    control={control}
                    name={`vessels.${i}.origin_geojson`}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <InputLatLng
                          required
                          label="Origin Point"
                          value={{ lat: value?.at(0), lng: value?.at(1) }}
                          onChange={(val) => onChange([val?.lat, val?.lng])}
                          error={
                            [...value]?.filter((v) => !!v)?.length < 2
                              ? "Origin Point is required"
                              : ""
                          }
                        />
                      );
                    }}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <InputText
                    required
                    label="Vessel MMSI"
                    placeholder="Vessel MMSI"
                    {...register(`vessels.${i}.vessel_mmsi`, {
                      required: "MMSI is required",
                    })}
                    error={errors?.vessels?.at(i)?.vessel_mmsi?.message}
                  />
                  <InputText
                    required
                    label="Destination"
                    placeholder="Destination"
                    {...register(`vessels.${i}.destination`, {
                      required: "Destination is required",
                    })}
                    error={errors?.vessels?.at(i)?.destination?.message}
                  />
                  <Controller
                    control={control}
                    name={`vessels.${i}.destination_geojson`}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <InputLatLng
                          required
                          label="Destination Point"
                          value={{ lat: value?.at(0), lng: value?.at(1) }}
                          onChange={(val) => onChange([val?.lat, val?.lng])}
                          error={
                            [...value]?.filter((v) => !!v)?.length < 2
                              ? "Destination Point is required"
                              : ""
                          }
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between border-b border-yellow-500 py-3">
                {i === arr?.length - 1 && (
                  <Button onClick={() => append(vessel)}>Add Vessel</Button>
                )}
                {arr?.length > 1 && (
                  <div className="flex-1 flex justify-end">
                    <Button onClick={() => remove(i)}>Delete</Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <Button onClick={router.back}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              <span className="flex space-x-2">
                {isSubmitting && <Spinner />} <span>Create</span>
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMonitoring;
