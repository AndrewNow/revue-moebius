//.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.
//
//  Animation variants for title and text
//
//.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.

export const textAnim = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
  },
};
export const textAnimSlow = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const textAnimSlowDelayed = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: .6,
    },
  },
  hidden: {
    opacity: 0,
  },
};
export const textAnimSlower = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
};
export const textChild = {
  visible: {
    opacity: 1,
    transition: {
      duration: 1.25,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const textAnimFast = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.01,
    },
  },
  hidden: {
    opacity: 0,
  },
};
export const textAnimFastest = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.002,
    },
  },
  hidden: {
    opacity: 0,
  },
};

//.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.
//
//  Animation variants for grids
//
//.:*~*:._.:*~*:._.:*~*:._.:*~*.:*~*:._.

export const gridAnim = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const gridChild = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
  hidden: {
    y: 30,
    opacity: 0,
  },
};
