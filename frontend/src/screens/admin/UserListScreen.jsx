import { LinkContainer } from "react-router-bootstrap";
import { Table, Button,Row , Col } from "react-bootstrap";
import { FaCheck, FaEdit,FaTimes, FaTrash } from "react-icons/fa";
import Message from "../../message/Message";
import Loader from "../../components/Loader/Loader";
import {toast} from 'react-toastify';
import { useCreateUserMutation,useGetUsersQuery , useDeleteUsersMutation } from "../../slices/usersApiSlice";

const UserListScreen = () => {
    const {data : users , refetch ,isLoading, error } = useGetUsersQuery();
    const [deleteUser , {isLoading : loadingDeleting}] = useDeleteUsersMutation();
    const [createUser , {isLoading : loadingCreate } ] = useCreateUserMutation()

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

    const createProductHandler = async() => {
      if(window.confirm("Are you Sure ? you want to create a new user")){
        try {
          const res = await createUser();
          if(res.data?.error){
            toast.error(res.data?.error);
          }else
            toast.success("User Created Sucessfully")
          refetch();
          
        } catch (err) {
          console.log(err)
          toast.error(err?.data?.message || err?.message);
        }
      }

    }
    
  return (  
   <>
    <h1>Users</h1>
    <Row className="align-items-center">
   <Col className="text-end">
    <Button className="btn-sm m-3"
    onClick={createProductHandler}>
      <FaEdit/> Create Users

    </Button>
   </Col>

  </Row>
  {loadingCreate && <Loader/>}
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

