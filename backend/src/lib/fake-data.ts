import chalk from "chalk";
import { faker } from "@faker-js/faker";
import { CallStat } from "@/models/call-stat";
import _ from "lodash";

export function fakeCallStatTimings() {
  const data = _.range(
    0,
    faker.number.int({
      min: 1,
      max: 2,
    })
  ).map((t) => ({
    title: faker.helpers.arrayElement([
      "Team Meet",
      "Brown Bag",
      "Thrilling Thursdays",
    ]),
    hours: faker.number.int({
      min: 0,
      max: 1,
    }),
    minutes: faker.number.int({
      min: 0,
      max: 30,
    }),
  }));
  return [{ title: "Break", hours: 1, minutes: 0 }, ...data];
}

export function fakeCallStat(userId: string) {
  return {
    basicDetails: {
      calls: faker.number.int({
        min: 50,
        max: 120,
      }),
      appointments: faker.number.int({
        min: 0,
        max: 2,
      }),
      callBacks: faker.number.int({
        min: 1,
        max: 20,
      }),
      followUps: faker.number.int({
        min: 1,
        max: 20,
      }),
      pitched: faker.number.int({
        min: 1,
        max: 20,
      }),
      recordingsSent: faker.datatype.boolean(),
    },
    callDate: faker.date
      .between({
        from: new Date("01-jan-2023"),
        to: new Date(),
      })
      .toISOString(),
    requests: {
      email: faker.number.int({
        min: 1,
        max: 10,
      }),
      linkedin: faker.number.int({
        min: 1,
        max: 10,
      }),
      whatsApp: faker.number.int({
        min: 1,
        max: 10,
      }),
    },
    timings: fakeCallStatTimings(),
    userId,
  };
}

export async function populateCallStat(userId: string) {
  const stat = new CallStat(fakeCallStat(userId));
  await stat.save();
  console.log(chalk.yellowBright("Populated Data: ", stat));
}

export async function populateCallStats(userId: string, count: number = 5) {
  console.log(chalk.yellowBright("Populating: Call Stats"));
  _.range(0, count).forEach(async (idx) => {
    await populateCallStat(userId);
    if (count - 1 === idx) {
      console.log(chalk.green(`${count} items added`));
    }
  });
}
