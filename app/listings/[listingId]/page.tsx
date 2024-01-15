import React from "react";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getResevations from "@/app/actions/getReservations";
interface IParams {
  listingId?: string;
}
const Listingpage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getResevations(params)
  
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient 
      listing={listing}
      reservation={reservations} 
      currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Listingpage;
