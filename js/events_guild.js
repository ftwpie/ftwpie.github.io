const today = new Date().getDay();

// Complete events array (as of December 27, 2025 – winter/standard time)
const events = [
  {
    name: "Breaking Army",
    id: "breaking_army_one",
    day: 3,
    hour: 7,
    minute: 30,
    duration: 60,
    type: 'guild',
    timeframe: "Wednesday (UTC) 12:30",
    estTime: "07:30",
    seaTime: "20:30",
    asiaTime: "21:30",
    europeTime: "13:30"
  },
  {
    name: "Breaking Army",
    id: "breaking_army_two",
    day: 6,
    hour: 1,
    minute: 0,
    duration: 60,
    type: 'guild',
    timeframe: "Saturday (UTC) 06:00",
    estTime: "01:00",
    seaTime: "14:00",
    asiaTime: "15:00",
    europeTime: "07:00"
  },
  {
    name: "Showdown",
    id: "showdown_one",
    day: 4,
    hour: 1,
    minute: 0,
    duration: 60,
    type: 'guild',
    timeframe: "Thursday (UTC) 06:00",
    estTime: "01:00",
    seaTime: "14:00",
    asiaTime: "15:00",
    europeTime: "07:00"
  },
  {
    name: "Showdown",
    id: "showdown_two",
    day: 0,
    hour: 7,
    minute: 30,
    duration: 60,
    type: 'guild',
    timeframe: "Sunday (UTC) 12:30",
    estTime: "07:30",
    seaTime: "20:30",
    asiaTime: "21:30",
    europeTime: "13:30"
  },
  {
    name: "Guild Party",
    id: "guild_party_daily",
    day: null,
    hour: 8,
    minute: 30,
    duration: 30,
    type: 'guild',
    timeframe: "Daily (UTC) 13:30",
    estTime: "08:30",
    seaTime: "21:30",
    asiaTime: "22:30",
    europeTime: "14:30"
  }
];

// Containers
const guildContainer = document.getElementById('guild-events-container');

// Split events
const guildEvents = events.filter(e => e.type === 'guild');

// Create Guild Event Cards
guildEvents.forEach(event => {
    const div = document.createElement('div');
    div.className = 'bg-indigo-900 rounded-lg p-4 shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 transition-all duration-500';
    div.innerHTML = `
        <p class="font-semibold leading-tight mb-2">${event.name}</p>

        <p class="text-sm leading-tight opacity-70">${event.timeframe}</p>

        <div class="flex flex-row space-x-2 justify-center">
            <p class="text-sm leading-tight opacity-70">East Asia</p>
            <p class="text-sm leading-tight opacity-70">${event.asiaTime}</p>
        </div>
        <div class="flex flex-row space-x-2 justify-center">
            <p class="text-sm leading-tight opacity-70">Southeast Asia</p>
            <p class="text-sm leading-tight opacity-70">${event.seaTime}</p>
        </div>
        <div class="flex flex-row space-x-2 justify-center">
            <p class="text-sm leading-tight opacity-70">Europe (CET/CEST)</p>
            <p class="text-sm leading-tight opacity-70">${event.europeTime}</p>
        </div>
        <div class="flex flex-row space-x-2 justify-center">
            <p class="text-sm leading-tight opacity-70">America (EST)</p>
            <p class="text-sm leading-tight opacity-70">${event.estTime}</p>
        </div>

        <div id="${event.id}" class="font-mono text-cyan-300 mt-2 leading-none">Calculating...</div>
    `;
    guildContainer.appendChild(div);
});

// Updated countdown function - now supports daily events (targetDay = null)
function startCountdown(elementId, targetDay, targetHour, targetMinute = 0, eventDurationMinutes = 60) {
    const element = document.getElementById(elementId);

    function update() {
        const now = new Date();

        let targetForToday = new Date(now);
        targetForToday.setHours(targetHour, targetMinute, 0, 0);

        let nextTarget;
        let recentTarget;

        if (targetDay === null) {
            // Daily event logic
            recentTarget = new Date(targetForToday);
            if (recentTarget > now) {
                nextTarget = recentTarget; // Today, hasn't happened yet
            } else {
                nextTarget = new Date(recentTarget);
                nextTarget.setDate(nextTarget.getDate() + 1); // Tomorrow
                recentTarget = new Date(targetForToday); // Keep recent as today for in-progress check
            }
        } else {
            // Weekly event logic (unchanged)
            let daysBack = (now.getDay() - targetDay + 7) % 7;
            recentTarget = new Date(now);
            recentTarget.setDate(now.getDate() - daysBack);
            recentTarget.setHours(targetHour, targetMinute, 0, 0);

            nextTarget = new Date(recentTarget);
            if (recentTarget <= now) {
                nextTarget.setDate(nextTarget.getDate() + 7);
            }
        }

        let displayText = '';
        let isInProgress = false;
        let sortTime = nextTarget.getTime();

        // Check if event is currently in progress
        const timeSinceStart = now - recentTarget;
        if (timeSinceStart >= 0) {
            const elapsedMinutes = Math.floor(timeSinceStart / (1000 * 60));
            if (elapsedMinutes < eventDurationMinutes) {
                displayText = `Remaining: ${eventDurationMinutes - elapsedMinutes}m`;
                isInProgress = true;
                const endTime = new Date(recentTarget);
                endTime.setMinutes(endTime.getMinutes() + eventDurationMinutes);
                sortTime = endTime.getTime();
            }
        }

        // If not in progress, show countdown to next
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
            displayText = `Upcoming: ${parts.join(' ')}`;
        }

        element.textContent = displayText;
        element.dataset.sortPriority = isInProgress ? '0' : '1';
        element.dataset.sortTime = sortTime;
    }

    update();
    setInterval(update, 1000);
}

// Start all countdowns
events.forEach(event => {
    startCountdown(event.id, event.day, event.hour, event.minute, event.duration || 60);
});

// Sort + highlight
function sortAndHighlight(container) {
    const items = Array.from(container.children);
    items.sort((a, b) => {
        const elA = a.querySelector('div[id]');
        const elB = b.querySelector('div[id]');
        const priA = elA.dataset.sortPriority || '1';
        const priB = elB.dataset.sortPriority || '1';
        if (priA !== priB) return priA - priB;
        const timeA = parseInt(elA.dataset.sortTime || Infinity);
        const timeB = parseInt(elB.dataset.sortTime || Infinity);
        return timeA - timeB;
    });

    items.forEach(item => container.appendChild(item));

    // Highlight the top card (currently active or soonest upcoming)
    const cards = container.children;
    if (cards.length > 0) {
        for (let card of cards) {
            card.classList.remove('bg-indigo-700');
            card.classList.add('bg-indigo-900');
        }
        cards[0].classList.remove('bg-indigo-900');
        cards[0].classList.add('bg-indigo-700');
    }
}

// Run sort every second
setInterval(() => sortAndHighlight(guildContainer), 1000);

// Optional: Copy button example (if you still want one)
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const targetId = button.getAttribute('data-target');
        const text = document.getElementById(targetId).textContent;

        try {
            await navigator.clipboard.writeText(text);
            button.textContent = 'Copied!';
            setTimeout(() => button.textContent = 'Copy', 2000);
        } catch (err) {
            console.error('Copy failed:', err);
            button.textContent = 'Failed';
        }
    });
});