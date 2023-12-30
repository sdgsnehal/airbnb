"use client";
import Container from "@/app/components/Container";
import useLoginModal from "@/app/components/hooks/useLoginModal";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import { SafeUser, safeListings } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { list } from "postcss";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
interface ListingClientProps {
  reservation?: Reservation[];
  listing: safeListings & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservation = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disableDates = useMemo(() => {
    let dates: Date[] = [];
    reservation.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservation]);
  const [isLoading, setIsloading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsloading(true);
    axios
      .post("/api/reservation", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.startDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);
  useEffect(()=>{
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price)
          }else{
            setTotalPrice(listing.price)
          }
        }
  },[dateRange,listing.price])
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="mt-6 
                grid
                grid-cols-1
                md:grid-cols-7
                md:gap-10"
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              guestCount={listing.guestCount}
            />
          <div className="order-first
          mb-10
          md:order-last
          md:col-span-3">
            <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value)=>setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disableDates={disableDates}/>

          </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
