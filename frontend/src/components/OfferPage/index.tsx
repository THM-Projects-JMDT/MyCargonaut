import {
  AppBar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Tab,
  Tabs,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React, { useCallback, useEffect } from "react";
import { OfferDetails } from "../../model/OfferDetails";
import { TrackingDetails } from "../../model/TrackingDetails";
import { UserDetails } from "../../model/UserDetails";
import { Offer } from "../Offer";

export interface OfferPageProps {
  show: "offers" | "requests";
}

const offerDetails: OfferDetails = {
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

// no customer
const pendingOffers = [
  {
    offer: offerDetails,
    provider: userB,
  },
  {
    offer: offerDetails,
    provider: userB,
  },
  {
    offer: offerDetails,
    provider: userA,
  },
];

// no provider
const pendingRequests = [
  {
    offer: offerDetails,
    customer: userA,
  },
  {
    offer: offerDetails,
    customer: userA,
  },
  {
    offer: offerDetails,
    customer: userB,
  },
];

const myOffers = [
  {
    offer: { ...offerDetails },
    provider: userA,
  },
  {
    offer: { ...offerDetails, tracking },
    provider: userA,
    customer: userB,
  },
];

const myRequests = [
  {
    offer: { ...offerDetails },
    customer: userA,
  },
  {
    offer: { ...offerDetails, tracking },
    customer: userA,
    provider: userB,
  },
];

export const OfferPage: React.FC<OfferPageProps> = ({ show }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [displayList, setDisplayList] = React.useState<any[] | undefined>([]);

  const displayName = show === "offers" ? "Angebote" : "Anfragen";
  const loggedInUserId = 1; // TODO: retrieve from store

  const handleChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setActiveTab(tab);
    setDisplayList(getOffers(tab));
  };

  // all of the following variables can be removed when backend backend communication is implemented

  const getOffers = useCallback(
    (tab: number) => {
      if (tab === 0) {
        return show === "offers" ? pendingOffers : pendingRequests; // TODO: fetch from server
      }
      if (tab === 1) {
        return show === "offers" ? myOffers : myRequests; // TODO: fetch from server
      }
    },
    [show]
  );

  useEffect(() => {
    setDisplayList(getOffers(0));
  }, [getOffers]);

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={1}>
          <IconButton color="primary">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={2} />
        <Grid item xs={8}>
          <AppBar position="static" color="default">
            <Tabs
              variant="fullWidth"
              indicatorColor="primary"
              color="primary"
              value={activeTab}
              onChange={handleChange}
            >
              <Tab label={"Alle " + displayName} fullWidth />
              <Tab label={"Meine " + displayName} fullWidth />
            </Tabs>
          </AppBar>
          <List>
            {displayList?.map((o: any, idx: number) => (
              <ListItem key={idx}>
                <Offer
                  offer={o.offer}
                  customer={o.customer}
                  provider={o.provider}
                  loggedInUserId={loggedInUserId}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Box>
  );
};
