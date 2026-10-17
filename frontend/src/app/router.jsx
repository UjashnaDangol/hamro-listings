import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import BuyerDashboardPage from "../pages/BuyerDashboardPage";

export const router = createBrowserRouter(
    [
        {
            path : "/" ,
            element : <DashboardLayout/>,

            children : [
                {
                  index : true,
                  element : <BuyerDashboardPage/>
                }
            ]

        }
    ]
)