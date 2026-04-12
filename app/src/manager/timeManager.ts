export function getFormattedTime(timestamp: number, locale = "fr-FR") {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export function getCurrentFormattedDateString() {
  const date = new Date();
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function getCurrentFormattedTimeString() {
  const date = new Date();
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export function getCurrentFormattedDateFileString() {
  const date = new Date();
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default getFormattedTime;
