export function setStatus(roundValue: string) {
  // Get HTML Element to show status
  const statusElement = document.getElementById("on-air");
  if (!statusElement) {
    throw new Error("Cannot get DOM ID.");
  }
  switch (roundValue) {
    case "pomodoro":
      statusElement.classList.add("on-focus");
      break;
    case "short_break":
    case "long_break":
      statusElement.classList.remove("on-focus");
      break;
    default:
      break;
  }
}
