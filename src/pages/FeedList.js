import React, { useState, useEffect, useContext, useMemo } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import _ from "lodash";
import moment from "moment";

import { Context as FeedContext } from "../context/FeedContext";
import Header from "../components/Header";
import ArchiveList from "./ArchiveList";
import ActiveList from "./ActiveList";
import Loading from "../components/Loading";

const compareFn = (a, b) => {
  if (a.created_at > b.created_at) return -1;
  else if (a.created_at < b.created_at) return 1;
  else return 0;
};
const FeedList = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { getAllCallList, state } = useContext(FeedContext);

  useEffect(() => {
    getAllCallList();
  }, []);

  const activeList = useMemo(() => {
    const list = state.calls.filter((v) => !v.is_archived).sort(compareFn);
    const date = (item) => moment(item.created_at).format("YYYY-MM-DD");

    const data = _.chain(list).groupBy(date).values().valueOf();
    return data;
  }, [state]);

  const archiveList = useMemo(() => {
    const list = state.calls.filter((v) => v.is_archived).sort(compareFn);
    const date = (item) => moment(item.created_at).format("YYYY-MM-DD");

    const data = _.chain(list).groupBy(date).values().valueOf();
    return data ?? [];
  }, [state]);

  return (
    <div className="container">
      <Header visible={false} />
      <Box
        sx={{ width: "100%", height: "calc(100% - 70px)", typography: "body1" }}
      >
        {state.loading && <Loading />}
        <TabContext value={selectedTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={(ev, val) => setSelectedTab(val)}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab label="Active" value="1" />
              <Tab label="Archive" value="2" />
            </TabList>
          </Box>
          <Box
            sx={{
              height: "calc(100% - 50px)",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <TabPanel value="1">
              <ActiveList list={activeList} />
            </TabPanel>
            <TabPanel value="2">
              <ArchiveList list={archiveList} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </div>
  );
};

export default FeedList;
