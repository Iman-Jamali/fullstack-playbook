import { CircularProgress } from "@mui/material";
import { Fragment } from "react";

const Spinner = ({loading, children}) => {
  if (!loading) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        flexDirection: "column",
        top: 0,
        left: 0,
        width: "100%",
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      {children}
      <CircularProgress />
    </div>
  );
};

export default Spinner;