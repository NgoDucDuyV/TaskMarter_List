import React from 'react'
import TaskTable from './TaskTable';
import TaskHeader from './TaskHeader';
import TaskFilter from './TaskFilter';
import TaskFooter from './TaskFooter';
import { Toaster } from 'sonner';
import { TaskProvider } from '@/contexts/task-context';
const TasksPage = () => {

    return (
        <>
            <TaskProvider>

                <Toaster richColors />
                {/* header tassk */}
                <TaskHeader />

                {/* filter task */}
                <TaskFilter />

                {/* table task */}
                <TaskTable />

                {/* footer task */}
                <TaskFooter />
            </TaskProvider>
        </>
    )
}

export default TasksPage
