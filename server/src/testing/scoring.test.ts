import { forTesting } from "../logic/game/scoring";

const {
    calculateWithPredicate,
    calculateGroups,
    calculateTriangle,
    calculateRun,
    calculateSingleGroup,
} = forTesting;

test("Calculates correct with predicate", () => {
    expect(calculateWithPredicate([1, 2, 3, 4, 5, 6], (v) => v % 2 === 0)).toBe(12);
});

test("Calculates doubles", () => {
    expect(calculateGroups([2, 2, 4, 4, 6, 6], 2)).toBe(24);
});

test("Calculates triples", () => {
    expect(calculateGroups([1, 1, 1, 3, 3, 3], 3)).toBe(12);
});

test("Calculates duplicate doubles", () => {
    expect(calculateGroups([2, 2, 2, 2, 6, 6], 2)).toBe(20);
});

test("Calculates incorrect doubles", () => {
    expect(calculateGroups([2, 2, 3, 4, 6, 6], 2)).toBe(0);
});

test("Calculates small triangle", () => {
    expect(calculateTriangle([2, 3, 4, 2, 3, 2], "small")).toBe(16);
});

test("Calculates incorrect small triangle", () => {
    expect(calculateTriangle([2, 3, 4, 2, 3, 6], "small")).toBe(0);
});

test("Calculates large triangle", () => {
    expect(calculateTriangle([4, 5, 6, 5, 6, 6], "large")).toBe(32);
});

test("Calculates incorrect large triangle", () => {
    expect(calculateTriangle([3, 5, 6, 5, 6, 6], "large")).toBe(0);
});

test("Calculates run", () => {
    expect(calculateRun([2, 4, 5, 1, 6, 3])).toBe(21);
});

test("Calculates incorrect run", () => {
    expect(calculateRun([2, 3, 4, 3, 1, 6])).toBe(0);
});

test("Calculates single group", () => {
    expect(calculateSingleGroup([4, 4, 4, 4, 6, 4], 5)).toBe(20);
});

test("Calculates incorrect single group", () => {
    expect(calculateSingleGroup([4, 4, 4, 4, 6, 4], 6)).toBe(0);
});
