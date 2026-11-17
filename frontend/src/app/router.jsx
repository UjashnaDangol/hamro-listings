import {createBrowserRouter} from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import BuyerDashboardPage from "../pages/BuyerDashboardPage";
import PropertyDetailsPage from "../pages/PropertyDetailsPage";

export const router = createBrowserRouter(
    [
        {
            path : "/" ,
            element : <DashboardLayout/>,

            children : [
                {
                  index : true,
                  element : <BuyerDashboardPage/>
                },
                 {
        path: "properties/:id",
        element: <PropertyDetailsPage />,
      },
            ]

        }
    ]
)