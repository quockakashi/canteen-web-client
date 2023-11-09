import { Navigate, Outlet, useRoutes, redirect } from "react-router-dom";
import DashboardLayout from "../layouts";
import { Box } from "@mui/material";

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
                {path: 'home', element: <Box>Home</Box>},

            ]
        }
    ]);

    return routes;
};