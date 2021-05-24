import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Icon({name} : {name: IconProp}) {
    return (
        <i>
        <FontAwesomeIcon icon={name} />
        </i>
    )
}

export default Icon;