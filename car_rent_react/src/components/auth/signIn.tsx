import { useState } from "react"
import { useAppContext } from "../context/context"
import { Link, useNavigate } from "react-router-dom"


function SignIn() {
    const [password, Setpassword] = useState<string>()
    const [email, Setemail] = useState<string>()

    const navigate = useNavigate()
    const { backendUrl } = useAppContext()
    const [error, setError] = useState(null)

    const { handleUpdateUser } = useAppContext()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setemail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Setpassword(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        //sign in 
        try {
            const response = await fetch(`${backendUrl}/auth/jwt/login`, {
                method: 'POST',
                credentials: "include",
                mode: 'cors',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${email}&password=${password}`
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            //get user data from backend
            try {
                const response = await fetch(`${backendUrl}/users/me`, {
                    method: 'GET',
                    credentials: "include",
                    mode: 'cors',
                    headers: {
                        'accept': 'application/json',
                    },
                }
                );
                const data = await response.json();
                console.log(data);
                handleUpdateUser(data);
                navigate('/')
            } catch (error: any) {
                setError(error.message); // Обработка ошибки
                console.error('Ошибка:', error);
            }
        } catch (error: any) {
            setError(error.message); // Обработка ошибки
            console.error('Ошибка:', error);
        }
    }
    return <div className="sign-in">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} className="sign-inputs">
            <input type="text" name="" id="" placeholder="Your email" onChange={handleEmailChange} />
            <input type="password" name="" id="" placeholder="Your password" onChange={handlePasswordChange} />
            <button className="primary-button" type="submit">Log in </button>
        </form>
        <Link to={'/registration'}>Reg</Link>
    </div>
}
export default SignIn