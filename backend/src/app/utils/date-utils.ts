export const getStartOfToday = () => {
  const todaysDate = new Date();
  todaysDate.setUTCHours(0, 0, 0, 0);

  return todaysDate;
};
