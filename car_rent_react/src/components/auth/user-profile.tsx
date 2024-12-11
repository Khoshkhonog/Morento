import { useAppContext } from "../context/context"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function UserProfile() {
    const navigate = useNavigate()
    async function handleLogout() {
        await axios.post('http://127.0.0.1:8000/auth/jwt/logout', null, { withCredentials: true })
        handleUpdateUser(null)
        navigate('/')
    }

    const { currentUser, handleUpdateUser } = useAppContext()
    return (
        <div className="user-profile-container">
            <h1>My profile</h1>
            <div className="user-profile">
                <div className="profile-column">
                    <div>Username:</div>
                    <div >{currentUser?.username}</div>
                </div>
                <div className="profile-column">
                    <div>Email:</div>
                    <div>{currentUser?.email}</div>
                </div>
                <button className="primary-button" onClick={() => handleLogout()}>Log out</button>
            </div>
        </div>

    )
}
