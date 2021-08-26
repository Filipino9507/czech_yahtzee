import PredicateScoringRule from "../logic/game/scoring/predicate-scoring-rule";
import SingleGroupScoringRule from "../logic/game/scoring/single-group-scoring-rule";
import MultipleGroupsScoringRule from "../logic/game/scoring/multiple-groups-scoring-rule";
import TriangleScoringRule from "../logic/game/scoring/triangle-scoring-rule";
import RunScoringRule from "../logic/game/scoring/run-scoring-rule";

test("Calculates correct with predicate", () => {
    const rule = new PredicateScoringRule("even", (v) => v % 2 === 0);
    expect(rule.calculateScore([1, 2, 3, 4, 5, 6])).toBe(12);
});

test("Calculates doubles", () => {
    const rule = new MultipleGroupsScoringRule("doubles", 2);
    expect(rule.calculateScore([2, 2, 4, 4, 6, 6])).toBe(24);
});

test("Calculates triples", () => {
    const rule = new MultipleGroupsScoringRule("triples", 3);
    expect(rule.calculateScore([1, 1, 1, 3, 3, 3])).toBe(12);
});

test("Calculates duplicate doubles", () => {
    const rule = new MultipleGroupsScoringRule("doubles", 2);
    expect(rule.calculateScore([2, 2, 2, 2, 6, 6])).toBe(20);
});

test("Calculates incorrect doubles", () => {
    const rule = new MultipleGroupsScoringRule("doubles", 2);
    expect(rule.calculateScore([2, 2, 3, 4, 6, 6])).toBe(0);
});

test("Calculates small triangle", () => {
    const rule = new TriangleScoringRule("smallTriangle", "small");
    expect(rule.calculateScore([2, 3, 4, 2, 3, 2])).toBe(16);
});

test("Calculates incorrect small triangle", () => {
    const rule = new TriangleScoringRule("smallTriangle", "small");
    expect(rule.calculateScore([2, 3, 4, 2, 3, 6])).toBe(0);
});

test("Calculates large triangle", () => {
    const rule = new TriangleScoringRule("largeTriangle", "large");
    expect(rule.calculateScore([4, 5, 6, 5, 6, 6])).toBe(32);
});

test("Calculates incorrect large triangle", () => {
    const rule = new TriangleScoringRule("largeTriangle", "large");
    expect(rule.calculateScore([3, 5, 6, 5, 6, 6])).toBe(0);
});

test("Calculates run", () => {
    const rule = new RunScoringRule("run");
    expect(rule.calculateScore([2, 4, 5, 1, 6, 3])).toBe(21);
});

test("Calculates incorrect run", () => {
    const rule = new RunScoringRule("run");
    expect(rule.calculateScore([2, 3, 4, 3, 1, 6])).toBe(0);
});

test("Calculates single group", () => {
    const rule = new SingleGroupScoringRule("poker", 5);
    expect(rule.calculateScore([4, 4, 4, 4, 6, 4])).toBe(20);
});

test("Calculates single group with more", () => {
    const rule = new SingleGroupScoringRule("poker", 5);
    expect(rule.calculateScore([2, 2, 2, 2, 2, 2])).toBe(10);
});

test("Calculates incorrect single group", () => {
    const rule = new SingleGroupScoringRule("poker", 6);
    expect(rule.calculateScore([4, 4, 4, 4, 6, 4])).toBe(0);
});
