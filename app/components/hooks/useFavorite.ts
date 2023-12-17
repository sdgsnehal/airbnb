import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback,useMemo } from "react";
import { Toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import useLoginModal from "./useLoginModal";
interface IUseFavorite {
  listingId:string;
  currentUser?:SafeUser | null;
}
const useFavorite = ({
    listingId,
    currentUser,

}:IUseFavorite)=>{
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(()=>{
        
    })

}