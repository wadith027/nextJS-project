import { useRouter } from "next/router"
import { Children, useState, useEffect } from "react"
import Link from 'next/link'
// import { TEInput, TERipple } from "tw-elements-react";

export default function SignIn() {
  const router = useRouter()
  // useEffect(() => {
  //   if(localStorage.getItem("token")){
  //     router.push("/user");
  //   }
  // }, [])

  const [state, setState] = useState({
    email: "",
    password: ""
  })
  

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    console.log(state);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.token)
      router.push("/user")
    } else {
      alert("Bad credentials")
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  type="email" name="email"  value={state.email} onChange={handleChange} autoComplete="off"
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password" name="password" value={state.password} onChange={handleChange}
                  className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div class="mt-7 flex flex-col gap-2">
                    <button
                        class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                          <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                            class="h-[18px] w-[18px] "/>Continue with
                        Google
                    </button>
            </div>

          <div className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            <Link href="/signup">Signup</Link>
              
            </a>
          </div>
        </div>
      </div>
      
    </>
  )
}