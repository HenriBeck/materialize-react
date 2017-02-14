/**
 * A utility class to get some data from an event.
 */
export default class Event {
  /**
   * Initialize the event.
   *
   * @param {Object} ev - The event object from react.
   */
  constructor(ev = null) {
    this.ev = ev;
  }

  /**
   * A function to get the coordinates where the event happened.
   * If there are no coords it will return null.
   *
   * @returns {Object} - Returns an object with the x and y coordinates.
   */
  getCords() {
    if (this.ev) {
      // Check for touch positions
      if (this.ev.touches && this.ev.touches[0]) {
        return {
          x: this.ev.touches[0].clientX,
          y: this.ev.touches[0].clientY,
        };
      }

      // Check for other common values in the event
      if (this.ev.clientX && this.ev.clientY) {
        return {
          x: this.ev.clientX,
          y: this.ev.clientY,
        };
      }

      if (this.ev.x && this.ev.y) {
        return {
          x: this.ev.x,
          y: this.ev.y,
        };
      }
    }

    return null;
  }
}
