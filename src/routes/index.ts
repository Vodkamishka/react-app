import Login from "../pages/Login";
import Event from "../pages/Events";

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/'
}

export interface IRoute {
    path: string;
    exact?: Boolean;
    component: React.ComponentType;

}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.EVENT, exact: true, component: Event}
]
