import { ElementNotFoundError } from "./ElementNotFoundError";

export function setStatus(roundValue: string, type: string) {
  // Get HTML Element to show status
  const statusElement = document.getElementById("on-air");
  if (!statusElement) {
    throw new ElementNotFoundError(`Cannot find DOM ID: on-air.`);
  }

  if (roundValue === "pomodoro" && type === "start") {
    statusElement.classList.add("on-focus");
  } else {
    statusElement.classList.remove("on-focus");
  }
}
