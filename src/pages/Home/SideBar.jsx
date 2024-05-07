import React, { useState } from "react";
import "./SideBar.css";
import { Avatar, Box, Button, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CreateTaskForm from "../Task/CreateTask/CreateTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxToolkit/AuthSlice";

const menu = [
  { name: "Home", value:"HOME", role:["ROLE_ADMIN","ROLE_CUSTOMER"] },
  { name: "DONE", value:"DONE", role:["ROLE_ADMIN","ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value:"ASSIGNED", role:["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value:"PENDING", role:["ROLE_ADMIN"]},
  { name: "Create New Task", value:"", role:["ROLE_ADMIN"] },
  { name: "Notification", value:"NOTIFICATION", role:["ROLE_CUSTOMER"] },
];
const isAdmin = true;
const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const dispatch=useDispatch();
  const {auth}=useSelector(store=>store)
  const navigate = useNavigate();
  const location = useLocation();
  const [openCreateTaskModel, setOpenCreateTaskModel] = useState(false);
  const handleOpenCreateTaskModel = () => setOpenCreateTaskModel(true);
  const handleCloseCreateTaskModel = () => setOpenCreateTaskModel(false);

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);

    if(item.name==="Create New Task"){
      handleOpenCreateTaskModel()
    }
  
    else if (item.name === "Home") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatedPath = queryString
        ? `${location.pathname}?${queryString}`
        : location.pathname;

      navigate(updatedPath);
    } else {
      const updatedParams = new URLSearchParams(location.search);
      updatedParams.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParams.toString()}`);
    }

    setActiveMenu(item.name);
  };
  const handleLogout = () => {
    dispatch(logout())
    console.log("handle logout");
  };
  return (
    <div className="min-h-[85vh] flex flex-col justify-center card fixed w-[20vw]">
      <div className="space-y-5  h-full">
        <div className="flex justify-center">
          <Avatar
            sx={{ width: "8rem", height: "8rem" }}
            className="border-2 border-[#c24dd0]"
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        {menu
          .filter(
            (item) => item.role.includes(auth.user?.role)
          )
          .map((item) => (
            <p
              onClick={() => handleMenuChange(item)}
              className={`py-3 px-5 rounded-full text-center cursor-pointer ${
                activeMenu === item.name ? "activeMenuItem" : "menuItem"
              }`}
            >
              {item.name}
            </p>
          ))}
        <Button
          variant="outlined"
          className="logoutButton"
          fullWidth
          sx={{ padding: ".7rem", borderRadius: "2rem", color: "white" }}
          onClick={handleLogout}
        >
          {"Logout"}
        </Button>
      </div>

      <CreateTaskForm
        open={openCreateTaskModel}
        handleClose={handleCloseCreateTaskModel}
      />
    </div>
  );
};

export default SideBar;
