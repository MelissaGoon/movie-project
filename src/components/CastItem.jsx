
const CastItem = ({ name, role, imageURL }) => {
    return (
        <div>
            <img src={imageURL} alt={`Image of ${name}`} />
            <p>{name}</p>
            <p><span className="screen-reader-text">Role:</span>{role}</p>
        </div>
    )
}

export default CastItem