import Container from "./components/Container";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListing";
import ListingCard from "./components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";


export default async function Home() {
  const listing = await getListings()
  const currentUser = await getCurrentUser()


  if(listing.length ===0){
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8">
          {listing.map((listings)=>{
            return (
              <ListingCard
              currentUser={currentUser}
              key={listings.id}
              data={listings}/>
            )
          })}

        </div>

      </Container>
    </ClientOnly>
  )
}
