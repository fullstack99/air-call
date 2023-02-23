import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

import { Context as FeedContext } from "../context/FeedContext";
import Header from "../components/Header";
import CallItem from "../components/CallItem";
import Loading from "../components/Loading";

const FeedDetails = () => {
  const { id } = useParams();
  const { getCallById, updateCall, state } = useContext(FeedContext);

  useEffect(() => {
    getCallById(id);
  }, [id]);

  const handleArchive = () => {
    updateCall({
      id,
      body: {
        is_archived: true,
      },
    });
  };

  return (
    <div className="container">
      <Header />
      {state.loading && <Loading />}
      {state.call && (
        <Stack px={2}>
          <CallItem call={state.call} />
          <Stack
            mt={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Typography>From: {state.call.from}</Typography>
            <Typography>To: {state.call.to}</Typography>
          </Stack>
          <Stack
            mt={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Typography>Direction: {state.call.direction}</Typography>
            <Typography>Duration: {state.call.duration}</Typography>
          </Stack>
          <Stack
            mt={2}
            display="flex"
            flexDirection={"row"}
            justifyContent="space-between"
          >
            <Typography>Via: {state.call.via}</Typography>
          </Stack>
          {!state.call.is_archived && (
            <Button
              variant="contained"
              color="success"
              onClick={handleArchive}
              sx={{ mt: 4 }}
            >
              Archive Call
            </Button>
          )}
        </Stack>
      )}
    </div>
  );
};

export default FeedDetails;
