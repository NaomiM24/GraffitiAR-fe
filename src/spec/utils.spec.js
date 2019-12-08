const { expect } = require("chai");
const { getDistance } = require("../utils/getDistance");

describe("getDistance", () => {
  it("returns a number", () => {
    const user = { lat: 0, lng: 0 };
    const marker = { lat: 0, lng: 0 };
    expect(getDistance(user, marker)).to.be.a("number");
  });
  it("returns the distance between the two points", () => {
    let user = { lat: 0, lng: 0 };
    let marker = { lat: 0, lng: 0 };
    expect(getDistance(user, marker)).to.equal(0);
    user = { lat: 53.48076, lng: -2.236988 };
    marker = { lat: 53.410214, lng: -2.157375 };
    expect(getDistance(user, marker)).to.equal(9452);
    user = { lat: 53.477877, lng: -2.231757 };
    marker = { lat: 53.479035, lng: -2.232563 };
    expect(getDistance(user, marker)).to.equal(139);
    user = { lat: 53.410711, lng: -2.162323 };
    marker = { lat: 53.352977, lng: -2.120282 };
    expect(getDistance(user, marker)).to.equal(6999);
  });
});
