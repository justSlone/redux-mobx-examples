import faker from "faker";
faker.seed(111);

export interface TreeState extends GraphNode {
  areas: Map<number, Area>;
  stories: Map<number, Story>;
  measures: Map<number, Measure>;
}

export interface Collapseable {
  collapsed: boolean;
}

export interface GraphNode {
  id: number,
  parentIds: number[],
  childIds: number[]
}

export interface Area extends Collapseable, GraphNode {
  name: string;
}

export interface Story extends Collapseable, GraphNode {
  title: string;
}

export interface Measure extends GraphNode {
  title: string;
  targets: Target[];
}

export interface Target {
  value: number;
  date: Date;
}

let areas = new Map<number, Area>();
let stories = new Map<number, Story>();
let measures = new Map<number, Measure>();

const makeId = () => {
  return faker.random.number({ min: 0, max: 100000 });
};

export interface Area extends Collapseable, GraphNode {
  name: string;
  id: number;
}

function addEmptyGraphNode<T>(node: T): T & GraphNode {
  return { ...node, parentIds: [], childIds: [], id: makeId() }
}

function addCollaspable<T>(node: T): T & Collapseable {
  return { ...node, collapsed: faker.random.boolean() }
}

export const makeEmptyArea = (): Area => (
  addCollaspable(
    addEmptyGraphNode({
      name: "Area: " + faker.lorem.sentence()
    })
  )
);

export const makeEmptyStory = (): Story => (
  addCollaspable(
    addEmptyGraphNode({
      title: "Story: " + faker.lorem.sentence()
    })
  )
);

export const makeEmptyMeasure = (): Measure => (
  addEmptyGraphNode({
    title: faker.lorem.sentence(),
    targets: [makeTarget()]
  })
);


// const makeArea = (): number => {
//   let newArea = {
//     storyIds: [makeStory(), makeStory()],
//     name: "Area: " + faker.lorem.sentence(),
//     id: makeId(),
//     collapsed: false
//   }
//   areas.set(newArea.id, newArea);
//   return newArea.id;
// };

// const makeStory = (): number => {
//   let newstory = {
//     measureIds: [makeMeasureAndId(), makeMeasureAndId()],
//     title: "Story: " + faker.lorem.sentence(),
//     id: makeId(),
//     collapsed: faker.random.boolean()
//   }
//   stories.set(newstory.id, newstory);
//   return newstory.id;
// };

// export const makeMeasure = (): Measure => ({
//   id: makeId(),
//   title: faker.lorem.sentence(),
//   targets: [makeTarget()]
// })

// const makeMeasureAndId = (): number => {
//   let newMeasure = makeMeasure();
//   measures.set(newMeasure.id, newMeasure);
//   return newMeasure.id;
// };

const makeTarget = (): Target => ({
  value: faker.random.number(5000),
  date: faker.date.future()
});

// export const initialState: TreeState = {
//   areas: areas,
//   stories: stories,
//   measures: measures,
//   areaIds: [makeArea(), makeArea()]
// };

export const initialState: TreeState = {
  areas: areas,
  stories: stories,
  measures: measures,
  parentIds: [],
  childIds: [],
  id: -1
};

