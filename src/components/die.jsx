export function Die(props) {
    let dieBoxClassName = `die-face ${props.isGreen ? "active" : ""}`
    return (
        <div className={dieBoxClassName} onClick={() => props.dieClicked(props.dieId)}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}