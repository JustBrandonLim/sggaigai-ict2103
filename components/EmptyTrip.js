import { useState } from "react";
let strokeColor = "orange";
let activeColor = "grey";

export default function EmptyTrip() { 
      return (
        <div className="">
            <h3>You haven't planned a trip yet!</h3>
        </div>
      );
  }