/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

type TaskFormContextType = {
    // thêm mới
    isOpenfromAdd: boolean;
    openfromadd: () => void;
    closefromadd: () => void;
    togglefromadd: () => void;

    // chỉnh sửa
    isOpenfromEdit: boolean;
    openfromedit: () => void;
    closefromedit: () => void;
    toopenfromedit: () => void;

    idTask: string | number | null,
    setIdTask: Dispatch<SetStateAction<string | number | null>>
};

const TaskFormContext = createContext<TaskFormContextType | null>(null);

export function TaskFormProvider({ children }: { children: React.ReactNode }) {
    // from thêm mới
    const [isOpenfromAdd, setIsOpenfromAdd] = useState(false);
    const openfromadd = () => setIsOpenfromAdd(true);
    const closefromadd = () => setIsOpenfromAdd(false);
    const togglefromadd = () => setIsOpenfromAdd((prev) => !prev);

    // from edit
    const [isOpenfromEdit, setIsOpenfromEdit] = useState(false);
    const openfromedit = () => setIsOpenfromEdit(true);
    const closefromedit = () => setIsOpenfromEdit(false);
    const toopenfromedit = () => setIsOpenfromEdit((prev) => !prev);

    const [idTask, setIdTask] = useState<string | number | null>(null);
    return (
        <TaskFormContext.Provider value={{
            // thêm mới add
            isOpenfromAdd, openfromadd, closefromadd, togglefromadd,
            // chỉnh sửu
            isOpenfromEdit, openfromedit, closefromedit, toopenfromedit,

            idTask , setIdTask
        }}>
            {children}
        </TaskFormContext.Provider>
    );
}

export function useTaskForm() {
    const ctx = useContext(TaskFormContext);
    if (!ctx) {
        throw new Error("useTaskForm must be used within TaskFormProvider");
    }
    return ctx;
}
