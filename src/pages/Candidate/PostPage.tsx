import CreatePostForm from "../../components/candidate/CreatePostForm"
import DashboardLayout from "../../components/layouts/DashboardLayout"



export const PostPage = () => {
    return (
        <DashboardLayout active="Post">
            <CreatePostForm/>
        </DashboardLayout>
    )
}