import { staticData } from './../staticData.js';
import { renderEvents } from './engine.js';

const { type, guild } = document.body.dataset;

const events =
  type === 'global'
    ? staticData.events.global
    : staticData.events.guild[guild];

renderEvents({
  events,
  containerId: `${type}-events-container`
});
