import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

const useMatches = () => {
  const [matches, setMatches] = useState(false);
  /* establish the media query breakpoint */
  const mq = useMediaQuery("(min-width:600px)");
  /* change matches depending on windows size */
  useEffect(() => {
    setMatches(mq);
  }, [mq]);

  return matches;
};

export default useMatches;