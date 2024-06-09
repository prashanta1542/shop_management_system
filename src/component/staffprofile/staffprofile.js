import React,{useState,useEffect} from "react";
import PersoanlInfo from "./personalinfo";
import StaffProfileLayout from "./staffprofilelayout";
export default function StaffProfile(){

    return(
        <div>
            <StaffProfileLayout/>
            <PersoanlInfo/>
        </div>
    );
}