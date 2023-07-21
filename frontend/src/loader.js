
import {TailSpin} from "react-loader-spinner";
const Loader = () => {
 
    return (
        <div id="loader" className="h-screen w-screen bg-slate-50 flex text-center m-auto z-50">
            <div className="flex justify-center m-auto w-full">
            <TailSpin
            // type="TailSpin"
            color="#1273C9"
            height={50}
            width={50}
            timeout={5000}
        /></div>
        </div>
 
    );
}
export default Loader;