export function renderEvents({
    events,
    containerId
}) {
    const container = document.getElementById(containerId);

    events.forEach(event => {
        const div = document.createElement('div');
        div.className = 'bg-indigo-900 rounded-lg p-4 shadow-lg';
        div.innerHTML = `
        <p class="font-semibold">${event.name}</p>
        <p class="opacity-70">${event.timeframe}</p>
        <div id="${event.id}" class="font-mono text-cyan-300">Calculating...</div>
        `;
        container.appendChild(div);
    });

    // Start all countdowns
    events.forEach(event => {
        startCountdown(event.id, event.day, event.hour, event.minute, event.duration || 60);
    });

  setInterval(() => sortAndHighlight(container), 1000);

    // Countdown function (unchanged)
    function startCountdown(elementId, targetDay, targetHour, targetMinute = 0, eventDurationMinutes = 60) {
        const element = document.getElementById(elementId);

        function update() {
            const now = new Date();

            let daysBack = (now.getDay() - targetDay + 7) % 7;
            let recentTarget = new Date(now);
            recentTarget.setDate(now.getDate() - daysBack);
            recentTarget.setHours(targetHour, targetMinute, 0, 0);

            let nextTarget = new Date(recentTarget);
            if (recentTarget > now) {
                nextTarget = recentTarget;
            } else {
                nextTarget.setDate(nextTarget.getDate() + 7);
            }

            let displayText = '';
            let isInProgress = false;
            let sortTime = nextTarget.getTime();

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

        // Strong highlight for top card
        const cards = container.children;
        if (cards.length > 0) {
            // Reset all to normal bg
            for (let card of cards) {
                card.classList.remove('bg-indigo-700');
                card.classList.add('bg-indigo-900');
            }
            // Highlight top
            cards[0].classList.remove('bg-indigo-900');
            cards[0].classList.add('bg-indigo-700');
        }
    }

}
