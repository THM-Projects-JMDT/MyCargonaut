import React from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "./Offer.style";
import { CheckCircle } from "@material-ui/icons";
import { GridElement } from "../GridElement";
import { UserSummary } from "../UserSummary";
import { TrackingDetails, TrackingDialog } from "./TrackingDialog";

export interface UserDetails {
  id: number;
  username: string;
  rating: number; // TODO: create type for number of stars (0 - 5)
  // TODO: field for profile picture
}

export interface OfferDetails {
  from: string;
  to: string;
  service: string; // TODO: use 'Service' type
  date: Date;
  seats?: number;
  storageSpace?: number;
  price: number;
  description: string;
  tracking?: TrackingDetails;
}

export interface OfferProps {
  provider?: UserDetails;
  customer?: UserDetails;
  offer: OfferDetails;
  loggedInUserId: number;
}

export const renderService = (service: string) => {
  switch (service) {
    case "transport":
      return "Transport";
    case "rideShare":
      return "Mitfahrgelegenheit";
    default:
      return "";
  }
};

const typography = (text: string) => {
  return <Typography>{text}</Typography>;
};

export const Offer: React.FC<OfferProps> = ({
  offer,
  provider,
  customer,
  loggedInUserId,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const isPendingOffer = customer === undefined;
  const isPendingRequest = provider === undefined;
  const isPending = isPendingOffer || isPendingRequest;

  const isProvider = loggedInUserId === provider?.id;
  const isCustomer = loggedInUserId === customer?.id;
  const isMyOffer = isProvider || isCustomer;

  const handleTrackingClick = (event: any) => {
    event.stopPropagation();
    setOpen(true);
  };

  return (
    <Accordion className={classes.root} data-testid="offer-card">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          {!isMyOffer && (
            <GridElement>
              {isPendingOffer ? (
                <UserSummary
                  username={provider?.username}
                  rating={provider?.rating}
                />
              ) : (
                <UserSummary
                  username={customer?.username}
                  rating={customer?.rating}
                />
              )}
            </GridElement>
          )}
          <GridElement header="von:">{typography(offer.from)}</GridElement>
          <GridElement header="nach:">{typography(offer.to)}</GridElement>
          <GridElement header="Service:">
            {typography(renderService(offer.service))}
          </GridElement>
          <GridElement header="Datum:">
            {typography(offer.date.toLocaleDateString())}
          </GridElement>
          {offer.service === "rideShare" ? (
            <GridElement header="Sitze:">
              {typography(String(offer.seats))}
            </GridElement>
          ) : (
            <GridElement header="Stauraum:">
              {typography(String(offer.storageSpace) + " l")}
            </GridElement>
          )}
          <GridElement header="Preis:">
            {typography(String(offer.price + " CargoCoins"))}
          </GridElement>
          {!isMyOffer && isPending ? (
            <GridElement>
              <Box mt={2}>
                <IconButton
                  color="primary"
                  onClick={(event) => event.stopPropagation()}
                >
                  <CheckCircle
                    data-testid="check-circle-icon"
                    fontSize="large"
                  />
                </IconButton>
              </Box>
            </GridElement>
          ) : (
            <GridElement header="Status:">
              {isPending ? (
                <Typography className={classes.greenText}>
                  <i>OFFEN</i>
                </Typography>
              ) : (
                <div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleTrackingClick}
                  >
                    IN BEARBEITUNG
                  </Button>
                  {offer.tracking && (
                    <TrackingDialog
                      tracking={offer.tracking}
                      open={open}
                      onClose={() => setOpen(false)}
                    />
                  )}
                </div>
              )}
            </GridElement>
          )}
          {isMyOffer && (
            <GridElement>
              {!isPending &&
                (isProvider ? (
                  <UserSummary
                    username={customer?.username}
                    rating={customer?.rating}
                  />
                ) : (
                  <UserSummary
                    username={provider?.username}
                    rating={provider?.rating}
                  />
                ))}
            </GridElement>
          )}
        </Grid>
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Box ml={7}>
          <Typography variant="subtitle2">Beschreibung:</Typography>
          <Typography>{offer.description}</Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
