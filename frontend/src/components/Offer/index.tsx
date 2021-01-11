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
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "./Offer.style";
import { CheckCircle } from "@material-ui/icons";
import { GridElement } from "../../util/GridElement";
import { UserSummary } from "../../util/UserSummary";
import { TrackingDialog } from "./TrackingDialog";
import { CargoCoins } from "../../util/CargoCoins";
import Divider from "@material-ui/core/Divider";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import StarIcon from "@material-ui/icons/Star";
import { UserDetails } from "../../model/UserDetails";
import { OfferDetails } from "../../model/OfferDetails";
import { RatingDialog } from "./RatingDialog";

export interface OfferProps {
  provider?: UserDetails;
  customer?: UserDetails;
  offer: OfferDetails;
  loggedInUserId: string;
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
  const [ratingOpen, setRatingOpen] = React.useState(false);
  const [trackingOpen, setTrackingOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isPendingOffer = customer === undefined;
  const isPendingRequest = provider === undefined;
  const isPending = isPendingOffer || isPendingRequest;

  const isProvider = loggedInUserId === provider?.id;
  const isCustomer = loggedInUserId === customer?.id;
  const isMyOffer = isProvider || isCustomer;

  const handleTrackingClick = (event: any) => {
    event.stopPropagation();
    setTrackingOpen(true);
  };

  const handleAvatarClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Accordion
      className={classes.root}
      data-testid="offer-card"
      classes={{ rounded: classes.paper }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container alignItems="center">
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
            {typography(offer.orderDate.toLocaleDateString())}
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
            {
              <div style={{ display: "flex", justifyContent: "center" }}>
                {typography(String(offer.price))}
                <CargoCoins className={classes.moneyIcon} />
              </div>
            }
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
                      open={trackingOpen}
                      onClose={() => setTrackingOpen(false)}
                    />
                  )}
                </div>
              )}
            </GridElement>
          )}
          {isMyOffer && (
            <GridElement>
              {!isPending && (
                <div onClick={handleAvatarClick}>
                  {isProvider ? (
                    <UserSummary
                      username={customer?.username}
                      rating={customer?.rating}
                    />
                  ) : (
                    <UserSummary
                      username={provider?.username}
                      rating={provider?.rating}
                    />
                  )}
                </div>
              )}
            </GridElement>
          )}
        </Grid>
      </AccordionSummary>
      <Divider variant="middle" className={classes.divider} />
      <AccordionDetails className={classes.accordionDetails}>
        <Box ml={7} my={2}>
          <Typography variant="subtitle2">Beschreibung:</Typography>
          <Typography>{offer.description ?? "-"}</Typography>
        </Box>
      </AccordionDetails>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleAvatarMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <ChatBubbleIcon />
          </ListItemIcon>
          Chat
        </MenuItem>
        <MenuItem onClick={() => setRatingOpen(true)}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          Bewerten
        </MenuItem>
      </Menu>
      <RatingDialog
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        username={
          (loggedInUserId === customer?.id
            ? provider?.username
            : customer?.username) ?? ""
        }
      />
    </Accordion>
  );
};
