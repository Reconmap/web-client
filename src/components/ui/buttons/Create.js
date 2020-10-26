import { IconPlus } from "../../icons";
import BtnPrimary from "./BtnPrimary";
// import BtnSecondary from "./BtnSecondary";

const CreateButton = ({ onClick, children , fontSize}) => 
        <BtnPrimary onClick={onClick} fontSize={fontSize} >
            <IconPlus />
            {children || "Create"}
        </BtnPrimary>

export default CreateButton
