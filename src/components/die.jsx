import { Dot } from "./Dot"

export function Die(props) {
    let extraStyles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff",
        gridTemplateColumns: props.value == 1 ? "1fr" : "1fr 1fr" 
    }

    let dots = []
    for(let i = 0; i < props.value; i++) {
        dots.push(<Dot  key={i}/>)
    }

    return (
        <div className="die-face" style={extraStyles} onClick={() => props.holdDice(props.id)}>
            {dots}
        </div>
    )
}