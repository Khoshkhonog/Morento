import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppContext } from "../context/context"
function Registration() {
    const { backendUrl } = useAppContext()
    const navigate = useNavigate()
    const [password, Setpassword] = useState<string>()
    const [email, Setemail] = useState<string>()
    const [username, setUsername] = useState<string>()
    const [error, setError] = useState(null)

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setemail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setpassword(e.target.value)
    }
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const data_user = {
        email,
        password,
        is_active: true,
        is_superuser: false,
        is_verified: false,
        username,
        role_alid: 1
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            //registration
            const response = await fetch(`${backendUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_user)
            })
            if (!response.ok) {
                throw new Error('Ошибка при регистрации')
            }
            //auto login after registration2
            if (response.ok) {
                navigate("/sign-in")
            }
        } catch (error: any) {
            setError(error.message); // Обработка ошибки
            console.error('Ошибка:', error)

        };
    }
    return <div className="sign-in">
        <h1>Sign up</h1>
        <form className="sign-inputs" onSubmit={handleSubmit}>
            <input type="email" name="" id="" placeholder="Your email" onChange={handleEmailChange} />
            <input type="text" placeholder="Enter username" onChange={handleUsernameChange} />
            <input type="password" name="" id="" placeholder="Your password" onChange={handlePasswordChange} />
            <button className="primary-button" type="submit">Sign up</button>
        </form>
    </div>
}
export default Registration