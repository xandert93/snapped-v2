export const entityIdSelector = (entity) => entity._id;

//oldest to youngest
export const compareEntityCreatedAtAsc = (entity1, entity2) => {
  return entity1.createdAt.localeCompare(entity2.createdAt); // => 1, -1 or 0
};

export const compareEntityUpdatedAtAsc = (entity1, entity2) => {
  return entity1.updatedAt.localeCompare(entity2.updatedAt);
};

//youngest to oldest
export const compareEntityCreatedAtDesc = (entity1, entity2) => {
  return entity2.createdAt.localeCompare(entity1.createdAt);
};

export const compareEntityUpdatedAtDesc = (entity1, entity2) => {
  return entity2.updatedAt.localeCompare(entity1.updatedAt);
};
