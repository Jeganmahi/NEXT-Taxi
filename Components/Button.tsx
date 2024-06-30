
import Link from "next/link"
import { DeleteCar,DeleteRoute } from "../api/request/route";
import { DeleteLocalData,DeleteDriverData } from "../api/request/route";
export default function UpdateData({ id }: { id: Number }) {
    return (
        <Link href={`/api/${id}/edit`}>
            <button className="btn btn-success">Edit</button>
        </Link>
    )
}

export async function DeleteData({ id }: { id: Number }) {

    const DeleteCarID = DeleteCar.bind(null, id);
    return (
        <form action={DeleteCarID}>

            <button className="btn btn-error">Delete</button>
        </form>
    );
}

export async function DeleteRouteData({ id }: { id: Number }) {

    const DeleteRouteID = DeleteRoute.bind(null, id);
    return (
        <form action={DeleteRouteID}>

            <button className="btn btn-error">Delete</button>
        </form>
    );
}
export async function DeleteLocalRoute({ id }: { id: Number }) {

    const DeleteLocal = DeleteLocalData.bind(null, id);
    return (
        <form action={DeleteLocal}>

            <button className="btn btn-error">Delete</button>
        </form>
    );
}
export async function DeleteDriver({ id }: { id: Number }) {

    const DeleteDriverID = DeleteDriverData.bind(null, id);
    return (
        <form action={DeleteDriverID}>

            <button className="btn btn-error">Delete</button>
        </form>
    );
}