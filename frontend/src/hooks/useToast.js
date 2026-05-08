import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({
      open: true,
      message,
      type,
    });
  }

  function closeToast() {
    setToast((prev) => ({ ...prev, open: false }));
  }

  return { toast, showToast, closeToast };
}