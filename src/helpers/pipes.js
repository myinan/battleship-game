// You can use pipe() and asyncPipe() to compose functions declaratively.
// In order for this style of composition to work correctly, the units we compose needs to be decoupled.
// The pipe itself doesn't need to be unit tested since it does not contain programming logic.
// Piped functions can be unit tested seperately.

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

/*
// Functions to compose
const g = n => n + 1;
const f = n => n * 2;

// Declarative composition
const doStuffBetter = pipe(g, f);

doStuffBetter(20) // 42
*/

const asyncPipe =
  (...fns) =>
  (x) =>
    fns.reduce(async (y, f) => f(await y), x);

/*
const uploadFiles = asyncPipe(
  readUser,
  getFolderInfo,
  haveWriteAccess,
  uploadToFolder
);
uploadFiles({ user, folder, files }).then(log);
*/
