import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import requester from '../../services/Requester.js'
import utilityService from '../../services/UtilityService.js'
import { authActions } from '../../store/auth.js'
import { Link } from 'react-router-dom'

export default () => {
  const loadingMsg = useSelector(state => state.auth.loadingMsg)
  const userId = useSelector(state => state.auth.userId)
  const username = useSelector(state => state.auth.username)

  const dispatch = useDispatch()

  const [todos, setTodos] = useState([])

  useEffect(() => {

    console.log('inside todo list...')

    getTodos(userId)
  }, [])

  async function getTodos (userId) {
    const result = await requester.getTodos(userId)
    setTodos(result)
  }

  const updateTodoStatus = async (todoId, statusId) => {
    dispatch(authActions.setLoadingMessage('Updating todo status...'))

    try {
      await requester.updateTodoStatus(todoId, statusId)
      await getTodos(userId)

      dispatch(authActions.setLoadingMessage(null))

    } catch (err) {
      alert(err.message)
    }
  }

  const deleteTodo = async todoId => {
    if (confirm('Are you sure?')) {
      dispatch(authActions.setLoadingMessage('Deleting todo...'))

      try {
        await requester.deleteTodo(todoId)
        await getTodos(userId)

        dispatch(authActions.setLoadingMessage(null))

      } catch (err) {
        alert(err.message)
      }
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Todos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the {username}'s todos.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link to="/todos/create"
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Todo
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {loadingMsg ? (
              <div>{loadingMsg}</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Content
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {todos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {todo.statusId === 2 ? <strike>{todo.content}</strike> : todo.content}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <select
                        value={todo.statusId}
                        onChange={e => updateTodoStatus(todo.id, e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        {utilityService.todoStatuses.map(stat => (
                          <option key={stat.id} value={stat.id}>{stat.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button onClick={() => deleteTodo(todo.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
