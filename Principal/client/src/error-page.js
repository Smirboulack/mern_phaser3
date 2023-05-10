import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.error(error);

    return(
        <>
        <header className="p-4 bg-slate-800 text-white flex justify-between">
            <h1 className="text-xl font-bold"><Link to="/">App</Link></h1>
            <ul className="flex gap-x-4">
            </ul>
        </header>
        
        <div className="mx-4 mt-4">
            <div className="p-4 bg-gray-100 rounded-md shadow-md">
                <h1 className="text-2xl font-bold text-red-500">Erreur!</h1>
                <p className="text-gray-600">{error.statusText || error.message }</p>
            </div>
        </div>
        </>
    )
}