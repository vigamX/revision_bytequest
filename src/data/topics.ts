import type { Paper, Topic } from '../types'

/**
 * The two OCR GCSE Computer Science (J277) exam papers, modelled as "realms".
 */
export const PAPERS: Paper[] = [
  {
    id: 'paper1',
    code: 'J277/01',
    name: 'Computer Systems',
    blurb:
      'How computers are built and connected — hardware, networks, security, software and the wider impact of technology.',
    theme: 'cyan',
    topicIds: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  },
  {
    id: 'paper2',
    code: 'J277/02',
    name: 'Computational Thinking, Algorithms & Programming',
    blurb:
      'Solving problems with algorithms, writing robust programs, and reasoning with Boolean logic.',
    theme: 'violet',
    topicIds: ['2.1', '2.2', '2.3', '2.4', '2.5'],
  },
]

/**
 * Topic "zones", one per OCR J277 specification sub-section.
 */
export const TOPICS: Topic[] = [
  // Paper 1 — Computer Systems
  {
    id: '1.1',
    paperId: 'paper1',
    name: 'Systems architecture',
    summary:
      'The CPU, Von Neumann architecture, registers, the fetch–execute cycle, performance factors and embedded systems.',
    icon: '🧠',
  },
  {
    id: '1.2',
    paperId: 'paper1',
    name: 'Memory and storage',
    summary:
      'RAM, ROM, virtual memory, secondary storage, units and data representation (binary, hex, characters, images, sound, compression).',
    icon: '💾',
  },
  {
    id: '1.3',
    paperId: 'paper1',
    name: 'Networks & protocols',
    summary:
      'LANs, WANs, network hardware, topologies, the internet, protocols and the 4-layer model.',
    icon: '🌐',
  },
  {
    id: '1.4',
    paperId: 'paper1',
    name: 'Network security',
    summary:
      'Threats such as malware and social engineering, and the methods used to prevent and detect them.',
    icon: '🛡️',
  },
  {
    id: '1.5',
    paperId: 'paper1',
    name: 'Systems software',
    summary:
      'The role of the operating system and the purpose of common utility software.',
    icon: '⚙️',
  },
  {
    id: '1.6',
    paperId: 'paper1',
    name: 'Ethical, legal & environmental',
    summary:
      'The ethical, legal, cultural and environmental impacts of digital technology, and relevant legislation.',
    icon: '⚖️',
  },
  // Paper 2 — Computational thinking, algorithms & programming
  {
    id: '2.1',
    paperId: 'paper2',
    name: 'Algorithms',
    summary:
      'Computational thinking, flowcharts and pseudocode, trace tables, and search & sort algorithms.',
    icon: '🧩',
  },
  {
    id: '2.2',
    paperId: 'paper2',
    name: 'Programming fundamentals',
    summary:
      'Variables, operators, the three programming constructs, data types, arrays, string handling, SQL and subprograms.',
    icon: '⌨️',
  },
  {
    id: '2.3',
    paperId: 'paper2',
    name: 'Producing robust programs',
    summary:
      'Defensive design, input validation, authentication, and the different types of program testing.',
    icon: '🧪',
  },
  {
    id: '2.4',
    paperId: 'paper2',
    name: 'Boolean logic',
    summary:
      'AND, OR and NOT, logic gate diagrams and completing truth tables.',
    icon: '🔌',
  },
  {
    id: '2.5',
    paperId: 'paper2',
    name: 'Languages & IDEs',
    summary:
      'High- and low-level languages, translators (compiler / interpreter / assembler) and the tools in an IDE.',
    icon: '🛠️',
  },
]

export const TOPICS_BY_ID: Record<string, Topic> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
)

export const PAPERS_BY_ID: Record<string, Paper> = Object.fromEntries(
  PAPERS.map((p) => [p.id, p]),
)
