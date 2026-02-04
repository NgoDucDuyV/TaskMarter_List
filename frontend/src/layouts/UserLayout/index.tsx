import Layout from "./Siderbar";
import { SidebarProviderContext } from "@/contexts/sidebar-context";
import { TaskFormProvider } from "@/contexts/task-form-context";

const Index = () => {

    return (
        <>
        <SidebarProviderContext>
            <TaskFormProvider>
                <Layout />
            </TaskFormProvider>
        </SidebarProviderContext>
        </>
    );
};

export default Index;
