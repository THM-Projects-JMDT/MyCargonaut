import { createRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Car } from "../model/Car";
import { Offer, Service } from "../../../backend/src/offer/offer";
import { addOffer, addRequest } from "../api/offers";
import { RootState } from "../features/rootReducer";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";
import { getRefValue } from "../util/InputForm/inputFormUtils";

export function useAddOffer(isOffer: boolean) {
  const history = useHistory();
  const requiredRefs = {
    fromRef: createRef<HTMLInputElement>(),
    toRef: createRef<HTMLInputElement>(),
    serviceRef: createRef<HTMLInputElement>(),
  };
  const numRefs = {
    priceRef: createRef<HTMLInputElement>(),
    seatsRef: createRef<HTMLInputElement>(),
    storageSpaceRef: createRef<HTMLInputElement>(),
  };
  const descriptionRef = createRef<HTMLInputElement>();
  const vehilceRef = createRef<HTMLInputElement>();
  const [date, setDate] = useState<Date | null>(new Date());
  const vehicles = useSelector((state: RootState) => state.vehicles.vehicles);

  const validate = () =>
    Object.values(requiredRefs).every((r) => getRefValue(r).trim()) &&
    date &&
    (isOffer
      ? Number(getRefValue(numRefs.priceRef))
      : Object.values(numRefs).every((r) => Number(getRefValue(r))));

  const getService = (service: string) => {
    switch (service) {
      case "Transport":
        return "transport";
      case "Mitfahrgelegenheit":
        return "rideShare";
      default:
        return "";
    }
  };

  const getVehicleInfo = (
    vehicleString: string
  ): { seats: number; storageSpace: number } => {
    const vehicle = vehicles.find((v) => displayVehicle(v) === vehicleString);
    return {
      seats: vehicle?.seats ?? 0,
      storageSpace: vehicle?.storageSpace ?? 0,
    };
  };

  const displayVehicle = (vehicle: Car): string => {
    return `${vehicle.manufacturer} - ${vehicle.model}`;
  };

  const handleAddOffer = async () => {
    const { seats, storageSpace } = getVehicleInfo(getRefValue(vehilceRef));

    if (!validate()) return;

    const offer: Offer = {
      from: getRefValue(requiredRefs.fromRef).trim(),
      to: getRefValue(requiredRefs.toRef).trim(),
      createDate: new Date(),
      orderDate: date ?? new Date(),
      service: getService(getRefValue(requiredRefs.serviceRef)) as Service,
      price: Number(getRefValue(numRefs.priceRef)),
      seats: isOffer ? seats : Number(getRefValue(numRefs.seatsRef)),
      storageSpace: isOffer
        ? storageSpace
        : Number(getRefValue(numRefs.storageSpaceRef)),
      description: getRefValue(descriptionRef).trim(),
    };

    try {
      if (isOffer) {
        await addOffer(offer);
        history.push(routes.offers.path);
      } else {
        await addRequest(offer);
        history.push(routes.requests.path);
      }
    } catch {}
  };

  const inputFields: InputField[] = [
    {
      label: "von",
      type: "text",
      inputProps: {
        inputRef: requiredRefs.fromRef,
      },
    },
    {
      label: "nach",
      type: "text",
      inputProps: {
        inputRef: requiredRefs.toRef,
      },
    },
    {
      label: "Datum",
      type: "date",
      dateProps: {
        onChange: (date) => {
          setDate(date);
        },
        value: date,
      },
    },
    {
      label: "Service",
      type: "select",
      items: ["Mitfahrgelegenheit", "Transport"],
      inputProps: {
        inputRef: requiredRefs.serviceRef,
      },
    },
    ...(!isOffer
      ? [
          {
            label: "Sitze",
            type: "text",
            inputProps: {
              type: "number",
              inputRef: numRefs.seatsRef,
            },
          },
          {
            label: "Stauraum",
            type: "text",
            inputProps: {
              type: "number",
              inputRef: numRefs.storageSpaceRef,
            },
          },
        ]
      : []),
    {
      label: "Preis",
      type: "text",
      inputProps: {
        type: "number",
        inputRef: numRefs.priceRef,
      },
    },
    ...(isOffer
      ? [
          {
            label: "Fahrzeug",
            type: "select",
            items: vehicles.map((v) => displayVehicle(v)),
            inputProps: {
              inputRef: vehilceRef,
            },
          },
          {
            label: "Beschreibung",
            type: "multiline",
            required: false,
            inputProps: {
              inputRef: descriptionRef,
            },
          },
        ]
      : []),
  ];

  return {
    inputFields,
    handleAddOffer,
  };
}
