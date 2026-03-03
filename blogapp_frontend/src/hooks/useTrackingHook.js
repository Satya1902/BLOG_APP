import { useState, useEffect } from "react";

function useTracking(name) {
  useEffect(() => {
    console.log(`[${name}]: mounted`);
  }, []);
  useEffect(() => {
    console.log(`[${name}]: rendered`);
  });
  useEffect(() => {
    return () => {
      console.log(`[${name}]: unmounted`);
    };
  }, []);
}
export default useTracking;
