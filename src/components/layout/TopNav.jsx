import { Disclosure } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Example () {
  const username = useSelector(state => state.auth.username)

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-white shadow-sm">
          {({open}) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-8 w-auto lg:hidden"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-8 w-auto lg:block"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      <Link to="/todos"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                        My Todos
                      </Link>
                      <Link to="/todos/create"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                        Add Todo
                      </Link>
                    </div>
                  </div>

                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <div
                      className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${username}`}
                        alt={username}
                        title={username}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}
