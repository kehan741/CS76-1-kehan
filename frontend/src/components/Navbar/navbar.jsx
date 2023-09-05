import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui
import { Box, Hidden, List, ListItemText, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({
  data = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <GridViewRoundedIcon />,
      info: "",
    },
    {
      title: "Search",
      path: "/search",
      icon: <SearchRoundedIcon />,
      info: "",
    },
    {
      title: "Equipment register",
      path: "/equipmentregister",
      icon: <HomeRepairServiceRoundedIcon />,
      info: "",
    },
    {
      title: "Notification",
      path: "/notification",
      icon: <NotificationsNoneRoundedIcon />,
      info: "",
    },
    {
      title: "User center",
      path: "/usercenter",
      icon: <AccountCircleRoundedIcon />,
      info: "",
    },
    {
      title: "Log in",
      path: "/login",
      icon: <LoginRoundedIcon />,
      info: "",
    },
  ],
  ...other
}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/usercenter", { replace: true });
  };
  return (
    <div
      style={{
        width: 320,
        height: '100vh',
        backgroundColor: "#f9fafb",
        overflow: "hidden",
        borderRight: "3px dotted grey",

      }}
    >
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        sx={{
          height: "70px",
          width: "300px",
          bgcolor: "#EDEFF1",
          marginTop: "20px",
          marginLeft: "5px",
        }}
        style={{ fontSize: "24px", borderRadius: "10px", color: "black" }}
      >
        <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "40px" }}>
          LI
        </Avatar>
        Alice LI
      </Button>
      <Box {...other} sx={{ marginTop: 10, width: 300 }}>
        <List disablePadding sx={{ p: 1 }}>
          {data.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </List>
      </Box>
    </div>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
