import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, redirect } from 'react-router-dom'
import { authActions } from '../../store/auth'
import requester from '../../services/Requester.js'

const Login = () => {
  const loadingMsg = useSelector(state => state.auth.loadingMsg)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const submitHandler = async e => {
    e.preventDefault()
    dispatch(authActions.setLoadingMessage('Logging in...'))

    try {
      const user = await requester.login(username, password)

      dispatch(authActions.setLoadingMessage(null))
      dispatch(authActions.loggedIn({userId: user.userId, username}))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
             alt="Your Company"/>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{` `}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            register
          </Link>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {loadingMsg ? (
            <div>{loadingMsg}</div>
          ) : (
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input type="text"
                         id="username"
                         name="username"
                         value={username}
                         onChange={e => setUsername(e.target.value)}
                         required
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input type="password"
                         id="password"
                         name="password"
                         onChange={e => setPassword(e.target.value)}
                         autoComplete="current-password"
                         required
                         className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <button type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
