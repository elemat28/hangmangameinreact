import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControlLabel } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { Home } from "../../../pages/Home";
export default function Header({ title, themeSelector }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  const drawerWidth = 240;

  function ListItemLink(icon, primary, to) {
    return (
      <ListItemButton component={Link} to={to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <ThemeSelector themeToggleCallback={themeSelector} />
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={"left"} open={open} onClose={handleDrawerClose}>
        <Box
          sx={{ width: drawerWidth }}
          role="presentation"
          //onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List onClick={handleDrawerClose}>
            {ListItemLink(<HomeIcon />, "Home", "/")}
          </List>
          <Divider />
          <List
            onClick={handleDrawerClose}
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Games
              </ListSubheader>
            }
          >
            {ListItemLink(<VideogameAssetIcon />, "Hangman", "/games/hangman")}
          </List>
          <Divider onClick={() => setExpanded(!expanded)} />
          <List>{expanded ? <ExpandLess /> : <ExpandMore />}</List>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </List>
          </Collapse>
        </Box>
      </Drawer>
    </>
  );
}
