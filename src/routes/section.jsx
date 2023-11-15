import { Navigate, Outlet, useRoutes, redirect } from "react-router-dom";
import { Helmet} from 'react-helmet'
import DashboardLayout from "../layouts";
import { Box } from "@mui/material";
import Dashboard from "../scenes/dasboard/pages";
import OrdersPage from "../scenes/orders/pages";
import CreateOrderPage from "../scenes/orders/pages/create-new-order-page";
import CategoriesPage from "../scenes/categories/pages";
import CreateCategoryPage from "../scenes/categories/pages/create-category-page";
import RevenuePage from "../scenes/revenue/pages";
import ProductsPage from "../scenes/products/pages";
import CreateProductPage from "../scenes/products/pages/create-product-page";
import LoginPage from "../scenes/login/login-page";

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
                    },
                    {path: 'new-category', element: <CreateCategoryPage />}
                ]},
                {path: 'revenue', element: <RevenuePage />},
                {path: 'products', children: [
                    {path: '', index: true, element: <ProductsPage />},
                    {path: 'new-product', element: <CreateProductPage />}
                ]}
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        }
    ]);

    return routes;
};