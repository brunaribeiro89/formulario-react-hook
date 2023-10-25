const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "#c026d3" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "#ec4899",
};
const STATUS_TESTING = { id: 3, name: "Testing", color: "#2563eb" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "#2dd4bf" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
];

const DATA = [
  {
    task: "Add a New Feature",
    firstName: "João",
    lastName: "Pereira",
    status: STATUS_ON_DECK,
    due: new Date(),
    notes: "This is a note",
  },
  {
    task: "Write Integration Tests",
    firstName: "Paulo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Use Jest",
  },
  {
    task: "Add Instagram Integration",
    firstName: "Gabriel",
    lastName: "Pereira",
    status: STATUS_DEPLOYED,
    due: null,
    notes: "",
  },
  {
    task: "Cleanup Database",
    firstName: "Pedro",
    lastName: "Pereira",
    status: null,
    due: new Date(),
    notes: "Remove old data",
  },
  {
    task: "Refactor API Endpoints",
    firstName: "Camila",
    lastName: "Pereira",
    status: STATUS_TESTING,
    due: null,
    notes: "",
  },
  {
    task: "Add Documentation to API REST",
    firstName: "Junior",
    lastName: "Pereira",
    status: null,
    due: new Date(),
    notes: "Add JS Docs to all endpoints",
  },
  {
    task: "Update NPM Packages",
    firstName: "Gabriel",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update Packages",
    firstName: "Tiago",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React",
  },{
    task: "Update NPM Packages", 
    firstName: "Jhonata",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Paulo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Bruna",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },

  {
    task: "Update NPM Packages",
    firstName: "Carlos",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Daniel",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Guilherme",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Guilherme",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Joaquim",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Priscila",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Julio",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Maria",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Ricardo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Nicolas",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Leonardo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Pamela",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Nicolas",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Bernardo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },

  {
    task: "Update NPM Packages",
    firstName: "Philipp",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },

  {
    task: "Update NPM Packages",
    firstName: "Vinicíus",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },{
    task: "Update NPM Packages",
    firstName: "Junior",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },{
    task: "Update NPM Packages",
    firstName: "Lucio",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Luciana",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Marinete",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Maria",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Nicole",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Lucinda",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "kelly",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Cleber",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Cleiton",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Romario",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },

  {
    task: "Update NPM Packages",
    firstName: "Gustavo",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Priscila",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Daiane",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Cazé",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
  {
    task: "Update NPM Packages",
    firstName: "Vitória",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },{
    task: "Update NPM Packages",
    firstName: "Vicente",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },

  {
    task: "Update NPM Packages",
    firstName: "Vanessa",
    lastName: "Pereira",
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: "Upgrade React & Chakra UI",
  },
];

export default DATA;