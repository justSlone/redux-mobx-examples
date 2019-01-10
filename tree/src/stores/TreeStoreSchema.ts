import faker from "faker";
faker.seed(111);

export interface TreeState {
  areas: Area[];
}

export interface Collapseable {
    collapsed: boolean;
}

export interface Area extends Collapseable {
  stories: Story[];
  name: string;
  id: number;
}

export interface Story extends Collapseable{
  measures: Measure[];
  title: string;
  id: number;
}

export interface Measure {
  id: number;
  title: string;
  targets: Target[];
}

export interface Target {
  value: number;
  date: Date;
}

const makeId = () => {
  return faker.random.number({ min: 0, max: 100000 });
};

const makeArea = (): Area => ({
  stories: [makeStory(), makeStory()],
  name: "Area: " + faker.lorem.sentence(),
  id: makeId(),
  collapsed: false
});

const makeStory = (): Story => ({
  measures: [makeMeasure(), makeMeasure()],
  title: "Story: " + faker.lorem.sentence(),
  id: makeId(),
  collapsed: faker.random.boolean()
});

export const makeMeasure = (): Measure => ({
  id: makeId(),
  title: faker.lorem.sentence(),
  targets: [makeTarget()]
});

const makeTarget = (): Target => ({
  value: faker.random.number(5000),
  date: faker.date.future()
});

export const initialState: TreeState = {
  areas: [makeArea(), makeArea()]
};
