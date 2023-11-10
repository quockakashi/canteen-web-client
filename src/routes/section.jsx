import { Navigate, Outlet, useRoutes, redirect } from "react-router-dom";
import DashboardLayout from "../layouts";
import { Box } from "@mui/material";
import Dashboard from "../scenes/dasboard";

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

            ]
        }
    ]);

    return routes;
};