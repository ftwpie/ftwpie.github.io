// Helper functions
function getEasternUtcOffset(date) {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const standardOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  return date.getTimezoneOffset() === standardOffset ? 5 : 4;
}

function formatTime(hour, minute = 0) {
  const h = Math.floor(hour) % 24;
  return `${h.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

function getDayName(day) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return day === null ? 'Daily' : days[day];
}

// Generate all timeframes (UTC primary)
function generateTimeframes(day, estHour, estMinute) {
  // Sample date on the correct day for accurate DST detection
  const now = new Date();
  let sampleDate = new Date(now);
  if (day !== null) {
    let daysAhead = day - now.getDay();
    if (daysAhead <= 0) daysAhead += 7;
    sampleDate.setDate(now.getDate() + daysAhead);
  }
  sampleDate.setHours(estHour, estMinute, 0, 0);

  const easternOffset = getEasternUtcOffset(sampleDate); // 5 or 4
  const isDst = easternOffset === 4;

  // UTC
  const utcHour = (estHour + easternOffset) % 24;
  const utcTime = formatTime(utcHour, estMinute);

  // EST/EDT
  const estLabel = isDst ? 'EDT' : 'EST';
  const estTime = formatTime(estHour, estMinute);

  // SEA: UTC+8 (fixed)
  const seaHour = (utcHour + 8) % 24;
  const seaTime = formatTime(seaHour, estMinute);

  // Asia (Tokyo/Seoul): UTC+9 (fixed)
  const asiaHour = (utcHour + 9) % 24;
  const asiaTime = formatTime(asiaHour, estMinute);

  // Europe (CET/CEST): UTC+1 winter, +2 summer
  // Simple rule: same DST period as US (March-Nov approx)
  const europeOffset = isDst ? 2 : 1;
  const europeHour = (utcHour + europeOffset) % 24;
  const europeTime = formatTime(europeHour, estMinute);

  const dayStr = getDayName(day);

  return {
    timeframe: `${dayStr} at ${utcTime} UTC`,
    estTime: `${estTime} ${estLabel}`,
    seaTime: `${seaTime} SEA`,
    asiaTime: `${asiaTime} AS`,
    europeTime: `${europeTime} Europe (CET/CEST)`
  };
}