    const events = [
      { name: "Fireworks Festival (Saturday Morning)", id: "fireworks_festival_morning", day: 6, hour: 7,  minute: 30, duration: 60 },
      { name: "Fireworks Festival (Saturday Evening)", id: "fireworks_festival_evening", day: 6, hour: 19, minute: 30, duration: 60 },
      { name: "Mirage Boat (Sunday Morning)",          id: "mirage_boat_morning",        day: 0, hour: 6,  minute: 0,  duration: 120 },
      { name: "Mirage Boat (Sunday Evening)",          id: "mirage_boat_evening",        day: 0, hour: 18, minute: 0,  duration: 120 },
      { name: "Breaking Army (Wednesday)",             id: "breaking_army_one",          day: 3, hour: 7,  minute: 30, duration: 30 },
      { name: "Breaking Army (Saturday)",              id: "breaking_army_two",          day: 6, hour: 1,  minute: 0,  duration: 30 },
      { name: "Showdown (Thursday)",                   id: "showdown_one",               day: 4, hour: 1,  minute: 0,  duration: 90 },
      { name: "Showdown (Sunday)",                     id: "showdown_two",               day: 0, hour: 7,  minute: 30, duration: 90 },
      { name: "Guild Party (Daily)",                   id: "guild_party",                day: new Date().getDay(), hour: 8, minute: 30, duration: 60 },
    ];

    const container = document.getElementById('events-container');

    // Create event cards
    events.forEach(event => {
      const div = document.createElement('div');
      div.className = 'bg-slate-700 rounded-lg p-6 shadow-lg';
      div.innerHTML = `
        <p class="text-xl font-semibold mb-2">${event.name}</p>
        <div id="${event.id}" class="text-2xl font-mono text-cyan-300">Calculating...</div>
      `;
      container.appendChild(div);
    });

    // Reusable countdown with "In Progress" support
    function startCountdown(elementId, targetDay, targetHour, targetMinute = 0, eventDurationMinutes = 60) {
      const element = document.getElementById(elementId);

      function update() {
        const now = new Date();
        const currentDay = now.getDay();

        let daysAhead = (targetDay - currentDay + 7) % 7;
        let nextTarget = new Date(now);
        nextTarget.setDate(now.getDate() + daysAhead);
        nextTarget.setHours(targetHour, targetMinute, 0, 0);

        if (nextTarget <= now) {
          nextTarget.setDate(nextTarget.getDate() + 7);
        }

        const diffToNext = nextTarget - now;
        let displayText;
        let sortTime = nextTarget.getTime();

        if (diffToNext <= 0) {
          const elapsedMs = -diffToNext;
          const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));

          if (elapsedMinutes < eventDurationMinutes) {
            displayText = `In Progress – ${elapsedMinutes}m elapsed`;
            // Sort by when it ends
            sortTime = now.getTime() + (eventDurationMinutes - elapsedMinutes) * 60 * 1000;
          }
        }

        if (!displayText) {
          const days = Math.floor(diffToNext / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffToNext % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diffToNext % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diffToNext % (1000 * 60)) / 1000);

          let parts = [];
          if (days >= 1) {
            parts.push(`${days}d`);
            parts.push(`${hours}h`);
            parts.push(`${minutes}m`);
          } else if (hours >= 1) {
            parts.push(`${hours}h`);
            parts.push(`${minutes}m`);
          } else if (minutes >= 1) {
            parts.push(`${minutes}m`);
          }
          parts.push(`${seconds}s`);
          displayText = parts.join(' ');
        }

        element.textContent = displayText;
        element.dataset.nextTime = sortTime;
      }

      update();
      setInterval(update, 1000);
    }

    // Start all countdowns
    events.forEach(event => {
      startCountdown(
        event.id,
        event.day,
        event.hour,
        event.minute,
        event.duration || 60
      );
    });

    // Sort by soonest first (including in-progress events)
    setInterval(() => {
      const items = Array.from(container.children);
      items.sort((a, b) => {
        const timeA = parseInt(a.querySelector('div[id]').dataset.nextTime || Infinity);
        const timeB = parseInt(b.querySelector('div[id]').dataset.nextTime || Infinity);
        return timeA - timeB;
      });
      items.forEach(item => container.appendChild(item));
    }, 1000);