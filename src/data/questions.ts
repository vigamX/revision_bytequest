import type { Question } from '../types'

/**
 * Starter question bank for ByteQuest.
 *
 * Questions are written in OCR J277 mark-scheme language. Every topic has at
 * least two questions so each zone is playable. Add more by appending objects
 * to this array — the rest of the app picks them up automatically.
 *
 * Authoring convention: the correct option is listed at `answerIndex`. The UI
 * shuffles options at runtime (see lib/quiz.ts), so position is not a giveaway.
 */
export const QUESTIONS: Question[] = [
  // ── 1.1 Systems architecture ──────────────────────────────────────────────
  {
    id: 'q-1.1-1',
    topicId: '1.1',
    type: 'mcq',
    prompt:
      'Which register holds the address of the next instruction to be fetched in the fetch–execute cycle?',
    options: [
      'The Program Counter (PC)',
      'The Accumulator (ACC)',
      'The Memory Data Register (MDR)',
      'The Memory Address Register (MAR)',
    ],
    answerIndex: 0,
    explanation:
      'The Program Counter (PC) holds the address of the next instruction. During fetch its value is copied to the MAR, then the PC is incremented ready for the next cycle.',
    difficulty: 2,
  },
  {
    id: 'q-1.1-2',
    topicId: '1.1',
    type: 'mcq',
    prompt: 'What is the role of the Arithmetic Logic Unit (ALU)?',
    options: [
      'To carry out arithmetic calculations and logical comparisons',
      'To decode and coordinate the execution of instructions',
      'To permanently store the operating system',
      'To connect the CPU to external peripherals',
    ],
    answerIndex: 0,
    explanation:
      'The ALU performs all arithmetic (e.g. add, subtract) and logic operations (e.g. AND, comparisons). The Control Unit coordinates execution; registers temporarily hold data.',
    difficulty: 1,
  },
  {
    id: 'q-1.1-3',
    topicId: '1.1',
    type: 'mcq',
    prompt: 'Which of these is the best example of an embedded system?',
    options: [
      'The microcontroller inside a washing machine',
      'A desktop PC running Windows',
      'A cloud server hosting a website',
      'A laptop used for programming',
    ],
    answerIndex: 0,
    explanation:
      'An embedded system is a computer built into a larger device to perform one dedicated task — like the controller in a washing machine. General-purpose computers run many different programs.',
    difficulty: 2,
  },
  {
    id: 'q-1.1-4',
    topicId: '1.1',
    type: 'mcq',
    prompt:
      'Increasing the amount of cache memory in a CPU usually improves performance because cache…',
    options: [
      'stores frequently used instructions and data close to the CPU',
      'increases the clock speed of the processor',
      'adds more cores to the processor',
      'permanently stores the operating system',
    ],
    answerIndex: 0,
    explanation:
      'Cache is small, very fast memory holding frequently used data/instructions near the CPU, reducing time spent fetching from slower RAM.',
    difficulty: 2,
  },

  // ── 1.2 Memory and storage ────────────────────────────────────────────────
  {
    id: 'q-1.2-1',
    topicId: '1.2',
    type: 'mcq',
    prompt: 'What is the denary value of the 8-bit binary number 10110010?',
    options: ['178', '166', '174', '210'],
    answerIndex: 0,
    explanation: '10110010 = 128 + 32 + 16 + 2 = 178.',
    difficulty: 2,
  },
  {
    id: 'q-1.2-2',
    topicId: '1.2',
    type: 'mcq',
    prompt:
      'Which type of memory is volatile, meaning its contents are lost when power is removed?',
    options: [
      'RAM',
      'ROM',
      'A solid state drive (SSD)',
      'A magnetic hard disk (HDD)',
    ],
    answerIndex: 0,
    explanation:
      'RAM is volatile — it loses its contents when powered off. ROM and secondary storage (SSD/HDD) are non-volatile.',
    difficulty: 1,
  },
  {
    id: 'q-1.2-3',
    topicId: '1.2',
    type: 'mcq',
    prompt: 'What is the 8-bit binary number 11111111 in hexadecimal?',
    options: ['FF', 'F0', 'EF', 'FE'],
    answerIndex: 0,
    explanation:
      '11111111 splits into the nibbles 1111 1111. Each 1111 = 15 = F, so the value is FF.',
    difficulty: 2,
  },
  {
    id: 'q-1.2-4',
    topicId: '1.2',
    type: 'mcq',
    prompt: 'How many bits are there in one byte?',
    options: ['8', '4', '16', '1024'],
    answerIndex: 0,
    explanation: '1 byte = 8 bits. (1 nibble = 4 bits; 1024 bytes = 1 kibibyte.)',
    difficulty: 1,
  },

  // ── 1.3 Networks & protocols ──────────────────────────────────────────────
  {
    id: 'q-1.3-1',
    topicId: '1.3',
    type: 'mcq',
    prompt:
      'A network covering a small geographical area, such as a single school site, is best described as a…',
    options: [
      'LAN (Local Area Network)',
      'WAN (Wide Area Network)',
      'PAN spanning continents',
      'VPN tunnel',
    ],
    answerIndex: 0,
    explanation:
      'A LAN covers a small area (one site) and is usually owned by the organisation. A WAN connects LANs over large distances, e.g. the internet.',
    difficulty: 1,
  },
  {
    id: 'q-1.3-2',
    topicId: '1.3',
    type: 'mcq',
    prompt: 'Which protocol is used to send email between mail servers?',
    options: ['SMTP', 'HTTP', 'FTP', 'IMAP'],
    answerIndex: 0,
    explanation:
      'SMTP (Simple Mail Transfer Protocol) sends email. IMAP/POP retrieve it, HTTP transfers web pages, and FTP transfers files.',
    difficulty: 2,
  },
  {
    id: 'q-1.3-3',
    topicId: '1.3',
    type: 'mcq',
    prompt: 'In a star topology, how are the devices connected?',
    options: [
      'Each device has its own connection to a central switch',
      'Each device connects to the next, forming a single ring',
      'All devices share one backbone cable',
      'Every device connects directly to every other device',
    ],
    answerIndex: 0,
    explanation:
      'In a star topology every device has its own cable to a central switch. If one cable fails, only that device is affected.',
    difficulty: 2,
  },

  // ── 1.4 Network security ──────────────────────────────────────────────────
  {
    id: 'q-1.4-1',
    topicId: '1.4',
    type: 'mcq',
    prompt:
      'Repeatedly trying many password combinations until the correct one is found is known as a…',
    options: [
      'brute force attack',
      'denial of service (DoS) attack',
      'phishing attack',
      'SQL injection',
    ],
    answerIndex: 0,
    explanation:
      'A brute force attack systematically tries password combinations. Strong passwords and account lockouts help defend against it.',
    difficulty: 2,
  },
  {
    id: 'q-1.4-2',
    topicId: '1.4',
    type: 'mcq',
    prompt:
      'Phishing, where fake emails trick users into revealing personal details, is an example of…',
    options: ['social engineering', 'malware', 'a firewall', 'encryption'],
    answerIndex: 0,
    explanation:
      'Phishing exploits people rather than technology, so it is a form of social engineering.',
    difficulty: 2,
  },
  {
    id: 'q-1.4-3',
    topicId: '1.4',
    type: 'mcq',
    prompt:
      'Entering malicious SQL into a website input box to access or damage a database is called…',
    options: [
      'SQL injection',
      'penetration testing',
      'a brute force attack',
      'data interception',
    ],
    answerIndex: 0,
    explanation:
      'SQL injection enters SQL commands through inputs. Validating inputs and using parameterised queries helps prevent it.',
    difficulty: 3,
  },

  // ── 1.5 Systems software ──────────────────────────────────────────────────
  {
    id: 'q-1.5-1',
    topicId: '1.5',
    type: 'mcq',
    prompt: 'Which of the following is a function of an operating system?',
    options: [
      'Managing memory and running processes',
      'Compiling source code into machine code',
      'Designing the layout of a web page',
      'Acting as a spreadsheet',
    ],
    answerIndex: 0,
    explanation:
      'Operating systems manage memory, processes, peripherals, files and users. Compiling is done by a translator, not the OS.',
    difficulty: 2,
  },
  {
    id: 'q-1.5-2',
    topicId: '1.5',
    type: 'mcq',
    prompt:
      'Disk defragmentation software, which reorganises files on a hard disk, is an example of…',
    options: [
      'utility software',
      'an operating system',
      'application software',
      'a high-level language',
    ],
    answerIndex: 0,
    explanation:
      'Defragmentation is utility (system) software that maintains the computer. Other utilities include compression and backup tools.',
    difficulty: 1,
  },

  // ── 1.6 Ethical, legal & environmental ────────────────────────────────────
  {
    id: 'q-1.6-1',
    topicId: '1.6',
    type: 'mcq',
    prompt:
      'Which UK law makes it illegal to gain unauthorised access to computer material (e.g. hacking)?',
    options: [
      'The Computer Misuse Act 1990',
      'The Data Protection Act 2018',
      'The Copyright, Designs and Patents Act 1988',
      'The Health and Safety at Work Act 1974',
    ],
    answerIndex: 0,
    explanation:
      'The Computer Misuse Act 1990 covers unauthorised access and modification. The Data Protection Act covers personal data; Copyright covers original works.',
    difficulty: 2,
  },
  {
    id: 'q-1.6-2',
    topicId: '1.6',
    type: 'mcq',
    prompt:
      "Disposing of old computers as 'e-waste' that can leak toxic materials is mainly which type of impact?",
    options: ['Environmental', 'Cultural', 'Legal', 'Privacy'],
    answerIndex: 0,
    explanation:
      'E-waste and high energy use are environmental impacts of digital technology.',
    difficulty: 1,
  },

  // ── 2.1 Algorithms ────────────────────────────────────────────────────────
  {
    id: 'q-2.1-1',
    topicId: '2.1',
    type: 'mcq',
    prompt: 'A binary search can only be used on a list that is…',
    options: [
      'sorted into order',
      'stored in a 2D array',
      'fewer than 10 items long',
      'made only of strings',
    ],
    answerIndex: 0,
    explanation:
      'Binary search repeatedly halves a sorted list. If the data is unsorted you must use a linear search (or sort it first).',
    difficulty: 2,
  },
  {
    id: 'q-2.1-2',
    topicId: '2.1',
    type: 'mcq',
    prompt:
      'Which algorithm repeatedly compares adjacent pairs of items and swaps them if they are in the wrong order?',
    options: ['Bubble sort', 'Merge sort', 'Insertion sort', 'Binary search'],
    answerIndex: 0,
    explanation:
      "Bubble sort compares adjacent items and 'bubbles' larger values towards the end on each pass.",
    difficulty: 2,
  },
  {
    id: 'q-2.1-3',
    topicId: '2.1',
    type: 'mcq',
    prompt:
      'Breaking a large problem down into smaller, more manageable sub-problems is known as…',
    options: ['decomposition', 'abstraction', 'iteration', 'validation'],
    answerIndex: 0,
    explanation:
      'Decomposition breaks a problem into smaller parts. Abstraction, by contrast, removes unnecessary detail.',
    difficulty: 1,
  },
  {
    id: 'q-2.1-4',
    topicId: '2.1',
    type: 'mcq',
    prompt:
      'Removing or hiding unnecessary detail to focus on the important parts of a problem is called…',
    options: ['abstraction', 'decomposition', 'sequencing', 'authentication'],
    answerIndex: 0,
    explanation:
      'Abstraction hides unnecessary detail (e.g. a map shows roads but not every building).',
    difficulty: 2,
  },

  // ── 2.2 Programming fundamentals ──────────────────────────────────────────
  {
    id: 'q-2.2-1',
    topicId: '2.2',
    type: 'mcq',
    prompt:
      'Which data type is most appropriate to store whether a light is on or off?',
    options: ['Boolean', 'Integer', 'Real', 'String'],
    answerIndex: 0,
    explanation:
      'A Boolean stores one of two values (True/False), ideal for on/off states.',
    difficulty: 1,
  },
  {
    id: 'q-2.2-2',
    topicId: '2.2',
    type: 'mcq',
    prompt: 'In OCR pseudocode, what is the result of 17 MOD 5?',
    options: ['2', '3', '12', '85'],
    answerIndex: 0,
    explanation:
      'MOD gives the remainder after division. 17 ÷ 5 = 3 remainder 2, so 17 MOD 5 = 2. (17 DIV 5 would give 3.)',
    difficulty: 2,
  },
  {
    id: 'q-2.2-3',
    topicId: '2.2',
    type: 'mcq',
    prompt:
      'In OCR Exam Reference Language, the first element of an array has the index…',
    options: ['0', '1', '-1', "the array's length"],
    answerIndex: 0,
    explanation:
      'OCR arrays are zero-indexed, so the first element is at index 0 and the last is at index length − 1.',
    difficulty: 2,
  },

  // ── 2.3 Producing robust programs ─────────────────────────────────────────
  {
    id: 'q-2.3-1',
    topicId: '2.3',
    type: 'mcq',
    prompt:
      'Checking that a number entered is between 1 and 100 before using it is an example of…',
    options: [
      'a range check',
      'a presence check',
      'a format check',
      'a checksum',
    ],
    answerIndex: 0,
    explanation:
      'A range check ensures data is within sensible limits. A presence check ensures something was entered; a format check ensures the right pattern.',
    difficulty: 2,
  },
  {
    id: 'q-2.3-2',
    topicId: '2.3',
    type: 'mcq',
    prompt:
      'Testing a program using values right at the limits of what is allowed (e.g. 0 and 100 for a 0–100 field) is called…',
    options: [
      'boundary testing',
      'normal testing',
      'erroneous testing',
      'alpha testing',
    ],
    answerIndex: 0,
    explanation:
      'Boundary data sits on the edges of the valid range, where errors are most likely. Erroneous data is invalid data that should be rejected.',
    difficulty: 3,
  },

  // ── 2.4 Boolean logic ─────────────────────────────────────────────────────
  {
    id: 'q-2.4-1',
    topicId: '2.4',
    type: 'mcq',
    prompt: 'The output of a two-input AND gate is 1 (true) only when…',
    options: [
      'both inputs are 1',
      'at least one input is 1',
      'both inputs are 0',
      'the two inputs are different',
    ],
    answerIndex: 0,
    explanation:
      'AND outputs 1 only if every input is 1. (OR outputs 1 if at least one input is 1.)',
    difficulty: 1,
  },
  {
    id: 'q-2.4-2',
    topicId: '2.4',
    type: 'mcq',
    prompt: 'What is the output of the expression NOT 0?',
    options: ['1', '0', 'Undefined', '2'],
    answerIndex: 0,
    explanation: 'NOT inverts the input, so NOT 0 = 1 and NOT 1 = 0.',
    difficulty: 1,
  },
  {
    id: 'q-2.4-3',
    topicId: '2.4',
    type: 'mcq',
    prompt: 'Which logic gate outputs 1 when at least one of its inputs is 1?',
    options: ['OR', 'AND', 'NOT', 'NONE'],
    answerIndex: 0,
    explanation:
      'An OR gate outputs 1 if one or more inputs are 1; it only outputs 0 when all inputs are 0.',
    difficulty: 2,
  },

  // ── 2.5 Languages & IDEs ──────────────────────────────────────────────────
  {
    id: 'q-2.5-1',
    topicId: '2.5',
    type: 'mcq',
    prompt:
      'A translator that converts a whole high-level program into machine code in one go, before it runs, is a…',
    options: ['compiler', 'interpreter', 'assembler', 'linker'],
    answerIndex: 0,
    explanation:
      'A compiler translates the entire program at once, producing an executable. An interpreter translates and runs it line by line.',
    difficulty: 2,
  },
  {
    id: 'q-2.5-2',
    topicId: '2.5',
    type: 'mcq',
    prompt:
      'Which is an advantage of a high-level language compared with a low-level language?',
    options: [
      'It is easier for humans to read and write',
      'It always runs faster',
      'It controls the hardware directly',
      'It never needs translating',
    ],
    answerIndex: 0,
    explanation:
      'High-level languages are closer to human language, so they are easier to write and debug, but they must be translated to machine code.',
    difficulty: 2,
  },
  {
    id: 'q-2.5-3',
    topicId: '2.5',
    type: 'mcq',
    prompt:
      'Which feature of an IDE highlights keywords in different colours to make code easier to read?',
    options: [
      'Syntax highlighting',
      'A breakpoint',
      'A compiler',
      'Auto-save',
    ],
    answerIndex: 0,
    explanation:
      'Syntax highlighting colours different parts of the code (keywords, strings) to aid readability. Breakpoints pause execution for debugging.',
    difficulty: 1,
  },
]
