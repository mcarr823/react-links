/**
 * Checks if the current process is running from Jest or not.
 * ie. If we're in the middle of running a unit test.
 * 
 * @returns true if this process is running from Jest
 */
export function isJest(): Boolean {
    return process.env.JEST_WORKER_ID !== undefined
}