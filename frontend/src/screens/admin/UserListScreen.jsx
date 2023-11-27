import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaEdit,FaTimes, FaTrash } from "react-icons/fa";
import Message from "../../message/Message";
import Loader from "../../components/Loader/Loader";
import {toast} from 'react-toastify';
import { useGetUsersQuery , useDeleteUsersMutation } from "../../slices/usersApiSlice";

const UserListScreen = () => {
    const {data : users , refetch ,isLoading, error } = useGetUsersQuery();
    const [deleteUser , {isLoading : loadingDeleting}] = useDeleteUsersMutation()

    const deleteHandler = async (id) => {
        if(window.confirm("Are You Sure")){
           try {
            await deleteUser(id);
            toast.success("User Deleted");
            refetch();
            
           } catch (err) {
            toast.error(err?.data?.message || err?.error);
            
           }
        }

    }
    
  return (  
   <>
    <h1>Users</h1>
    {isLoading ? (
      <Loader/>
    ) : error ? (<Message variant='danger'>{error}</Message>)
    : (
      <Table striped  hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            
          <th>  </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user)=> (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td> 
                <a href={`mailto: ${user.email}`}>{user.email}</a></td>
             
             <td>
             {
                user.isAdmin ? (
                    <FaCheck style={{color : 'green'}}/> ) : (<FaCheck style={{color : 'red'}}/> 
                )
              }
             </td>
             
             <td>
              <LinkContainer to={`/admin/user/${user._id}/edit`}>
              <Button variant="light" className="btn-sm">
               <FaEdit/>

              </Button>
              </LinkContainer>
              <Button variant="danger"
              className="btn-sm"
              onClick={() => deleteHandler(user._id)}>
                <FaTrash style={{color : 'white'}}/>

              </Button>

             </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) 
}



    </>
/* <>
<h1>Users</h1>
{isLoading ? (
  <Loader />
) : error ? (
  <Message variant='danger'>
    {error?.data?.message || error.error}
  </Message>
) : (
  <Table striped bordered hover responsive className='table-sm'>
    <thead>
      <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ADMIN</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </td>
          <td>
            {user.isAdmin ? (
              <FaCheck style={{ color: 'green' }} />
            ) : (
              <FaTimes style={{ color: 'red' }} />
            )}
          </td>
          <td>
            {!user.isAdmin && (
              <>
                <LinkContainer
                  to={`/admin/user/${user._id}/edit`}
                  style={{ marginRight: '10px' }}
                >
                  <Button variant='light' className='btn-sm'>
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(user._id)}
                >
                  <FaTrash style={{ color: 'white' }} />
                </Button>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)}
</> */
  )
    
  
}

export default UserListScreen

