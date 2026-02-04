import { createBrowserRouter } from 'react-router-dom';
import { SignUpFlow } from '@/components/Auth/SignUpFlow';
import SignInFlow from '@/components/Auth/SignInFlow';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import Layout from '@/layouts/UserLayout/Index';
import Dashboard from '@/pages/dashboard/DashboardPage';
import TasksPage from '@/pages/tasks/TasksPage';
import CalendarPage from '@/pages/calendar/CalendarPage';
import PermissionGuard from '@/components/Auth/PermissionGuard';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ProjectsPage from '@/pages/projects/ProjectsPage';
import TeamDetailPage from '@/pages/projects/TeamDetailPage';
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <PermissionGuard roles={["user"]} />,
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
              },
              {
                path: '/projects', element: <ProjectsPage/>
              },
              {
                path: '/projects/:id', element: <TeamDetailPage/>
              }
            ],
          }
        ]
      },

      {
        path: "/admin",
        element: <PermissionGuard roles={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboard /> },
              // { path: "users", element: <AdminUsersPage /> },
              // { path: "tasks", element: <AdminTasksPage /> },
            ],
          },
        ],
      }
    ]
  },
  { path: '/signup', element: <SignUpFlow /> },
  { path: '/signin', element: <SignInFlow /> }
]);
