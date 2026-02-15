import { useEffect, useState } from "react";
import { API_AVAILABILITY_EVENT } from "@/utils/api-availability";

export const useApiAvailability = () => {
  const [isApiOnline, setIsApiOnline] = useState(true);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ online: boolean }>;
      setIsApiOnline(customEvent.detail.online);
    };

    window.addEventListener(API_AVAILABILITY_EVENT, handler);

    return () => {
      window.removeEventListener(API_AVAILABILITY_EVENT, handler);
    };
  }, []);

  return isApiOnline;
};
