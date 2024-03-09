import { useEffect, useState } from "react"
import "./style.scss"
import { Joystick } from 'react-joystick-component';
import { request } from "Core/Base/request";
import { GraphqlHelper } from "src/Core/Base/graphql";
import { SUBSCRIPTION_DATA ,SUBSCRIPTION_PROPERTYS_BY_OBJECT,SUBSCRIPTION_PROPERTY_BY_OBJECT} from "../graphql/subscription";
import { Icon } from "Gui/component/Icon";
class Motor{
	pos:number = 0
	rpm:number = 0
	ms:number = 0
	constructor(pos:number = 0,rpm:number = 0,ms:number = 0){
		this.pos = pos
		this.rpm = rpm
		this.ms = ms
	}
	static parse(obj:any){
		return new Motor(obj.pos,obj.rpm,obj.ms)
	}
}
class Position{
	left:Motor 
	right:Motor
	constructor(left:Motor = new Motor(),right:Motor = new Motor()){
		this.left = left
		this.right = right
	}
	static parse(obj:any){
		return new Position(obj.left,obj.right)
	}
}
class Gps{
	latitude:number = 0
	longitude:number=0
	constructor(latitude:number = 0,longitude:number=0){
		this.latitude = latitude
		this.longitude = longitude
	}
	static parse(obj:any){
		return new Gps(obj.lat,obj.log)
	}
}
const graphql = new GraphqlHelper()
const TestPage = (props: any) => {
	const {onChangeGps} = props
	const [left, setLeft] = useState(0)
	const [right, setRight] = useState(0)
	const [timeOfRes, setTimeOfRes] = useState(0)
	const [messages, setMessages] = useState<string[]>([])
	const [message, setMessage] = useState(String())
	const [urlImage, setUrlImage] = useState(String())

	const [position, setPosition] = useState(new Position())
	const [gps, setGps] = useState(new Gps())
	const max_speed = 100
	const min_speed = -100
	const handle_value = (event: any) => {
		const x = event.x
		const y = event.y
		let left = value_at_percentage(y, 0, 1, 0, max_speed)
		let right = value_at_percentage(y, 0, 1, 0, max_speed)
		let vector = value_at_percentage(x, 0, 1, 0, max_speed)
		if (x > 0) {
			left = left - vector
			if (left < 0) {
				left = 0
			}
		} else {
			right = right - vector
			if (right < 0) {
				right = 0
			}
		}
		if (y < 0) {
			left = -left
			right = -right
		}
		left = parseInt(left.toString())
		right = parseInt(right.toString())
		// console.log(left, right)
		setLeft(left)
		setRight(right)
		setPrm(left, right)
	}
	const reset = () => {
		setLeft(0)
		setRight(0)
		setTimeOfRes(0)
	}
	const setPrm = async (left: number, right: number) => {
		if (left == 0 && right == 0) {
			reset()
		}
		return await request.get('/command/', { params: { cmd: `Core.testdemo.Car.SetRpm(${left},${right})` } }).then((res: any) => {
			console.log(res.data, "test", res.duration)
			setTimeOfRes(res.duration)
		}).catch(error => {
			console.error(error)
		})
	}
	const value_at_percentage = (percentage: number, min: number, max: number, minimum: number, maximum: number) => {
		if (percentage == 0)
			return 0
		let negative = false
		if (percentage < 0)
			negative = true
		percentage = Math.abs(percentage)
		if (minimum > maximum)
			return 0
		if (!(min <= percentage && percentage <= max))
			return 0

		let range_size = maximum - minimum
		let offset = (percentage / max) * range_size
		let result = minimum + offset
		// if (negative)
		// 	return -result
		return result
	}
	const func_property:any = {
		"Position":(val:any)=>{
			const position = Position.parse(val)
			setPosition(position)
			// onChangePosition(position)
		},
		"Gps":(val:any)=>{
			const gps = Gps.parse(val)
			setGps(gps)
			onChangeGps(gps)
		}
	}
	useEffect(() => {
    // graphql.subscription(SUBSCRIPTION_PROPERTY_BY_OBJECT,{  
		// 	"namedoc": "testdemo",
		// 	"nameobject": "CameraBase",     
		// 	"nameproperty": "Image",
		// 	"time": 0.05
		// },(data)=>{setUrlImage(data.propertyByObjectRealtime)})
		graphql.subscription(SUBSCRIPTION_PROPERTYS_BY_OBJECT,{  
			"namedoc": "testdemo",
			"nameobject": "Car", 
			"time": 0.5,
			"namepropertys": ["Position","Gps"]
		},(data)=>{
      const result = data?.propertysByObjectRealtime
				if(result){
					for (let index = 0; index < result.length; index++) {
						const property = result[index];
						const func = func_property[property.name]
						if(func){
							func(property.value)
						}
					}
				}
    })
  }, []);
	
	const onSendMessage = (e:any) =>{
		e.preventDefault();
		request.get('/command/', { params: { cmd: `Core.testdemo.Car.send('${message}',True)` } }).then((res: any) => {
			var result = res.data?.result
			if(result){
				// result = JSON.parse(result)
				setMessages(msg => [...msg, result])
			}
			
			console.log(res.data,  res.duration)
			// setTimeOfRes(res.duration)
			setMessage(String())
		}).catch(error => {
			console.error(error)
		})
	}
	// const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/camera/');
	// const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
	// const connectionStatus = {
	// 	[ReadyState.CONNECTING]: 'Connecting',
	// 	[ReadyState.OPEN]: 'Open',
	// 	[ReadyState.CLOSING]: 'Closing',
	// 	[ReadyState.CLOSED]: 'Closed',
	// 	[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	// }[readyState];
	return (
		<>
			<div className="test">
				{/* <div className="">
				<p className="">
					Left: <strong>{left}</strong>
					Right: <strong>{right}</strong>
					TimeOfRes: <strong>{timeOfRes}</strong>
				</p>
			</div>
			<span>The WebSocket is currently {connectionStatus} {readyState}</span> */}
				{/* {readyState == 1 && <img src={`data:image/jpeg;base64,${lastMessage?.data}`} />} */}
				{/* <div className="camera">
					{urlImage && <img src={`data:image/jpeg;base64,${urlImage}`} />}
				</div> */}
				<div className="tools">
					<div className="top info">
						<div className="left">
							<p>Control: <strong></strong></p>
							<div className="">
								<p>Left rpm: <strong>{left}</strong></p>
								<p>Right rpm: <strong>{right}</strong></p>
								<p>TimeOfRes: <strong>{timeOfRes}</strong></p>
								{/* <p>Status camera: <strong>{connectionStatus}</strong></p> */}
							</div>
						</div>
						<div className="right">
							<p>Current: <strong></strong></p>
							<div className="">
								<p>RPM:</p>
								<p> - Left: <strong>{position.left.rpm}</strong></p>
								<p> - Right: <strong>{position.right.rpm}</strong></p>
								<p>Postion:</p>
								<p> - left:<strong>{position.left.pos}</strong></p>
								<p> - right:<strong>{position.right.pos}</strong></p>
								<p>Gps:</p>
								<p> - lat:<strong>{gps.latitude}</strong></p>
								<p> - log:<strong>{gps.longitude}</strong></p>
							</div>
						</div>
					</div>

					<div className="bottom">
						<div className="control">
						<Joystick throttle={100} stickSize={50} size={150} sticky={false} baseColor="red" stickColor="#eee" move={handle_value} stop={e => setPrm(0, 0)}></Joystick>
						</div>
						<div className="message">
							<div className="list">
								{
									messages.map((msg,index)=>{
										return (<p key={index}>{msg}</p>)
									})
								}
							</div>
							<form className="text-box" onSubmit={onSendMessage}>
								<input onChange={e=>{setMessage(e.target.value)}} value={message} placeholder="message..."></input>
								{/* <button><Icon iconName="Send"></Icon></button> */}
								<button><Icon iconName="Send"></Icon></button>
							</form>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
export default TestPage