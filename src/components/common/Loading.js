import { Box } from "@mui/material";
import BounceLoader from "react-spinners/BounceLoader";

const Loading = () => (
  <Box
    position="absolute"
    display="flex"
    alignItems="center"
    justifyContent="center"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={99}
    sx={{ backgroundColor: "#ffffff" }}
  >
    <BounceLoader color={"#36d7b7"} />
  </Box>
);
export default Loading;
