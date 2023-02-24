import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { makeStyles } from "@mui/styles";

import LogoSvg from "../../assets/images/Logo.svg";

const useStyles = makeStyles({
  logo: {
    height: "40px",
  },
});

const Header = ({ goBack = true }) => {
  const navigate = useNavigate();

  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      position="relative"
      p={1}
      borderBottom={"1px solid #dddddd"}
    >
      {goBack && (
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
