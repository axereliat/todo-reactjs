import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import requester from '../../services/Requester.js'
import utilityService from '../../services/UtilityService.js'
import { authActions } from '../../store/auth.js'

export default () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const loadingMsg = useSelector(state => state.auth.loadingMsg)
  const userId = useSelector(state => state.auth.userId)
  const [content, setContent] = useState('')
  const [statusId, setStatusId] = useState(1)
  const [newTodo, setNewTodo] = useState(null);

  const dispatch = useDispatch()

  const submitHandler = async e => {
    e.preventDefault()
    dispatch(authActions.setLoadingMessage('Creating todo...'))

    try {
      const todo = await requester.storeTodo(content, statusId, userId)

      dispatch(authActions.setLoadingMessage(null))

      setContent('')
      setStatusId(1)
      setNewTodo(todo)
    } catch (err) {
      alert(err.message)
    }
  }

  if (newTodo) {
    return <Navigate to="/todos" replace={true} />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Add Todo
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {loadingMsg ? (
            <div>{loadingMsg}</div>
          ) : (
            <form className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                  Content
                </label>
                <div className="mt-2">
                   <textarea
                     id="content"
                     name="content"
                     value={content}
                     onChange={e => setContent(e.target.value)}
                     rows={3}
                     placeholder="Todo content..."
                     required
                     className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                   />
                </div>
              </div>
              <div>
                <label htmlFor="statusId" className="block text-sm font-medium leading-6 text-gray-900">
                  Status
                </label>
                <select
                  value={statusId}
                  onChange={e => setStatusId(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  {utilityService.todoStatuses.map(stat => (
                    <option key={stat.id} value={stat.id}>{stat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <button type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
