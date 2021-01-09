import {
  AppBar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { OfferDetails } from "../../model/OfferDetails";
import { TrackingDetails } from "../../model/TrackingDetails";
import { UserDetails } from "../../model/UserDetails";
import { Offer } from "../Offer";
import { useStyles } from "./OfferPage.style";
import { OfferDummy } from "../Offer/OfferDummy";

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
    provider: userB,
  },
];

// no provider
const pendingRequests = [
  {
    offer: offerDetails,
    customer: userB,
  },
  {
    offer: offerDetails,
    customer: userB,
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
  const [service, setService] = React.useState<string>("both");
  const [filter, setFilter] = React.useState({
    from: "",
    to: "",
    service: "both",
  });
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const classes = useStyles();

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

  const handleServiceFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setService(event.target.value);
  };

  const handleFromFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFrom(event.target.value);
  };

  const handleToFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const handleApplyFilter = () => {
    setFilter({
      from: from.trim().toLowerCase(),
      to: to.trim().toLowerCase(),
      service: service.trim(),
    });
  };

  const handleReset = () => {
    setFrom("");
    setTo("");
    setService("both");
  };

  const predicate = (o: any) => {
    return (
      (!filter.from || o.offer.from.toLowerCase() === filter.from) &&
      (!filter.to || o.offer.to.toLowerCase() === filter.to) &&
      (filter.service === "both" || o.offer.service === filter.service)
    );
  };

  useEffect(() => {
    setDisplayList(getOffers(0));
  }, [getOffers]);

  return (
    <Box mt={2}>
      <Grid container>
        <Grid item xs={2} />

        <Grid item xs={6} className={classes.filterTextFieldGroup}>
          <TextField
            label="Von:"
            className={classes.filterTextField}
            value={from}
            onChange={handleFromFilterChange}
          />
          <TextField
            label="Nach:"
            className={classes.filterTextField}
            value={to}
            onChange={handleToFilterChange}
          />
          <TextField
            select
            label="Service:"
            value={service}
            className={classes.filterTextField}
            onChange={handleServiceFilterChange}
          >
            <MenuItem value={"rideShare"}>Mitfahrgelegenheit</MenuItem>
            <MenuItem value={"transport"}>Transport</MenuItem>
            <MenuItem value={"both"}>Transport / Mitfahrgelegenheit</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            className={classes.filterButton}
            onClick={handleApplyFilter}
          >
            Filtern
          </Button>
          <Button
            color="primary"
            variant="outlined"
            className={classes.filterButton}
            onClick={handleReset}
          >
            Zurücksetzen
          </Button>
        </Grid>

        <Grid item xs={2} />
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
            {activeTab === 1 && <OfferDummy show={show} />}
            {displayList?.filter(predicate).map((o: any, idx: number) => (
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
