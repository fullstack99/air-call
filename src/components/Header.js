import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoSvg from "../assets/images/Logo.svg";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  logo: {
    height: "40px",
  },
});

const Header = ({ visible = true }) => {
  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      position="relative"
      p={1}
      mb={1}
      borderBottom={"1px solid #dddddd"}
    >
      {visible && (
        <IconButton
          sx={{ position: "absolute", left: 0 }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
      )}
      <img src={LogoSvg} alt="Logo Svg" className={classes.logo} />
    </Box>
  );
};

export default Header;
