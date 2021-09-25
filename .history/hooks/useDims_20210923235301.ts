import { useState, useEffect } from "react";

function getWindowDimensions() {
   try {
    if(window!==undefined) {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height,
        };
    } else {
        return { height: 0, width: 0 }
        }
    } catch(error) {
        return { height: 0, width: 0}
    }
}
const useWindowDimensions = (): { width: number; height: number } => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;