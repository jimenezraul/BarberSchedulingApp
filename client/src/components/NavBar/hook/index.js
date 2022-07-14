import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutside(ref, setIsOpen) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      // if the target is a image, then close it
      if (event.target.tagName === "IMG") {
        setIsOpen(false);
        return;
      }

      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        return;
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    // on mobile scroll
    window.addEventListener("scroll", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);
}
