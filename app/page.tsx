import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings, { IListingParams } from "./actions/getListing";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listing = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  
  return (
    <ClientOnly>
      <Container>
        <div
          className="
        grid
        grid-cols-1
        gap-8
        pt-24
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6"
        >
          {listing.map((listings:any) => 
             (
              <ListingCard
                key={listings.id}
                data={listings}
                currentUser={currentUser}
              />
            )
          )}
        </div>
      </Container>
    </ClientOnly>
  );
};
export default Home;
