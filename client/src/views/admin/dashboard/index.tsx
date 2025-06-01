//import FC from react
import { type FC } from "react";

//import SidebarMenu
import SidebarMenu from '../../../components/SidebarMenu';

//import custom hook useAuthUser
import { useAuthUser } from '../../../hooks/auth/useAuthUser';

const Dashboard: FC = () => {

    // get user from useAuthUser
    const user = useAuthUser();

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-3">
                    <SidebarMenu />
                </div>
                <div className="col-md-9">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-header">
                            DASHBOARD
                        </div>
                        <div className="card-body">
                            {user ? (
                                <p>Selamat datang, <strong>{user.name}</strong>!</p>
                            ) : (
                                <p>Kamu belum login.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard