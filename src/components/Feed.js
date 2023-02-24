import React, { useContext } from "react";
import { Button, Stack, Divider } from "@mui/material";
import moment from "moment";

import { Context as FeedContext } from "../context/FeedContext";
import CallItem from "./CallItem";

const Feed = ({ list, reset = false }) => {
  const { resetAllCalls } = useContext(FeedContext);

  const handleReset = () => {
    resetAllCalls();
  };

  return (
    <>
      {reset && list.length > 0 && (
        <Button
          variant="contained"
          color="success"
          onClick={handleReset}
          sx={{ mb: 2 }}
          fullWidth
        >
          unarchive all calls
        </Button>
      )}
      {list.map((calls, index) => (
        <Stack key={index}>
          <Divider sx={{ mb: 2 }}>
            {moment(calls[0].created_at).format("YYYY MMMM DD")}
          </Divider>
          {calls.map((call) => (
            <Stack
              key={call.id}
              mb={2}
              py={1}
              px={2}
              border={"1px solid #dddddd"}
              borderRadius={1}
              sx={{ cursor: "pointer" }}
            >
              <CallItem call={call} />
            </Stack>
          ))}
        </Stack>
      ))}
    </>
  );
};

export default Feed;
