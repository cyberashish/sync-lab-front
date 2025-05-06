import {v4 as uuidv4} from "uuid";

interface childItem {
    id: string,
    title: string ,
    icon: string,
    url: string
}

export interface sidebarItem {
    id: string,
    block: string,
    children: childItem[]
}

const sidebarItems:sidebarItem[] = [
    {
        id: uuidv4(),
        block:"General",
        children:[
            {
                id: uuidv4(),
                title:"Overview",
                icon:"solar:qr-code-linear",
                url:"/dashboard"
            },
            {
                id: uuidv4(),
                title:"Add Employee",
                icon:"solar:user-plus-rounded-broken",
                url:"/add-employee"
            },
            {
                id: uuidv4(),
                title:"All Employees",
                icon:"solar:users-group-two-rounded-broken",
                url:"/all-employees"
            },
            {
                id: uuidv4(),
                title:"Create Post",
                icon:"solar:clapperboard-edit-broken",
                url:"/create-post"
            },

            {
                id: uuidv4(),
                title:"My Profile",
                icon:"solar:user-circle-outline",
                url:"/my-profile"
            },
        ]
    },
    {
        id: uuidv4(),
        block:"Support",
        children:[
            {
                id: uuidv4(),
                title:"Status",
                icon:"solar:checklist-minimalistic-broken",
                url:"/request-status"
            },
            {
                id: uuidv4(),
                title:"Settings",
                icon:"solar:settings-linear",
                url:"/settings"
            },
        ]
    }
]

export {sidebarItems}