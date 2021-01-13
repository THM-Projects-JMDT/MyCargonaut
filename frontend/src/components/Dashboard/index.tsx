import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListSubheader,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OfferResponse } from "../../api/offers";
import { fetchOffers } from "../../features/offers/offersSlice";
import { fetchRequests } from "../../features/requests/requestsSlice";
import { RootState } from "../../features/rootReducer";
import { Offer } from "../Offer";
import { useStyles } from "./Dashboard.style";
import { OfferDummy } from "../Offer/OfferDummy";

export const Dashboard = () => {
  const classes = useStyles();
  const loggedInUsername = useSelector(
    (state: RootState) => state.user.user?.username
  );
  const dispatch = useDispatch();
  const offersState = useSelector((state: RootState) => state.offers);
  const requestsState = useSelector((state: RootState) => state.requests);
  const [filterOffer, setFilterOffer] = React.useState({
    from: "",
    to: "",
    service: "both",
  });
  const [filterRequest, setFilterRequest] = React.useState({
    from: "",
    to: "",
    service: "both",
  });
  const [fromOffer, setFromOffer] = React.useState("");
  const [toOffer, setToOffer] = React.useState("");
  const [serviceOffer, setServiceOffer] = React.useState<string>("both");
  const [fromRequest, setFromRequest] = React.useState("");
  const [toRequest, setToRequest] = React.useState("");
  const [serviceRequest, setServiceRequest] = React.useState<string>("both");

  useEffect(() => {
    dispatch(fetchOffers());
    dispatch(fetchRequests());
  }, [dispatch]);

  const handleServiceFilterChangeOffer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServiceOffer(event.target.value);
  };

  const handleServiceFilterChangeRequest = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setServiceRequest(event.target.value);
  };

  const handleFromFilterChangeOffer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromOffer(event.target.value);
  };

  const handleFromFilterChangeRequest = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromRequest(event.target.value);
  };

  const handleToFilterChangeOffer = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToOffer(event.target.value);
  };

  const handleToFilterChangeRequest = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToRequest(event.target.value);
  };

  const handleApplyOfferFilter = () => {
    setFilterOffer({
      from: fromOffer.trim().toLowerCase(),
      to: toOffer.trim().toLowerCase(),
      service: serviceOffer.trim(),
    });
  };

  const handleApplyRequestFilter = () => {
    setFilterRequest({
      from: fromRequest.trim().toLowerCase(),
      to: toRequest.trim().toLowerCase(),
      service: serviceRequest.trim(),
    });
  };

  const handleResetOffer = () => {
    setFromOffer("");
    setToOffer("");
    setServiceOffer("both");
  };

  const handleResetRequest = () => {
    setFromRequest("");
    setToRequest("");
    setServiceRequest("both");
  };

  const predicateOffer = (o: OfferResponse) => {
    return (
      (!filterOffer.from || o.from.toLowerCase() === filterOffer.from) &&
      (!filterOffer.to || o.to.toLowerCase() === filterOffer.to) &&
      (filterOffer.service === "both" || o.service === filterOffer.service)
    );
  };

  const predicateRequest = (o: OfferResponse) => {
    return (
      (!filterRequest.from || o.from.toLowerCase() === filterRequest.from) &&
      (!filterRequest.to || o.to.toLowerCase() === filterRequest.to) &&
      (filterRequest.service === "both" || o.service === filterRequest.service)
    );
  };

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.row}>
          <div className={classes.column}>
            <div>
              <div className={classes.filterTextFieldGroup}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ marginRight: "40px" }}
                >
                  Meine Anfragen
                </Typography>
                <TextField
                  label="Von:"
                  className={classes.filterTextField}
                  value={fromRequest}
                  onChange={handleFromFilterChangeRequest}
                />
                <TextField
                  label="Nach:"
                  className={classes.filterTextField}
                  value={toRequest}
                  onChange={handleToFilterChangeRequest}
                />
                <TextField
                  select
                  label="Service:"
                  value={serviceRequest}
                  className={classes.filterTextField}
                  onChange={handleServiceFilterChangeRequest}
                >
                  <MenuItem value={"rideShare"}>Mitfahrgelegenheit</MenuItem>
                  <MenuItem value={"transport"}>Transport</MenuItem>
                  <MenuItem value={"both"}>
                    Transport / Mitfahrgelegenheit
                  </MenuItem>
                </TextField>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.filterButton}
                  onClick={handleApplyRequestFilter}
                >
                  Filtern
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.filterButton}
                  onClick={handleResetRequest}
                >
                  Zurücksetzen
                </Button>
              </div>
            </div>
            <Paper elevation={4} className={classes.column}>
              <List>
                <ListSubheader className={classes.subheader}>
                  <OfferDummy show={"requests"} />
                </ListSubheader>
                {requestsState.personalRequests
                  ?.filter(predicateRequest)
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
                  <Box mt={5} className={classes.loadingBox}>
                    <CircularProgress />
                  </Box>
                )}
              </List>
            </Paper>
          </div>
          <div className={classes.column}>
            <div>
              <div className={classes.filterTextFieldGroup}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ marginRight: "40px" }}
                >
                  Meine Angebote
                </Typography>
                <TextField
                  label="Von:"
                  className={classes.filterTextField}
                  value={fromOffer}
                  onChange={handleFromFilterChangeOffer}
                />
                <TextField
                  label="Nach:"
                  className={classes.filterTextField}
                  value={toOffer}
                  onChange={handleToFilterChangeOffer}
                />
                <TextField
                  select
                  label="Service:"
                  value={serviceOffer}
                  className={classes.filterTextField}
                  onChange={handleServiceFilterChangeOffer}
                >
                  <MenuItem value={"rideShare"}>Mitfahrgelegenheit</MenuItem>
                  <MenuItem value={"transport"}>Transport</MenuItem>
                  <MenuItem value={"both"}>
                    Transport / Mitfahrgelegenheit
                  </MenuItem>
                </TextField>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.filterButton}
                  onClick={handleApplyOfferFilter}
                >
                  Filtern
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.filterButton}
                  onClick={handleResetOffer}
                >
                  Zurücksetzen
                </Button>
              </div>
            </div>
            <Paper elevation={4} className={classes.column}>
              <List>
                <ListSubheader className={classes.subheader}>
                  <OfferDummy show={"offers"} />
                </ListSubheader>
                {offersState.personalOffers
                  ?.filter(predicateOffer)
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
                  <Box mt={5} className={classes.loadingBox}>
                    <CircularProgress />
                  </Box>
                )}
              </List>
            </Paper>
          </div>
        </div>
      </div>
    </Container>
  );
};
