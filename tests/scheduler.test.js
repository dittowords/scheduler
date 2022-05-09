const { getUser } = require("../functions/scheduler");

test("getUser gets the correct user", () => {
  const users = ["1", "2", "3", "4"];
  const anchorDate = new Date("2022-05-05T00:00:00.000Z");
  const test = (date, expected) => {
    expect(getUser(users, anchorDate, new Date(date))).toBe(expected);
  };

  test("2022-05-09T00:00:00.000Z", "1");
  test("2022-05-16T00:00:00.000Z", "2");
  test("2022-05-23T00:00:00.000Z", "3");
  test("2022-05-30T00:00:00.000Z", "4");

  test("2022-06-06T00:00:00.000Z", "1");
  test("2022-06-13T00:00:00.000Z", "2");
  test("2022-06-20T00:00:00.000Z", "3");
  test("2022-06-27T00:00:00.000Z", "4");
});
