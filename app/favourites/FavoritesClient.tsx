"use client";

import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
import Heading from "../components/navbar/Heading";
import { SafeUser, safeListings } from "../types";

interface FavoritesClientProps {
  listings: safeListings[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="favorites" subtitle="List of places you have favorited" />
      <div
        className="
        mt-10
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6"
      >
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
