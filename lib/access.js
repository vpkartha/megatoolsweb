const paidUsers = new Set();

export function grantAccess(userId, tool) {
  paidUsers.add(`${userId}:${tool}`);
}

export function hasAccess(userId, tool) {
  return paidUsers.has(`${userId}:${tool}`);
}