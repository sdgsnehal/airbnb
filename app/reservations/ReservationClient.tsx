'use client';
import {toast} from "react-hot-toast";
import axios from "axios";
import { useCallback,useState } from "react";
import { useRouter } from "next/router";
import { safeReservation,SafeUser } from "../types";
import Heading from "../components/navbar/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";
interface ReservationClientProps{
  reservations:safeReservation[];
  currentUser?:SafeUser | null;
}
const ReservationClient:React.FC<ReservationClientProps> =({
    reservations,
    currentUser
})=>{
    //const router = useRouter();
    const [deletingId,setDeletingId]= useState('');
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled");

        })

    },[])

    return (
        <Container>
           <Heading
           title="Reservations"
           subtitle="Bookings on your properties"/> 
        </Container>

    );
}
export default ReservationClient;