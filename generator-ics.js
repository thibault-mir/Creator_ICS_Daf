document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('icsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startdate = document.getElementById('startdate').value;
    console.log("Start Date Selected:", startdate);

    const startDateTime = new Date(startdate + 'T11:00:00');
    const endDateTime = new Date(startdate + 'T12:00:00');
    console.log("Start DateTime:", startDateTime);
    console.log("End DateTime:", endDateTime);

    const pad = (num) => num.toString().padStart(2, '0');

    const formatDate = (date) => {
      return date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) + 'T' +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) + 'Z';
    };

    const formattedStartDate = formatDate(startDateTime);
    const formattedEndDate = formatDate(endDateTime);
    console.log("Formatted Start DateTime:", formattedStartDate);
    console.log("Formatted End DateTime:", formattedEndDate);

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ical.marudot.com//iCal Event Maker",
      "CALSCALE:GREGORIAN",
      "BEGIN:VTIMEZONE",
      "TZID:Europe/Berlin",
      "LAST-MODIFIED:20231222T233358Z",
      "TZURL:https://www.tzurl.org/zoneinfo-outlook/Europe/Berlin",
      "X-LIC-LOCATION:Europe/Berlin",
      "BEGIN:DAYLIGHT",
      "TZNAME:CEST",
      "TZOFFSETFROM:+0100",
      "TZOFFSETTO:+0200",
      "DTSTART:19700329T020000",
      "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
      "END:DAYLIGHT",
      "BEGIN:STANDARD",
      "TZNAME:CET",
      "TZOFFSETFROM:+0200",
      "TZOFFSETTO:+0100",
      "DTSTART:19701025T030000",
      "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
      "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `DTSTAMP:${formattedStartDate}`,
      `UID:${Date.now()}@example.com`,
      `DTSTART:${formattedStartDate}`,
      `DTEND:${formattedEndDate}`,
      "SUMMARY:Test",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    console.log("ICS Content:\n", icsContent);

    try {
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'event.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      console.log("Download triggered successfully.");
    } catch (error) {
      console.error("Error creating or downloading the ICS file:", error);
    }
  });
});
