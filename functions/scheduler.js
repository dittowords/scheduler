const { WebClient } = require("@slack/web-api");

/**
 * -----------------
 * BEGIN CONFIGURATION
 */

const users = {
  jess: "UNFJFAT43",
  jo: "UNUU6LXN3",
  xav: "U01GVGXCB5G",
  jordin: "U024QHVC4JF",
  ash: "U02MA0RKF0V",
  claire: "U024QHVC4JF",
  reed: "U03DU1QFW9J",
};

const channels = {
  general: "CNE9KJTGA",
  "sentry-app-errors": "C02DZABSTLY",
  "sentry-plugin-errors": "C02DVP40YLC",
  "jordin-testing": "C03EM0NDWFP",
};

const events = [
  {
    name: "🐛 monitor Sentry & merge Dependabot PRs 🤖",
    users: [users.ash, users.reed, users.xav, users.jordin],
    channels: [channels["sentry-app-errors"], channels["sentry-plugin-errors"]],
    // date of start of week, a Monday
    anchor: new Date("2022-05-09T00:00:00.000Z"),
  },
  {
    name: "✨ plan the weekly social ✨",
    users: [
      users.xav,
      users.ash,
      users.claire,
      users.reed,
      users.jess,
      users.jordin,
      users.jo,
    ],
    channels: [channels.general],
    // date of last social, a Thursday
    anchor: new Date("2022-05-05T00:00:00.000Z"),
  },
];
/**
 * END CONFIGURATION
 * -----------------
 */

const token = process.env.SLACK_TOKEN;
const slackClient = new WebClient(token);

const WEEK = 1000 * 60 * 60 * 24 * 7;

function weeksBetween(earlierDate, laterDate) {
  const differenceMs = laterDate.getTime() - earlierDate.getTime();
  const differenceWeeks = Math.floor(differenceMs / WEEK);
  return differenceWeeks;
}

function getUser(users, anchorDate, now) {
  const weeksSinceAnchorDate = weeksBetween(anchorDate, now);

  const userId = users[weeksSinceAnchorDate % users.length];
  if (!userId) {
    throw new Error(
      "Couldn't retrieve user at index " +
        index +
        " in " +
        JSON.stringify(users)
    );
  }

  return userId;
}
module.exports.getUser = getUser;

async function schedule(event, users, dates, channels) {
  const userId = getUser(users, ...dates);

  await Promise.all(
    channels.map(async (channelId) => {
      const data = {
        token,
        channel: channelId,
        text: `This week, it is <@${userId}>'s turn to.. *${event}*`,
      };

      console.log(await slackClient.chat.postMessage(data));
    })
  );
}

async function handler(_event, _context) {
  const now = new Date();

  await Promise.all(
    events.map(({ name, anchor, users, channels }) =>
      schedule(name, users, [anchor, now], channels)
    )
  );

  return { statusCode: 200 };
}

module.exports.handler = handler;
