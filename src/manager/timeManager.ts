export function getFormattedTime(timestamp, locale = "fr-FR") {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function getCurrentFormattedDateString() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getCurrentFormattedTimeString() {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();

  return `${hour}:${min}`;
}
