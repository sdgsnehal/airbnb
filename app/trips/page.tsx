import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getResevations from "../actions/getReservations";
import TripsClient from "./TripsClient";
const TripsPage = async()=>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
      return (
        <ClientOnly>
            <EmptyState
            title="Unauthorized"
            subtitle="Please Login"/>
        </ClientOnly>
      )  
    }
    const reservations = await getResevations({
        userId:currentUser.id
    })
   
    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                title="No trips found"
                subtitle="Looks Like you havent reserved any trips"/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
           <TripsClient
           reservations={reservations}
           currentUser={currentUser}/> 
        </ClientOnly>
    )

}
export default TripsPage;