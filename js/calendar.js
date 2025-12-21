const events = [
    { name: "Fireworks Festival (Saturday Morning)", id: "fireworks_festival_one", day: 6, hour: 7,  minute: 30, duration: 30 },
    { name: "Fireworks Festival (Saturday Evening)", id: "fireworks_festival_two", day: 6, hour: 19, minute: 30, duration: 30 },
    { name: "Mirage Boat (Sunday Morning)",          id: "mirage_boat_one",        day: 0, hour: 6,  minute: 0,  duration: 60 },
    { name: "Mirage Boat (Sunday Evening)",          id: "mirage_boat_two",        day: 0, hour: 18, minute: 0,  duration: 60 },
    { name: "Breaking Army (Wednesday)",             id: "breaking_army_one",      day: 3, hour: 7,  minute: 30, duration: 60 },
    { name: "Breaking Army (Saturday)",              id: "breaking_army_two",      day: 6, hour: 1,  minute: 0,  duration: 60 },
    { name: "Showdown (Thursday)",                   id: "showdown_one",           day: 4, hour: 1,  minute: 0,  duration: 60 },
    { name: "Showdown (Sunday)",                     id: "showdown_two",           day: 0, hour: 7,  minute: 30, duration: 60 },
    { name: "Guild Party (Daily)",                   id: "guild_party_daily",      day: new Date().getDay(), hour: 8, minute: 30, duration: 30 },
];

const container = document.getElementById('events-container');

events.forEach(event => {
    const div = document.createElement('div');
    div.className = 'bg-slate-700 rounded-lg p-6 shadow-lg';
    div.innerHTML = `
    <p class="text-xl font-semibold mb-2">${event.name}</p>
    <div id="${event.id}" class="text-2xl font-mono text-cyan-300">Calculating...</div>
    `;
    container.appendChild(div);
});

function startCountdown(elementId, targetDay, targetHour, targetMinute = 0, eventDurationMinutes = 60) {
    const element = document.getElementById(elementId);

    function update() {
    const now = new Date();

    // Most recent past occurrence
    let daysBack = (now.getDay() - targetDay + 7) % 7;
    let recentTarget = new Date(now);
    recentTarget.setDate(now.getDate() - daysBack);
    recentTarget.setHours(targetHour, targetMinute, 0, 0);

    // Next occurrence
    let nextTarget = new Date(recentTarget);
    if (recentTarget > now) {
        nextTarget = recentTarget;
    } else {
        nextTarget.setDate(nextTarget.getDate() + 7);
    }

    let displayText = '';
    let isInProgress = false;
    let sortTime = nextTarget.getTime(); // default: next start time

    // Check if currently in progress
    const timeSinceStart = now - recentTarget;
    if (timeSinceStart >= 0) {
        const elapsedMinutes = Math.floor(timeSinceStart / (1000 * 60));
        if (elapsedMinutes < eventDurationMinutes) {
        displayText = `In Progress – ${elapsedMinutes}m elapsed`;
        isInProgress = true;
        // Sort by end time (so ending-soon events are higher among in-progress)
        const endTime = new Date(recentTarget);
        endTime.setMinutes(endTime.getMinutes() + eventDurationMinutes);
        sortTime = endTime.getTime();
        }
    }

    // Normal countdown
    if (!isInProgress) {
        const diff = nextTarget - now;
        const days = Math.floor(diff / (1000*60*60*24));
        const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
        const seconds = Math.floor((diff % (1000*60)) / 1000);

        let parts = [];
        if (days >= 1) { parts.push(`${days}d`); parts.push(`${hours}h`); parts.push(`${minutes}m`); }
        else if (hours >= 1) { parts.push(`${hours}h`); parts.push(`${minutes}m`); }
        else if (minutes >= 1) { parts.push(`${minutes}m`); }
        parts.push(`${seconds}s`);
        displayText = parts.join(' ');
    }

    element.textContent = displayText;

    // Store sort priority: in-progress gets huge priority boost
    element.dataset.sortPriority = isInProgress ? '0' : '1'; // 0 = top
    element.dataset.sortTime = sortTime;
    }

    update();
    setInterval(update, 1000);
}

events.forEach(event => {
    startCountdown(event.id, event.day, event.hour, event.minute, event.duration || 60);
});

// Sort: All In Progress first (by end time), then normal countdowns (by start time)
setInterval(() => {
    const items = Array.from(container.children);
    items.sort((a, b) => {
    const elA = a.querySelector('div[id]');
    const elB = b.querySelector('div[id]');

    const priA = elA.dataset.sortPriority || '1';
    const priB = elB.dataset.sortPriority || '1';
    if (priA !== priB) return priA - priB; // in-progress (0) always above

    const timeA = parseInt(elA.dataset.sortTime || Infinity);
    const timeB = parseInt(elB.dataset.sortTime || Infinity);
    return timeA - timeB;
    });
    items.forEach(item => container.appendChild(item));
}, 1000);