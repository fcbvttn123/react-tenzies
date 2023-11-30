import { Dot } from "./Dot"

export function Die(props) {
    let styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }
    return (
        <div className="die-face" style={styles} onClick={() => props.holdDice(props.id)}>
            {/* <h2 className="die-num">{props.value}</h2> */}
            <Dot />
            <Dot />
        </div>
    )
}