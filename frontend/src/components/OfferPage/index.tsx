import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Offer } from "../Offer";
import { useStyles } from "./OfferPage.style";
import { OfferDummy } from "../Offer/OfferDummy";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { fetchOffers } from "../../features/offers/offersSlice";
import { fetchRequests } from "../../features/requests/requestsSlice";
import { OfferResponse } from "../../api/offers";

export interface OfferPageProps {
  show: "offers" | "requests";
}

export const OfferPage: React.FC<OfferPageProps> = ({ show }) => {
  const [activeTab, setActiveTab] = React.useState(0);
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
  const loggedInUsername = useSelector(
    (state: RootState) => state.user.user?.username
  );

  const dispatch = useDispatch();
  const offersState = useSelector((state: RootState) => state.offers);
  const requestsState = useSelector((state: RootState) => state.requests);

  useEffect(() => {
    if (show === "offers") {
      dispatch(fetchOffers());
    } else {
      dispatch(fetchRequests());
    }
  }, [dispatch, show]);

  const handleTabChange = (event: React.ChangeEvent<{}>, tab: number) => {
    setActiveTab(tab);
  };

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

  const predicate = (o: OfferResponse) => {
    return (
      (!filter.from || o.from.toLowerCase() === filter.from) &&
      (!filter.to || o.to.toLowerCase() === filter.to) &&
      (filter.service === "both" || o.service === filter.service)
    );
  };

  const getDisplayList = () => {
    if (show === "offers") {
      if (offersState.isLoading) {
        return undefined;
      }
      return activeTab === 0
        ? offersState.allOffers
        : offersState.personalOffers;
    }
    if (show === "requests") {
      if (requestsState.isLoading) {
        return undefined;
      }
      return activeTab === 0
        ? requestsState.allRequests
        : requestsState.personalRequests;
    }
    return undefined;
  };

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
              onChange={handleTabChange}
            >
              <Tab label={"Alle " + displayName} fullWidth />
              <Tab label={"Meine " + displayName} fullWidth />
            </Tabs>
          </AppBar>
          <List>
            {activeTab === 1 && <OfferDummy show={show} />}
            {getDisplayList()
              ?.filter(predicate)
              .map((o: OfferResponse, id: number) => (
                <ListItem key={id}>
                  <Offer
                    offer={{
                      id: o._id,
                      from: o.from,
                      to: o.to,
                      service: o.service,
                      price: o.price,
                      orderDate: new Date(o.orderDate),
                      seats: o.seats,
                      storageSpace: o.storageSpace,
                      description: o.description,
                      tracking: o.tracking,
                    }}
                    customer={
                      o.customer
                        ? {
                            id: o.customer,
                            username: o?.customerUsername ?? "",
                            rating: o.customerRating,
                          }
                        : undefined
                    }
                    provider={
                      o.provider
                        ? {
                            id: o.provider,
                            username: o?.providerUsername ?? "",
                            rating: o.providerRating,
                          }
                        : undefined
                    }
                    loggedInUsername={loggedInUsername ?? ""}
                  />
                </ListItem>
              )) ?? (
              <Box className={classes.loadingBox} mt={5}>
                <CircularProgress />
              </Box>
            )}
          </List>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Box>
  );
};
