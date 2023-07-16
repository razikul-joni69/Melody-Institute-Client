import { BiSelectMultiple } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { NavLink } from "react-router-dom";

export const studentNavigation = (
    <ul className="pt-2 pb-4 space-y-1 text-lg">
        <li className="">
            <NavLink
                to="/dashboard/selected-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <BiSelectMultiple />
                <span>Selected Classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/enrolled-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <SiGoogleclassroom />
                <span>Enrolled Classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/payment-history"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <RiSecurePaymentLine />
                <span>Payment History</span>
            </NavLink>
        </li>
    </ul>
);

export const instructorNavigation = (
    <ul className="pt-2 pb-4 space-y-1 text-lg">
        <li className="">
            <NavLink
                to="/dashboard/all-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <BiSelectMultiple />
                <span>All Classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/add-class"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <SiGoogleclassroom />
                <span>Add Class</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/approved-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <SiGoogleclassroom />
                <span>Approved Class</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/rejected-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <SiGoogleclassroom />
                <span>Rejected Class</span>
            </NavLink>
        </li>
    </ul>
);

export const adminNavigation = (
    <ul className="pt-2 pb-4 space-y-1 text-lg">
        <li className="text-gray-900 bg-gray-100">
            <NavLink
                to="/dashboard/manage-classes"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <BiSelectMultiple />
                <span>Manage Classes</span>
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/dashboard/manage-users"
                className="flex items-center p-2 space-x-3 rounded-md btn-ghost"
            >
                <SiGoogleclassroom />
                <span>Manage Users</span>
            </NavLink>
        </li>
    </ul>
);
