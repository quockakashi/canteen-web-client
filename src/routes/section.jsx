import { Navigate, Outlet, useRoutes } from "react-router-dom";
import DashboardLayout from "../layouts";
import Dashboard from "../scenes/dasboard/pages";
import OrdersPage from "../scenes/orders/pages";
import CreateOrderPage from "../scenes/orders/pages/create-new-order-page";
import CategoriesPage from "../scenes/categories/pages";
import CreateCategoryPage from "../scenes/categories/pages/create-category-page";
import RevenuePage from "../scenes/revenue/pages";
import ProductsPage from "../scenes/products/pages";
import CreateProductPage from "../scenes/products/pages/create-product-page";
import LoginPage from "../scenes/login/login-page";
import Error404Page from "../scenes/errors/404/error-404-page";
import StoragePage from "../scenes/storage/pages";
import ReceiveStockPage from "../scenes/storage/pages/receive-stock-page";
import DeliverStockPage from "../scenes/storage/pages/deliver-stock-page";
import AccountsPage from "../scenes/accounts/pages";
import ProfilePage from "../scenes/profile/pages";
import EditCategoryPage from "../scenes/categories/pages/edit-category-page";
import EditProductPage from "../scenes/products/pages/edit-product";
import CreateAccountPage from "../scenes/accounts/pages/new-account-page";
import EditAccountPage from "../scenes/accounts/pages/edit-account";

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
                    {path: 'new-category', element: <CreateCategoryPage />},
                    {path: 'edit/:id', element: <EditCategoryPage />}
                ]},
                {path: 'revenue', element: <RevenuePage />},
                {path: 'products', children: [
                    {path: '', index: true, element: <ProductsPage />},
                    {path: 'new-product', element: <CreateProductPage />},
                    {path: 'edit/:id', element: <EditProductPage />}
                ]},
                {path: 'storage', children: [
                    {path: '', index: true, element: <StoragePage />},
                    {path: 'receive-stock', element: <ReceiveStockPage />},
                    {path: 'deliver-stock', element: <DeliverStockPage />}
                ]},
                {path: 'accounts', children: [
                    {path: '', index: true, element: <AccountsPage />},
                    {path: 'new-account', element: <CreateAccountPage />},
                    {
                        path: 'edit/:id',
                        element: <EditAccountPage />
                    }
                ]},
                {
                    path: '/profile',
                    element: <ProfilePage />
                }
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/*',
            element: <Error404Page />
        }
    ]);

    return routes;
};