

type FilterBoxProps = {
    title: string,
    counter: number,
    isActive: boolean,
    onSelected: () => void,
    stylingClass?: string
}

function FilterBox({ title, counter, isActive, stylingClass, onSelected } : FilterBoxProps ) {
    return (
        <button
            onClick={() => onSelected()}
            className={`submenu-item ${stylingClass ? stylingClass + " " : ""}${isActive ? "active" : ""}`}
        >
            <div className="submenu-item__counter">
                <span className="counter">{counter}</span>
            </div>
            <div className="submenu-item__description">
                <small>{title}</small>
            </div>
        </button>
    );
}

export default FilterBox