'use client'
import Container  from "../Container"
import React from 'react'
import CategoryBox from "../CategoryBox";
import { GiWindmill } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useSearchParams,usePathname } from "next/navigation";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { GiIsland } from "react-icons/gi";
import { GiBoatFishing } from "react-icons/gi";
import { FaPersonSkating } from "react-icons/fa6";
import { FaMountainCity } from "react-icons/fa6";
import { MdCastle } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { FaSnowflake } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { GiCaveEntrance,GiDesert,GiBarn } from "react-icons/gi";
export const categories = [
    {
        label:'Beach',
        icon:FaUmbrellaBeach,
        description:'This property is close to the beach!'
    },
    {
        label:'Windmill',
        icon:GiWindmill,
        description:'This property has Windmill'
    },
    {
        label:'Modern',
        icon:HiOutlineHomeModern,
        description:'This property is Modern'
    },
    {
        label:'Country',
        icon:FaMountainCity,
        description:'This property is in countryside'
    },
    {
        label:'Pools',
        icon:LiaSwimmingPoolSolid,
        description:'This property has pools'
    },
    {
        label:'Islands',
        icon:GiIsland,
        description:'This property on Islands'
    },
    {
        label:'Lake',
        icon:GiBoatFishing,
        description:'This property on lake'
    },
    {
        label:'Sking',
        icon:FaPersonSkating,
        description:'This property ha sking'
    },
    {
        label:'Castle',
        icon:MdCastle,
        description:'This property is in the castle'
    },
    {
        label:'Camping',
        icon:GiCampingTent,
        description:'This property has camping'
    },
    {
        label:'Arctic',
        icon:FaSnowflake,
        description:'This property has snow'
    },
    {
        label:'Cave',
        icon:GiCaveEntrance,
        description:'This property has cave'
    },
    {
        label:'Desert',
        icon:GiDesert,
        description:'This property is in desert'
    },
    {
        label:'Barn',
        icon:GiBarn,
        description:'This property is in barn'
    },
    {
        label:'Lux',
        icon:IoDiamond,
        description:'This property is luxary'
    },

]

export const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if(!isMainPage){
        return null;
    }

  return (
    <Container>
        <div
        className="pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto">
            {categories.map((item)=>(
                <CategoryBox
                key={item.label}
                label={item.label}
                selected={category === item.label}
                icon={item.icon}/>

                
            ))}

        </div>

    </Container>
  )
}
