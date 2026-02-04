import React, { useRef } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailRef.current!.value.trim()
    const password = passwordRef.current!.value.trim()
    if (!email || !password) {
      return alert("email and password should not be empty")
    }

    try {
      const data = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      })

      console.log(data)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  }

  return (
    <div>
      <h1>Login page</h1>

      <br />

      <form onSubmit={loginUser}>
        <input type='email' placeholder='Enter email' ref={emailRef} />
        <input type='password' placeholder='Enter password' ref={passwordRef} />
        <button>Log in</button>
      </form>
    </div>
  )
}