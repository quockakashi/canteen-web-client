import { Navigate, Outlet, useRoutes, redirect } from "react-router-dom";
import DashboardLayout from "../layouts";
import { Box } from "@mui/material";
import Dashboard from "../scenes/dasboard/pages";
import OrdersPage from "../scenes/orders/pages";
import CreateOrderPage from "../scenes/orders/pages/create-new-order-page";
import CategoriesPage from "../scenes/categories/pages";

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
                ]},
                {path: 'categories', children: [
                    {
                        index: true, element: <CategoriesPage />
                    }
                ]}

            ]
        }
    ]);

    return routes;
};