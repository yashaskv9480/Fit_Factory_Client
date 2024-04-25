import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";

import React from 'react'

export const useAuth = () => {
        return useContext(UserContext);
}
