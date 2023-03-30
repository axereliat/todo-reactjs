import { Routes, Route, useParams } from 'react-router-dom';

export default () => {
  let { id } = useParams();

  return (
    <div>
      Todo edit {id}...
    </div>
  )
}
