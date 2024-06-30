import { Square2StackIcon } from "@heroicons/react/16/solid";
import { PlusCircleIcon,UserIcon, ArrowDownLeftIcon, ArrowDownRightIcon } from "@heroicons/react/24/solid";

const routesArray = [
    {
        text: "Dashboard",
        path: "/owner",
        icon : Square2StackIcon
    },
    {
        text: "Add Car",
        path: "/owner/AddCar",
        icon : PlusCircleIcon
    },
    {
        text: "Driver",
        path: "/owner/Driver",
        icon : UserIcon
    }, {
        text: "Long Routes",
        path: "/owner/routes",
        icon: ArrowDownLeftIcon
    }, {
        text: "local routes",
        path: "/owner/local",
        icon : ArrowDownRightIcon
    }
]

export default routesArray;