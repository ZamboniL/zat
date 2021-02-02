// Pretty print date for the chat
export default function timeAgo(date) {
  if (typeof date !== "object") {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 172801);
  if (interval >= 1) {
    intervalType = "dia";
  } else {
    interval = Math.floor(seconds / 86401);
    if (interval >= 1) {
      intervalType = "ontem às";
    } else {
      interval = Math.floor(seconds / 1);
      if (interval >= 1 || seconds == 0) {
        intervalType = "hoje às";
      }
    }
  }

  if (intervalType === "dia") {
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }
  return intervalType + " " + date.getHours() + ":" + date.getMinutes();
}
