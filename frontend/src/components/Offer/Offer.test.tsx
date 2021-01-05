import React from "react";
import { render } from "@testing-library/react";
import { Offer, renderService } from "./index";
import userEvent from "@testing-library/user-event";
import { OfferDetails } from "../../model/OfferDetails";
import { TrackingDetails } from "../../model/TrackingDetails";
import { UserDetails } from "../../model/UserDetails";

const offer: OfferDetails = {
  from: "Giessen",
  to: "Frankfurt",
  date: new Date("2021-01-01T10:20:30Z"),
  service: "rideShare",
  price: 100,
  seats: 1,
  storageSpace: 400,
  description: "Fahre von Gießen nach Frankfurt, kann eine Person mitnehmen",
};

const userA: UserDetails = {
  id: 1,
  username: "david_98",
  rating: 5,
};

const userB: UserDetails = {
  id: 2,
  username: "cargo_98",
  rating: 4,
};

const tracking: TrackingDetails = {
  state: "waiting",
  lastMessage: "bin noch daheim",
  lastMessageDate: new Date(),
};

describe("general tests", () => {
  it("displays general offer details", () => {
    const { getByText } = render(
      <Offer customer={userA} offer={offer} loggedInUserId={3} />
    );
    expect(getByText(offer.from)).toBeInTheDocument();
    expect(getByText(offer.to)).toBeInTheDocument();
    expect(getByText(offer.date.toLocaleDateString())).toBeInTheDocument();
    expect(getByText(String(offer.price))).toBeInTheDocument();
    expect(getByText(renderService(offer.service))).toBeInTheDocument();
    expect(getByText(String(offer.seats))).toBeInTheDocument();
    expect(getByText(offer.description)).toBeInTheDocument();
  });
  it("displays only number of seats when service is 'rideShare'", () => {
    const { getByText } = render(
      <Offer
        customer={userA}
        offer={{ ...offer, service: "rideShare" }}
        loggedInUserId={3}
      />
    );
    expect(getByText(String(offer.seats))).toBeInTheDocument();
  });
  it("displays only storage space when service is 'transport'", () => {
    const { getByText } = render(
      <Offer
        customer={userA}
        offer={{ ...offer, service: "transport" }}
        loggedInUserId={3}
      />
    );
    expect(getByText(String(offer.storageSpace) + " l")).toBeInTheDocument();
  });
});

describe("offer does not belong to logged in user", () => {
  it("displays correct elements when there is no provider yet ('pending request')", () => {
    const { getByText, getByTestId } = render(
      <Offer customer={userA} offer={offer} loggedInUserId={3} />
    );
    expect(getByText(userA.username)).toBeInTheDocument();
    expect(getByTestId("check-circle-icon")).toBeInTheDocument();
  });
  it("displays correct values there is no customer yet ('pending offer')", () => {
    const { getByText, getByTestId } = render(
      <Offer provider={userA} offer={offer} loggedInUserId={3} />
    );
    expect(getByText(userA.username)).toBeInTheDocument();
    expect(getByTestId("check-circle-icon")).toBeInTheDocument();
  });
});

describe("offer does belong to logged in user", () => {
  it("displays correct elements when user is customer and there is no provider yet", () => {
    const { getByText, queryByText, queryByTestId } = render(
      <Offer customer={userA} offer={offer} loggedInUserId={1} />
    );
    expect(queryByText(userA.username)).not.toBeInTheDocument();
    expect(queryByTestId("check-circle-icon")).not.toBeInTheDocument();
    expect(getByText("OFFEN")).toBeInTheDocument();
  });
  it("displays correct elements when user is provider and there is no customer yet", () => {
    const { getByText, queryByText, queryByTestId } = render(
      <Offer provider={userA} offer={offer} loggedInUserId={1} />
    );
    expect(queryByText(userA.username)).not.toBeInTheDocument();
    expect(queryByTestId("check-circle-icon")).not.toBeInTheDocument();
    expect(getByText("OFFEN")).toBeInTheDocument();
  });
  it("displays correct elements when user is customer and there is a provider", () => {
    const { getByText, queryByText, queryByTestId } = render(
      <Offer
        customer={userA}
        provider={userB}
        offer={offer}
        loggedInUserId={1}
      />
    );
    expect(queryByText(userA.username)).not.toBeInTheDocument();
    expect(queryByTestId("check-circle-icon")).not.toBeInTheDocument();
    expect(getByText("IN BEARBEITUNG")).toBeInTheDocument();
    expect(getByText(userB.username)).toBeInTheDocument();
  });
  it("displays correct elements when user is provider and there is a a customer", () => {
    const { getByText, queryByText, queryByTestId } = render(
      <Offer
        customer={userA}
        provider={userB}
        offer={offer}
        loggedInUserId={1}
      />
    );
    expect(queryByText(userA.username)).not.toBeInTheDocument();
    expect(queryByTestId("check-circle-icon")).not.toBeInTheDocument();
    expect(getByText("IN BEARBEITUNG")).toBeInTheDocument();
    expect(getByText(userB.username)).toBeInTheDocument();
  });
  it("displays tracking information when offer has customer and provider", () => {
    const { getByText } = render(
      <Offer
        customer={userA}
        provider={userB}
        offer={{ ...offer, tracking }}
        loggedInUserId={1}
      />
    );
    const trackingButton = getByText("IN BEARBEITUNG");
    const message = String(tracking?.lastMessage);
    userEvent.click(trackingButton);
    expect(getByText("Bereit!")).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });
});
