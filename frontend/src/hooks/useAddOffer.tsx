import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Car } from "../model/Car";
import { Offer, Service } from "../../../backend/src/offer/offer";
import { addOffer, addRequest } from "../api/offers";
import { RootState } from "../features/rootReducer";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";
import { getRefValue } from "../util/InputForm/inputFormUtils";
import { isValid } from "date-fns";
import { fetchUser } from "../features/userSlice";
import { setAddRequestPaymentStatus } from "../features/booking/bookingSlice";

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
  const location = useLocation<{ from: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAddRequestPaymentStatus("paymentInProgress"));
  }, [dispatch]);

  const validate = () =>
    Object.values(requiredRefs).every((r) => getRefValue(r).trim()) &&
    isValid(date) &&
    Number(getRefValue(numRefs.priceRef));

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

    if (!validate()) return;

    try {
      if (isOffer) {
        await addOffer(offer);
        history.push(location.state?.from ?? routes.offers.path);
      } else {
        dispatch(setAddRequestPaymentStatus("paymentInProgress"));
        await addRequest(offer);
        dispatch(setAddRequestPaymentStatus("paymentSuccess"));
        history.push(location.state?.from ?? routes.requests.path);
        dispatch(fetchUser());
      }
    } catch {
      dispatch(setAddRequestPaymentStatus("paymentFailure"));
    }
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
        defaultValue: "Mitfahrgelegenheit",
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
              defaultValue: 1,
            },
          },
          {
            label: "Stauraum",
            type: "text",
            inputProps: {
              type: "number",
              inputRef: numRefs.storageSpaceRef,
              defaultValue: 1,
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
        ]
      : []),
    {
      label: "Beschreibung",
      type: "multiline",
      required: false,
      inputProps: {
        inputRef: descriptionRef,
      },
    },
  ];

  return {
    inputFields,
    handleAddOffer,
    validate,
  };
}
