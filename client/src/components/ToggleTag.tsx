import react, { useState } from 'react';
import CheckableTag from "antd/lib/tag/CheckableTag";

type ToggleTagProps = {
    todoID: string,
    name: string,
    checked: boolean

}


function ToggleTag({ todoID, name, checked }: ToggleTagProps) {
    const [isSelected, setIsSelected] = useState(checked);
    return (<CheckableTag onChange={() => { setIsSelected(!isSelected) }} checked={isSelected} > { name}</CheckableTag >)
}

export default ToggleTag;