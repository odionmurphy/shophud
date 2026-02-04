import axios from "axios"
import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const email = emailRef.current!.value.trim()
    const password = passwordRef.current!.value.trim()
    if (!email || !password) {
      return alert("email and password should not be empty")
    }

    try {
      const data = await axios.post("http://localhost:3001/users/register", {
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
      <h1>Register page</h1>

      <br />

      <form onSubmit={registerUser}>
        <input
          type='email'
          placeholder='Enter email'
          ref={emailRef}
          defaultValue={"@gmail.com"}
        />
        <input
          type='password'
          placeholder='Enter password'
          ref={passwordRef}
          defaultValue={"12345678"}
        />
        <button>Register User</button>
      </form>
    </div>
  )
}