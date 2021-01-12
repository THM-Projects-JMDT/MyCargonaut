import { List, ListItem, Typography } from "@material-ui/core";
import React from "react";
import { Offer } from "../Offer";
import { OfferDummy } from "../Offer/OfferDummy";

export const Dashboard = () => {
  const [displayList, setDisplayList] = React.useState<any[] | undefined>([]);
  const displayName = "offers";

  const predicate = (o: any) => {
    return (
      (!filter.from || o.offer.from.toLowerCase() === filter.from) &&
      (!filter.to || o.offer.to.toLowerCase() === filter.to) &&
      (filter.service === "both" || o.offer.service === filter.service)
    );
  };

  return (
    <div>
      <Typography variant="h3">Meine Anfragen</Typography>
      <List>
        <OfferDummy show={"offers"} />
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
      <Typography variant="h3">Meine Angebote</Typography>
    </div>
  );
};
