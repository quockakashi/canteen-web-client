import { Navigate, Outlet, useRoutes, redirect } from "react-router-dom";
import DashboardLayout from "../layouts";
import { Box } from "@mui/material";
import Dashboard from "../scenes/dasboard";
import OrdersPage from "../scenes/orders";
import CreateOrderPage from "../scenes/orders/create-new-order-page";

export default function Router() {
    const routes = useRoutes([
    
        {
            element: (
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
            ),
            children: [
                {path: '', element: <Navigate to='home' replace></Navigate>},
                {path: 'home', element: <Dashboard />},
                {path: 'orders', children: [
                    {index: true, element: <OrdersPage />},
                    {path: 'new-oder', element: <CreateOrderPage />}
                ]}

            ]
        }
    ]);

    return routes;
};