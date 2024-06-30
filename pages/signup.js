import { useRouter } from "next/router"
import { useState } from "react"
import Link from 'next/link'

export default function SignUp() {
  const router = useRouter()

  const [state, setState] = useState({
    
    email: "",
    password: ""
  })
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    if (!validateEmail(state.email)) {
      if(!state.email){
        setEmailError('Email is required!');
      }
      else{
        setEmailError('Invalid email format');
      }
      return;
    } 
    else if (!validatePassword(state.password)) {
      setEmailError('');
      setConfirmPasswordError('');
      if(!state.password){
        setPasswordError('Password is required!');
      }else{
        setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number');
      }
      return;
    }
    else if (state.password !== confirmPassword) {
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('Passwords do not match')
      return;
    } 
    else{
      setConfirmPassword('');
      setEmailError('');
      setPasswordError('');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (res.ok) {
        alert("user registered success")
        const json = await res.json()
        localStorage.setItem("token", json.token)
        router.push("/user")
      }
    }
    
  }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-36 w-auto"
            src="https://png.pngtree.com/png-vector/20220704/ourmid/pngtree-wave-blue-logo-template-png-image_5565593.png"
            alt="Your Company"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="text" name="email"  value={state.email} onChange={handleChange} autoComplete="off"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {emailError && <p className="text-red-600 ml-2">{emailError}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password" name="password" value={state.password} onChange={handleChange}
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {passwordError && <p className="text-red-600 ml-2">{passwordError}</p>}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password" name="confirmPassword" value={confirmPassword.confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {confirmPasswordError && <p className="text-red-600">{confirmPasswordError}</p>}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            <Link href="/signin">Login here</Link>
              
            </a>
          </div>
        </div>
      </div>
      
    </>
  )
}