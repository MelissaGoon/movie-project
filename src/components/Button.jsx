/**
 * Generic button component, mobile responsive
 * Styles in base.css, default colour is red with cream text
 * Classes prop values:
 * border-cream: adds a cream border, does not change rest of styling
 * border-red: adds a cream border, does not change rest of styling
 * body-cream: changes body to cream and text to white, changes other states
 * small: changes the button to a small button
*/

const Button = ({ classes, className, text, icon, onClick }) => {

    if (icon) {
        return (
            <button className={`btn ${classes ? classes : ''} ${className ? className : ''}`} onClick={onClick}>
                <img src={icon} alt="" />
                <span> {text}</span> </button>
        )
    } else {
        return (<button className={`btn ${classes ? classes : ''} ${className ? className : ''}`} onClick={onClick}>
            <span> {text}</span> </button>)
    }
}

export default Button