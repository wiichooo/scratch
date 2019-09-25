import Card from "react-bootstrap/Card"

export default function Thought({ mustdo }) {
  const cardStyle = { marginTop: "15px" };
  let diff = Math.floor((new Date().getTime()-new Date(mustdo.date_inserted).getTime()) / (1000 * 3600 * 24))
  return (
    <Card border="info" text="white" style={cardStyle} className='whiteText card-color'>
      <Card.Header className='mustdo'><div>{mustdo.name + ' ('+ mustdo.country+')'}</div><img src={mustdo.flag} style={{height: '32px'}} /></Card.Header>
      <Card.Body>
        <Card.Title>{mustdo.message}</Card.Title>
        <Card.Text style={{textAlign: 'right'}}>by {mustdo.user}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted card-color-bottom ">{
        diff > 1 ? diff + ' days':
        Math.floor((new Date().getTime()-new Date(mustdo.date_inserted).getTime()) / (1000 * 3600)) + ' hours'
        } ago</Card.Footer>
    </Card>
  );
}