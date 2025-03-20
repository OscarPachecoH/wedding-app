import { Navigate } from "react-router-dom";

export const ProtectedRouter = ({ user, children }) => {
    if(!user){
        return <Navigate to="/login"/>
    }

    return (children)
}