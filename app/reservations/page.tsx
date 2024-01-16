import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getResevations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";
const ReservationPage = async()=>{
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return(
            <ClientOnly>
                <EmptyState
                title="Unauthorized"
                subtitle="Please Login"/>
            </ClientOnly>
        )
    }
  const reservation = await getResevations({
    authorId:currentUser.id
  })
  if(reservation.length === 0){
    return (
        <ClientOnly>
            <EmptyState
            title="No Reservation"
            subtitle="Looks Like you have no reservation on your properties"/>
        </ClientOnly>
    )
  }
  return (
    <ClientOnly>
        <ReservationClient
        reservations={reservation}
        currentUser={currentUser}/>

    </ClientOnly>
  )
};
export default ReservationPage;