import {
  RootRoute,
  Router,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from '@tanstack/router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Home } from './Home'
import { PostList } from './PostList'
import { TodoList } from './TodoList'

const routeRoute = new RootRoute({
  component: () => (
    <div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/"
          activeProps={{
            style: {
              textDecoration: 'underline',
            },
          }}>
          Home
        </Link>
        <Link
          to="/posts"
          activeProps={{
            style: {
              textDecoration: 'underline',
            },
          }}>
          Posts
        </Link>
        <Link
          to="/todos"
          activeProps={{
            style: {
              textDecoration: 'underline',
            },
          }}>
          Todos
        </Link>
      </nav>
      <Outlet />
    </div>
  ),
})
const homeRoute = new Route({
  getParentRoute: () => routeRoute,
  component: Home,
  path: '/',
})
const postsRoute = new Route({
  getParentRoute: () => routeRoute,
  component: PostList,
  path: '/posts',
})
const todosRoute = new Route({
  getParentRoute: () => routeRoute,
  component: TodoList,
  path: '/todos',
})

const routeTree = routeRoute.addChildren([homeRoute, postsRoute, todosRoute])
const router = new Router({ routeTree })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

export const Routes = () => {
  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} initialIsOpen={false} />
    </>
  )
}
