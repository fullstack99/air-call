import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Stack, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import _ from "lodash";
import moment from "moment";

import { Context as FeedContext } from "../context/FeedContext";
import Loading from "../components/common/Loading";
import AppLayout from "../components/common/Layout";
import Feed from "../components/Feed";

const ActivityFeed = () => {
  const [selectedTab, setSelectedTab] = useState("1");
  const { getAllCallList, state } = useContext(FeedContext);

  useEffect(() => {
    getAllCallList();
  }, []);

  const filterFn = useCallback(
    (is_archived) => {
      const list = _.chain(state.calls)
        .filter((v) => v.is_archived === is_archived)
        .sortBy(state.calls, "created_at")
        .values()
        .valueOf();

      const date = (item) => moment(item.created_at).format("YYYY-MM-DD");
      const data = _.chain(list).groupBy(date).values().valueOf();
      return data;
    },
    [state]
  );

  const activeList = useMemo(() => {
    const data = filterFn(false);
    return data;
  }, [filterFn]);

  const archiveList = useMemo(() => {
    const data = filterFn(true);
    return data;
  }, [filterFn]);

  return (
    <AppLayout goBack={false}>
      {state.loading && <Loading />}
      <TabContext value={selectedTab}>
        <Stack sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(ev, val) => setSelectedTab(val)}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab label="Activity" value="1" />
            <Tab label="Archived" value="2" />
          </TabList>
        </Stack>
        <Stack
          flex={1}
          sx={{
            overflowY: "auto",
          }}
        >
          <TabPanel value="1">
            <Feed list={activeList} />
          </TabPanel>
          <TabPanel value="2">
            <Feed list={archiveList} reset />
          </TabPanel>
        </Stack>
      </TabContext>
    </AppLayout>
  );
};

export default ActivityFeed;
