import { staticData } from './../staticData.js';
import { renderEvents } from './events_engine.js';

renderEvents({
  events: staticData.events.guilds.dessert,
  containerId: 'guild-events-container'
});