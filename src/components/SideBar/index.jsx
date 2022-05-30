import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import clsx from 'clsx';

const SideBar = () => {

    const listItem = [
        {
            pathname: "/dashboard",
            title: "Dashboard",
            icon:"tachometer-alt"
        },
        {
            pathname: "/analytics",
            title: "Analytics",
            icon:"chart-line"
        }
    ]
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#929292" backgroundColor="#ffffff">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: 'black' }}>
                        Tugo
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content text-[#ededed]" >
                    <CDBSidebarMenu>
                        {listItem.map(item => {
                            return (
                                <ItemSideBar props={{ ...item }} />
                            )
                        })}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center', color: 'black' }}>
                    <div
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        tugo.com
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    )
}

export default SideBar;

const ItemSideBar = ({ props }) => {
    const classes = useStyles();
    const { pathname, title,icon } = props;

    return (
        <NavLink exact to={pathname} activeClassName="activeClicked">
            <CDBSidebarMenuItem
                icon={icon}
                className={clsx(classes.item, {
                    [classes.active]: pathname === window.location.pathname
                })}
            >{title}</CDBSidebarMenuItem>
        </NavLink>
    )
}
const useStyles = makeStyles((theme) => ({
    item: {
        color: "#929292",
        margin: "0",
        fontSize: "17px",
        "&:hover": {
            color: "#63b4f4",
        }
    },
    active: {
        color: "#63b4f4",
        backgroundColor: "#cde7fe",
        fontWeight:'500'
    }
}));