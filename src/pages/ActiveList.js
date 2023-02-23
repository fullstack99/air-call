import React from "react";
import { Stack, Divider } from "@mui/material";

import CallItem from "../components/CallItem";
import moment from "moment";

const ActiveList = ({ list }) => {
  return (
    <>
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

export default ActiveList;
