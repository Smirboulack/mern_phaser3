import colorNames from 'colornames'

const Input = ({
    colorValue, setColorValue, setHexValue, isDarkText, setIsDarkText
}) => {
    return (
        <form id="Formulaire_boite" onSubmit={(e) => e.preventDefault()}>
            <label>Add Color Name:</label>
            <input
                id="input_boite"
                autoFocus
                type="text"
                placeholder="Add color name"
                required
                value={colorValue}
                onChange={(e) => {
                    setColorValue(e.target.value);
                    setHexValue(colorNames(e.target.value));
                }}
            />
            <button
                id="button_boite"
                type="button"
                onClick={() => setIsDarkText(!isDarkText)}
            >
                Toggle Text Color
            </button>
        </form>
    )
}

export default Input