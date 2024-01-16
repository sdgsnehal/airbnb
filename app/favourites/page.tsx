import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";
const ListingPage = async ()=> {
    const listing = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(listing.length === 0){
    return (
        <ClientOnly>
          <EmptyState
          title=" No favorites found"
          subtitle=" Looks like you have no favorites listing"/>  
        </ClientOnly>
    )}
    return (
        <ClientOnly>
            <FavoritesClient
            listing={listing}
            currentUser={currentUser}/>

        </ClientOnly>
    )
}
export default ListingPage;