import { Outlet, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts";

export default function Router() {
    const routes = useRoutes([
        {
            element: (
                <DashboardLayout>
                    <Outlet />
                </DashboardLayout>
            ),
            children: [
                {element: {}, index: true}
            ]
        }
    ]);

    return routes;
};