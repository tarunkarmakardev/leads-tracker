type StatTime = {
  hours: number;
  minutes: number;
};

export function getStatTimeTotalHours(timings: StatTime[]) {
  return timings.reduce((p, c) => {
    const totalHours = Math.round(p + c.hours + c.minutes / 60);
    return totalHours;
  }, 0);
}
