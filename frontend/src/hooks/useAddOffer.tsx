import { createRef, RefObject, useState } from "react";
import { useHistory } from "react-router-dom";
import { Offer, Service } from "../../../backend/src/offer/offer";
import { useSelector } from "react-redux";
import { RootState } from "../features/rootReducer";
import { addOffer, addRequest } from "../api/offers";
import { routes } from "../routes";
import { InputField } from "../util/InputForm";

export function useAddOffer(isOffer: boolean) {
  const history = useHistory();
  const refs = {
    fromRef: createRef<HTMLInputElement>(),
    toRef: createRef<HTMLInputElement>(),
    serviceRef: createRef<HTMLInputElement>(),
    vahilceRef: createRef<HTMLInputElement>(),
    priceRef: createRef<HTMLInputElement>(),
    seatsRef: createRef<HTMLInputElement>(),
    storageSpaceRef: createRef<HTMLInputElement>(),
    descriptionRef: createRef<HTMLInputElement>(),
  };
  const [date, setDate] = useState<Date>(new Date());
  //const user = useSelector((state: RootState) => state.auth);

  //AUSLAGERN
  const getRefValue = (ref: RefObject<HTMLInputElement>) =>
    ref.current?.value ?? "";

  const handleAddOffer = async () => {
    const offer: Offer = {
      from: getRefValue(refs.fromRef),
      to: getRefValue(refs.toRef),
      createDate: new Date(),
      orderDate: date,
      service: getRefValue(refs.serviceRef) as Service,
      price: Number(getRefValue(refs.priceRef)),
      seats: Number(getRefValue(refs.seatsRef)),
      storageSpace: Number(getRefValue(refs.storageSpaceRef)),
      description: getRefValue(refs.descriptionRef),
      ...(isOffer ? { provider: "" } : { customer: "" }),
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
        inputRef: refs.toRef,
      },
    },
    {
      label: "nach",
      type: "text",
      inputProps: {
        inputRef: refs.fromRef,
      },
    },
    {
      label: "Datum",
      type: "date",
    },
    {
      label: "Service",
      type: "select",
      items: ["Mitfahrgelegenheit", "Transport"],
      inputProps: {
        inputRef: refs.serviceRef,
      },
    },
    {
      label: "Preis",
      type: "text",
      inputProps: {
        inputRef: refs.priceRef,
      },
    },
    ...(isOffer
      ? [
          {
            label: "Fahrzeug",
            type: "text",
            inputProps: {
              inputRef: refs.vahilceRef,
            },
          },
          {
            label: "Beschreibung",
            type: "multiline",
            inputProps: {
              inputRef: refs.descriptionRef,
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
