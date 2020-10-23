
import Home from "../pages/Home"
import allRoutes from "./allRoutes"
//动态路由
const dynamicRoutes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: []
    },
    {
        path: "*",
        name: "page404",
        component: () => import(/* webpackChunkName: "Page404" */ "../pages/Page404")
    },
]
export default dynamicRoutes