const { getUser } = require("../functions/scheduler");

test("getUser gets the correct user", () => {
  const users = ["1", "2", "3", "4", "5"];
  const anchorDate = new Date("2022-05-05T00:00:00.000Z");
  const test = (date, expected) => {
    expect(getUser(users, anchorDate, new Date(date))).toBe(expected);
  };

  test("2022-05-09T00:00:00.000Z", "1");
  test("2022-05-16T00:00:00.000Z", "2");
  test("2022-05-23T00:00:00.000Z", "3");
  test("2022-05-30T00:00:00.000Z", "4");
  test("2022-06-06T00:00:00.000Z", "5");

  test("2022-06-13T00:00:00.000Z", "1");
  test("2022-06-20T00:00:00.000Z", "2");
  test("2022-06-27T00:00:00.000Z", "3");
  test("2022-07-04T00:00:00.000Z", "4");
  test("2022-07-11T00:00:00.000Z", "5");
});

test("getUser gets the correct user with nulls", () => {
  const users = [
    "ash",
    null,
    "george",
    null,
    "claire",
    null,
    "jrod",
    null,
    "jordin",
    null,
    "reed",
    null,
    "jess",
    null,
    "jo",
    null,
  ];
  const anchorDate = new Date("2022-06-05T00:00:00.000Z");
  const test = (date, expected) => {
    try {
      const result = getUser(users, anchorDate, new Date(date));
      if (result !== expected) {
        throw { result, expected };
      }
      expect(result).toBe(expected);
    } catch (e) {
      const { result, expected } = e;
      console.log(`Failed on "test(${date}, ${expected})"`);
      expect(result).toBe(expected);
    }
  };

  test("2022-06-05T00:00:00.000Z", "ash");
  test("2022-06-12T00:00:00.000Z", null);
  test("2022-06-19T00:00:00.000Z", "george");
  test("2022-06-26T00:00:00.000Z", null);
  test("2022-07-03T00:00:00.000Z", "claire");
  test("2022-07-10T00:00:00.000Z", null);
  test("2022-07-17T00:00:00.000Z", "jrod");
  test("2022-07-24T00:00:00.000Z", null);
  test("2022-07-31T00:00:00.000Z", "jordin");
  test("2022-08-07T00:00:00.000Z", null);
  test("2022-08-14T00:00:00.000Z", "reed");
  test("2022-08-21T00:00:00.000Z", null);
  test("2022-08-28T00:00:00.000Z", "jess");
  test("2022-09-04T00:00:00.000Z", null);
  test("2022-09-11T00:00:00.000Z", "jo");
  test("2022-09-18T00:00:00.000Z", null);
  test("2022-09-25T00:00:00.000Z", "ash");
  test("2022-10-02T00:00:00.000Z", null);
});
