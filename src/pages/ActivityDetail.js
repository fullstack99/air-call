import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Stack, Typography } from "@mui/material";

import { Context as FeedContext } from "../context/FeedContext";
import CallItem from "../components/CallItem";
import Loading from "../components/common/Loading";
import AppLayout from "../components/common/Layout";

const ActivityDetail = () => {
  const { id } = useParams();
  const { getCallById, updateCall, state } = useContext(FeedContext);

  useEffect(() => {
    getCallById(id);
  }, [id]);

  const handleToogleArchive = (is_archived) => {
    updateCall({
      id,
      body: {
        is_archived: is_archived,
      },
    });
  };

  return (
    <AppLayout goBack>
      {state.loading && <Loading />}
      {state.call && (
        <>
          <Stack p={2} position="relative" height="100%" flex={1}>
            <CallItem call={state.call} format="YYYY MMMM DD hh:ss a" />
            <Grid mt={2} display="flex" container>
              <Grid item xs={6}>
                <Typography>From: {state.call.from}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>To: {state.call.to}</Typography>
              </Grid>
            </Grid>
            <Grid mt={2} display="flex" container>
              <Grid item xs={6}>
                <Typography>Direction: {state.call.direction}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Duration: {state.call.duration}</Typography>
              </Grid>
            </Grid>
            <Stack mt={2}>
              <Typography>Via: {state.call.via}</Typography>
            </Stack>
          </Stack>
          {state.call.is_archived ? (
            <Stack p={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleToogleArchive(false)}
                fullWidth
              >
                unarchive Call
              </Button>
            </Stack>
          ) : (
            <Stack p={2}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleToogleArchive(true)}
                fullWidth
              >
                Archive Call
              </Button>
            </Stack>
          )}
        </>
      )}
    </AppLayout>
  );
};

export default ActivityDetail;
