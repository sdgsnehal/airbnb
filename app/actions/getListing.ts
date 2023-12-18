import prisma from "@/app/libs/prismadb";
export default async function getListings() {
    try{
        const listing = await prisma.listing.findMany({
            orderBy:{
                CreatedAt:"desc"
            }
        });

        const safeListings = listing.map((listing)=>({
            ...listing,
            CreatedAt:listing.CreatedAt.toISOString()
        }));
        return safeListings
    }catch(error:any){
        throw new Error(error)
    }
    
}