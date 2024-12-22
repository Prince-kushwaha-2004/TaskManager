import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import store from "./store.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Admin from './components/admin/Admin';
import ManageUser from './components/admin/ManageUser';
import Dashboard from './components/dashboard/Dashboard';
import RootLayout from './components/layout/RootLayout.jsx';
import Login from './components/login/Login';
import Manager from './components/manager/Manager';
import Permissions from './components/manager/permissions';
import Register from './components/register/Register';
import Todo from './components/user/Todo';
import User from './components/user/user';
import './index.css';
import Root from './Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<RootLayout />} >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="admin" element={<Admin />} >
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="manageUser" element={<ManageUser />} />
      </Route>
      <Route path="manager" element={<Manager />} >
        <Route index path='dashboard' element={<Dashboard />} />
        <Route path="permissions" element={<Permissions />} />
      </Route>
      <Route path="user" element={<User />} >
        <Route index path='dashboard' element={<Dashboard />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Route>
  ),
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    }
  }


);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </Provider>
  // </StrictMode>
)
