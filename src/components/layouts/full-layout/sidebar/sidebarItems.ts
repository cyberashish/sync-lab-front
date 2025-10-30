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
                title:"Leave Status",
                icon:"solar:checklist-minimalistic-broken",
                url:"/request-status"
            },
            {
                id: uuidv4(),
                title:"Overtime Status",
                icon:"fluent-mdl2:sync-status",
                url:"/overtime-status"
            },
            {
                id: uuidv4(),
                title:"Add Holiday",
                icon:"fluent-mdl2:vacation",
                url:"/add-holiday"
            },
            {
                id: uuidv4(),
                title:"Holiday List",
                icon:"material-symbols-light:holiday-village-outline-rounded",
                url:"/admin/holiday-list"
            },
        ]
    }
]
const employeeSidebarItems:sidebarItem[] = [
    {
        id: uuidv4(),
        block:"General",
        children:[
            {
                id: uuidv4(),
                title:"Overview",
                icon:"solar:qr-code-linear",
                url:"/employee-dashboard"
            },
            {
                id: uuidv4(),
                title:"Request Leave",
                icon:"pajamas:leave",
                url:"/request-leave"
            },
            {
                id: uuidv4(),
                title:"Request Overtime",
                icon:"lsicon:overtime-outline",
                url:"/request-overtime"
            },
            {
                id: uuidv4(),
                title:"My Profile",
                icon:"solar:user-circle-outline",
                url:"/my-profile"
            },
            {
                id: uuidv4(),
                title:"Holiday List",
                icon:"fluent-mdl2:vacation",
                url:"/holiday-list"
            },

        ]
    },
    {
        id: uuidv4(),
        block:"Support",
        children:[
            {
                id: uuidv4(),
                title:"Leave Status",
                icon:"solar:checklist-minimalistic-broken",
                url:"/request-status/employee"
            },
            {
                id: uuidv4(),
                title:"Overtime Status",
                icon:"fluent-mdl2:sync-status",
                url:"/request-overtime-status/employee"
            },
            {
                id: uuidv4(),
                title:"Leave History",
                icon:"lucide:history",
                url:"/leave-history"
            },
        ]
    }
]


export {sidebarItems , employeeSidebarItems}