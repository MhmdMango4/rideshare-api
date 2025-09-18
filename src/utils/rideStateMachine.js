// Define valid transitions
const validTransitions = {
  requested: ["accepted", "cancelled"],
  accepted: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

/**
 * Validates if a state transition is allowed
 * @param {String} currentStatus - current ride status
 * @param {String} newStatus - desired new status
 * @returns {Boolean} - true if transition is valid
 */

function isValidTransition(currentStatus, newStatus) {
  return validTransitions[currentStatus]?.includes(newStatus) || false;
}

/**
 * Throws error if transition is invalid
 * @param {String} currentStatus
 * @param {String} newStatus
 */

function validateTransition(currentStatus, newStatus) {
  if (!isValidTransition(currentStatus, newStatus)) {
    throw new Error(
      `Invalid state transition: ${currentStatus} -> ${newStatus}`
    );
  }
}

module.exports = {
  isValidTransition,
  validateTransition,
  validTransitions,
};
