import React, { useEffect, useState } from "react";
export default function useComputeHeight(
  el?: React.RefObject<HTMLElement>,
  deps: any[] = []
) {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const computeContainerHeight = () => {
      if (el?.current) {
        const viewPortHeight =
          window.innerHeight ||
          window.document.documentElement.clientHeight ||
          document.body.clientHeight;

        const rect = el.current.getBoundingClientRect();
        const y = rect.top;
        const h = viewPortHeight - y;
        setHeight(h);
      }
    };

    setTimeout(computeContainerHeight, 100);
    window.addEventListener("resize", () => {
      computeContainerHeight();
    });

    return () => {
      window.removeEventListener("resize", computeContainerHeight);
    };
  }, [...deps]);

  return height;
}
