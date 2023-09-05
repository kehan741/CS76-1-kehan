import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Snackbar,
  Container,
  Grid,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabletIcon from "@mui/icons-material/Tablet";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import ComputerIcon from "@mui/icons-material/Computer";

// 核心思路，将表单中获取的值赋值给newEquipment对象，每添加一次都会把新对象放进Equipment对象数组里，每添加一次就把数组里的对象输出一遍
//目前只是前端网页手动输入值存放在网页上，页面刷新后数组会恢复到初始值，到时候还是需要从数据库里取到值才行，也就是我们需要先把 new equipment的值拿到后传给数据库
//然后再从数据库中返回这个值给我们，因为数据库的值是不会因为网页刷新而消失的，大概...

function RegisterDialog() {
  //弹窗提示
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  //Dialog弹窗+下拉框
  const [open, setOpen] = React.useState(false);
  const [mainMenuItem, setMainMenuItem] = useState("");
  const [subMenuItem, setSubMenuItem] = useState("");
  const [name, setName] = useState("");
  //equip数组存放所有的设备对象
  const [equips, setEquips] = useState([
    { name: "black", type: "iPhone", detailtype: "iPhone 14" },
  ]);
  //newequip数组存放当前添加到设备对象
  const [newEquip, setNewEquip] = useState({
    name: "myphone",
    type: "iPhone",
    detailtype: "iPhone X",
  });

  useEffect(() => {
    // 这里可以执行在 newEquip 变化后需要做的操作,条件判断输入值是否为空+将新设备添加到设备数组里
    if (
      newEquip.name !== "" &&
      newEquip.type !== "" &&
      newEquip.detailtype !== ""
    ) {
      setEquips([...equips, newEquip]);
    } else {
      setMessage("Please enter the information!");
      setOpenSnackbar(true);
    }
  }, [newEquip]);

  //Dialog弹窗开启与关闭事件
  const handleOpen = () => {
    setOpen(true);
  };

  //Dialog弹窗关闭时将表单的值赋给equip对象
  const handleClose = () => {
    setNewEquip({
      name: name,
      type: mainMenuItem,
      detailtype: subMenuItem,
    });
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  //从input表单获取name,type,typedetail信息
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleMainMenuItemChange = (event) => {
    setMainMenuItem(event.target.value);
    setSubMenuItem(""); // Reset the sub menu selection when changing the main menu.
  };
  const handleSubMenuItemChange = (event) => {
    setSubMenuItem(event.target.value);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const types = ["iPhone", "iPad", "Desktop", "Airpods"]; //一级菜单，设备的大分类（可以考虑拓展其他设备）

  //二级菜单
  const iPhone = [
    "iPhone 14",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 13 Pro",
    "iPhone 13 Mini",
    "iPhone 13 Pro MAX",
    "iPhone SE",
    "iPhone 8 PLUS",
    "iPhone X",
  ];
  const iPad = [
    "iPad Air",
    "iPad Air 2",
    "iPad Air 3",
    "iPad Air 4",
    "iPad mini",
    "iPad Pro",
  ];
  const Desktop = ["Macbook Air", "Macbook Pro 14", "Macbook Pro 16"];
  const Airpods = ["Airpods", "Airpods 2", "Airpods Pro", "Airpods Max"];
  return (
    <>
      {/* Box 里面是标题和Add按钮 */}
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 5, ml: 3 }}
          style={{ fontWeight: "700" }}
        >
          My Equipment
        </Typography>
        <Button
          sx={{
            bgcolor: "#214392",
            color: "#FFD600",
          }}
          onClick={handleOpen}
        >
          Add
        </Button>
      </Box>

      {/* Dialog弹窗组件，用来显示添加设备的页面 */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* 标题 */}
        <DialogTitle id="alert-dialog-title">
          {"Register your equipment information"}
        </DialogTitle>

        {/* 内容 */}
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 4 }}>
            {/* input表单，接收name */}
            <TextField
              id="outlined-basic"
              label="name"
              variant="outlined"
              value={name}
              onChange={handleName}
            />

            {/* 下拉菜单+二级菜单组件，用来接收type和detailtype，通过select绑定onchange事件实现 */}
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                value={mainMenuItem}
                onChange={handleMainMenuItemChange}
                variant="outlined"
                style={{ minWidth: 150 }}
              >
                <MenuItem value="">
                  <em>Choose the type</em>
                </MenuItem>

                {/* 一级菜单下拉选项 map函数映射，看不太懂就去顶部找const types变量 */}
                {types.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>

              {/* 二级菜单/iPhone */}
              {mainMenuItem === "iPhone" && (
                <Select
                  value={subMenuItem}
                  onChange={handleSubMenuItemChange}
                  variant="outlined"
                  style={{ minWidth: 150 }}
                >
                  <MenuItem value="">
                    <em>Choose iPhone type</em>
                  </MenuItem>

                  {/* 二级菜单/iphone选项 看不太懂就去顶部找const iPhone变量*/}
                  {iPhone.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {/* 同上 */}
              {mainMenuItem === "iPad" && (
                <Select
                  value={subMenuItem}
                  onChange={handleSubMenuItemChange}
                  variant="outlined"
                  style={{ minWidth: 150 }}
                >
                  <MenuItem value="">
                    <em>Choose iPad type</em>
                  </MenuItem>
                  {iPad.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {mainMenuItem === "Desktop" && (
                <Select
                  value={subMenuItem}
                  onChange={handleSubMenuItemChange}
                  variant="outlined"
                  style={{ minWidth: 150 }}
                >
                  <MenuItem value="">
                    <em>Choose Desktop type</em>
                  </MenuItem>
                  {Desktop.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}

              {/* 同上 */}
              {mainMenuItem === "Airpods" && (
                <Select
                  value={subMenuItem}
                  onChange={handleSubMenuItemChange}
                  variant="outlined"
                  style={{ minWidth: 150 }}
                >
                  <MenuItem value="">
                    <em>Choose Airpods type</em>
                  </MenuItem>
                  {Airpods.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>

            {/* location控件，暂时还没想好 */}
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
            />
          </Stack>
        </DialogContent>

        {/* 弹窗的返回与关闭，点击关闭按钮实现参数传递 */}
        <DialogActions>
          <Button onClick={handleClose1}>Back</Button>
          <Button onClick={handleClose} autoFocus>
            Register
          </Button>
        </DialogActions>
      </Dialog>

      {/* 顶部条件判断弹窗，可忽略 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={message}
        sx={{
          //position: 'fixed',
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        anchorOrigin={{ vertical, horizontal }}
      />

      {/* map函数映射，将equip数组里的对象每个都以List形式展示在页面上 */}
      <Grid container spacing={4}>
        {equips.map((equip, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {equip.type === "iPhone" && <PhoneAndroidIcon />}
                    {equip.type === "iPad" && <TabletIcon />}
                    {equip.type === "Desktop" && <ComputerIcon />}
                    {equip.type === "Airpods" && <HeadphonesIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={equip.name}
                  secondary={equip.detailtype}
                />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
export default RegisterDialog;
