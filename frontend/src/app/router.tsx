import { createBrowserRouter } from 'react-router-dom';
import { SignUpFlow } from '@/components/Auth/SignUpFlow';
import SignInFlow from '@/components/Auth/SignInFlow';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/layouts/UserLayout/Siderbar';
import Dashboard from '@/pages/dashboard/DashboardPage';
import TasksPage from '@/pages/tasks/TasksPage';
import CalendarPage from '@/pages/calendar/CalendarPage';
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: '/', element: <Dashboard />,
          },
          {
            path: '/taskPage', element: <TasksPage />
          },
          {
            path: '/calendarPage', element: <CalendarPage />
          }
        ],
      }
    ]
  },
  { path: '/signup', element: <SignUpFlow /> },
  { path: '/signin', element: <SignInFlow /> }
]);
