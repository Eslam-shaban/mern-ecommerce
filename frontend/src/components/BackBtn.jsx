import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
    const navigate = useNavigate();
    return (
        <div className="absolute left-2 top-1 w-11 h-11 bg-gray-800 rounded-full border-2 border-gray-300 flex justify-center items-center cursor-pointer hover:scale-105">
            <ArrowLeft className="text-gray-100"
                onClick={() => {

                    navigate(-1)
                }} />
        </div>
    );
}

export default BackBtn;
