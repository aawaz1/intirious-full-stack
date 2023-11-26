import  {Link ,useParams} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../message/Message';
import Loader from '../components/Loader/Loader';
import { useDeliverOrderMutation,useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const {id : orderId} = useParams();
    const [deliverOrder , {isLoading : loadingDeliver} ] = useDeliverOrderMutation();
    const {data : order,refetch, isLoading,error} = useGetOrderDetailsQuery(orderId);
    console.log(order);
    const { userInfo } = useSelector((state) => state.auth);

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered');
            
        } catch (error) {
            toast.error(error?.data?.message || error.message)
            
        }


    }
   
   
    return isLoading ? <Loader/> : error ? <Message variant='danger' /> : (
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                        <h2>shipping</h2>
                        <p>
                            <strong>
                                Name : 
                            </strong> {
                                order.user.name
                            }
                        </p>
                        <p>
                            <strong>
                                Email : 
                            </strong> {
                                order.user.email
                            }
                        </p>
                        <p>
                            <strong>
                            Address : 
                            </strong> {
                                order.shippingAddress.address
                            }, {
                                order.shippingAddress.city
                            }{''},{
                                order.shippingAddress.postalCode
                            },{
                                order.shippingAddress.country
                            } 
                        </p>
                        {order.isDelivered ? (
                            <Message varaint='success'>Delivered at {order.deliveredAt} </Message>
                        ) : (<Message variant='danger'> Not Delivered</Message>)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>
                                Method  : 
                            </strong> {
                                order.paymentMethod
                            }
                            {order.isPaid ? (
                            <Message varaint='success'>Paid on {order.paiddAt} </Message>
                        ) : (<Message variant='danger'> Not Paid</Message>)}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.map((item,index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}
                                    ><Image src={item.image} alt={item.name}
                                    fluid 
                                    rounded/></Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>


                            </ListGroup.Item>

                           
                        ))}
                    </ListGroup.Item>

                </ListGroup>
            </Col>
            <Col md={4}><Card>
                <ListGroup>
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                    </Row>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order?.shippingPrice}</Col>
                    </Row>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                    </Row>
                    <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>
                {/* PAY ORDER PALCEHOLDER */}

                {
                    loadingDeliver && <Loader/>
                }
                {
                    userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type='button' className='btn btn-block'
                            onClick={deliverOrderHandler}>
                                Mark as Delivered

                            </Button>
                        </ListGroup.Item>
                    )
                }
                 
                 
                </ListGroup>
                </Card></Col>
        </Row>
        </>
    ) 

}

export default OrderScreen;