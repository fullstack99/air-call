import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import { Typography, Box } from "@mui/material";
import moment from "moment";

const CallItem = ({ call }) => {
  const navigate = useNavigate();
  const icon = useMemo(() => {
    if (call.call_type === "missed") {
      return <PhoneMissedIcon />;
    } else if (call.call_type === "voicemail") {
      return <VoicemailIcon />;
    } else {
      return <PhoneIcon />;
    }
  }, [call]);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={() => navigate(`/feed/${call.id}`)}
    >
      <div>{icon}</div>
      <Typography>{moment(call.created_at).format("hh:ss a")}</Typography>
    </Box>
  );
};

export default CallItem;
