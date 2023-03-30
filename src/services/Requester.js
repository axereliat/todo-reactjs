const APP_URL = 'http://localhost:8080'

const apiHeaders = new Headers()
apiHeaders.append('Accept', 'application/json')
apiHeaders.append('Content-Type', 'application/json')

const login = async (username, password) => {
  try {
    const response = await fetch(APP_URL + '/login', {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify({username, password})
    })

    if (!response.ok) {
      throw new Error('Error logging-in')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

const register = async (name, username, password) => {
  try {
    const response = await fetch(APP_URL + '/register', {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify({name, username, password})
    })

    if (!response.ok) {
      throw new Error('Error registering')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

const getTodos = async userId => {
  try {
    const response = await fetch(APP_URL + '/todos?userId=' + userId, {
      method: 'GET',
      headers: apiHeaders,
    })

    if (!response.ok) {
      throw new Error('Error getting todos')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

const storeTodo = async (content, status, userId) => {
  try {
    const response = await fetch(APP_URL + '/todos', {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify({content, status, userId})
    })

    if (!response.ok) {
      throw new Error('Error storing todo')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

const deleteTodo = async todoId => {
  try {
    const response = await fetch(APP_URL + '/todos/' + todoId + '/delete', {
      method: 'POST',
      headers: apiHeaders,
    })

    if (!response.ok) {
      throw new Error('Error deleting todo')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

const updateTodoStatus = async (todoId, statusId) => {
  try {
    const response = await fetch(APP_URL + '/todos/' + todoId + '/status', {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify({todoId, statusId})
    })

    if (!response.ok) {
      throw new Error('Error updating todo status')
    }

    return response.json()
  } catch (err) {
    throw err
  }
}

export default {
  login,
  register,
  getTodos,
  storeTodo,
  deleteTodo,
  updateTodoStatus
}
