import { motion } from "framer-motion";

export const Instagram = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7C0 3.13401 3.13401 0 7 0H25C28.866 0 32 3.13401 32 7V25C32 28.866 28.866 32 25 32H7C3.13401 32 0 28.866 0 25V7ZM16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24ZM26 8C27.1046 8 28 7.10457 28 6C28 4.89543 27.1046 4 26 4C24.8954 4 24 4.89543 24 6C24 7.10457 24.8954 8 26 8Z"
        fill="var(--color-black)"
      />
    </svg>
  );
};

export const LinkIcon = () => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0581 10.9413C13.9659 9.84959 12.485 9.23633 10.9408 9.23633C9.39655 9.23633 7.91556 9.84959 6.82342 10.9413L2.70475 15.0586C1.61259 16.1508 0.999023 17.6321 0.999023 19.1766C0.999023 20.7212 1.61259 22.2025 2.70475 23.2946C3.79692 24.3868 5.2782 25.0003 6.82275 25.0003C8.3673 25.0003 9.84859 24.3868 10.9408 23.2946L12.9994 21.2359"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9414 15.0583C12.0335 16.15 13.5145 16.7633 15.0587 16.7633C16.6029 16.7633 18.0839 16.15 19.1761 15.0583L23.2947 10.941C24.3869 9.84884 25.0005 8.36755 25.0005 6.823C25.0005 5.27845 24.3869 3.79716 23.2947 2.705C22.2026 1.61284 20.7213 0.999268 19.1767 0.999268C17.6322 0.999268 16.1509 1.61284 15.0587 2.705L13.0001 4.76367"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const CartIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7H18.79C19.0694 7.00001 19.3457 7.05857 19.6011 7.17191C19.8565 7.28524 20.0854 7.45083 20.2729 7.65801C20.4603 7.86519 20.6023 8.10936 20.6897 8.37478C20.777 8.64019 20.8078 8.92097 20.78 9.199L20.18 15.199C20.1307 15.6925 19.8997 16.1501 19.532 16.4829C19.1642 16.8157 18.686 17 18.19 17H8.64C8.17747 17.0002 7.72918 16.84 7.37144 16.5469C7.01371 16.2537 6.76866 15.8456 6.678 15.392L5 7Z"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5 7L4.19 3.757C4.13583 3.54075 4.01095 3.34881 3.83521 3.21166C3.65946 3.0745 3.44293 3.00001 3.22 3H2M8 21H10M16 21H18"
        stroke="var(--color-black)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const LightDarkButton = ({ darkTheme }) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13.5"
        cy="13.5"
        r="5.5"
        fill={darkTheme ? "var(--color-black)" : "none"}
      />
      <path
        d="M13.5 17.1818C14.5227 17.1818 15.392 16.8239 16.108 16.108C16.8239 15.392 17.1818 14.5227 17.1818 13.5C17.1818 12.4773 16.8239 11.608 16.108 10.892C15.392 10.1761 14.5227 9.81818 13.5 9.81818C12.4773 9.81818 11.608 10.1761 10.892 10.892C10.1761 11.608 9.81818 12.4773 9.81818 13.5C9.81818 14.5227 10.1761 15.392 10.892 16.108C11.608 16.8239 12.4773 17.1818 13.5 17.1818ZM13.5 19.6364C11.8023 19.6364 10.3553 19.0379 9.15914 17.8409C7.96214 16.6447 7.36364 15.1977 7.36364 13.5C7.36364 11.8023 7.96214 10.3549 9.15914 9.15791C10.3553 7.96173 11.8023 7.36364 13.5 7.36364C15.1977 7.36364 16.6451 7.96173 17.8421 9.15791C19.0383 10.3549 19.6364 11.8023 19.6364 13.5C19.6364 15.1977 19.0383 16.6447 17.8421 17.8409C16.6451 19.0379 15.1977 19.6364 13.5 19.6364ZM1.22727 14.7273C0.879545 14.7273 0.588273 14.6095 0.353455 14.3738C0.117818 14.139 0 13.8477 0 13.5C0 13.1523 0.117818 12.8606 0.353455 12.625C0.588273 12.3901 0.879545 12.2727 1.22727 12.2727H3.68182C4.02955 12.2727 4.32123 12.3901 4.55686 12.625C4.79168 12.8606 4.90909 13.1523 4.90909 13.5C4.90909 13.8477 4.79168 14.139 4.55686 14.3738C4.32123 14.6095 4.02955 14.7273 3.68182 14.7273H1.22727ZM23.3182 14.7273C22.9705 14.7273 22.6792 14.6095 22.4444 14.3738C22.2087 14.139 22.0909 13.8477 22.0909 13.5C22.0909 13.1523 22.2087 12.8606 22.4444 12.625C22.6792 12.3901 22.9705 12.2727 23.3182 12.2727H25.7727C26.1205 12.2727 26.4117 12.3901 26.6465 12.625C26.8822 12.8606 27 13.1523 27 13.5C27 13.8477 26.8822 14.139 26.6465 14.3738C26.4117 14.6095 26.1205 14.7273 25.7727 14.7273H23.3182ZM13.5 4.90909C13.1523 4.90909 12.861 4.79127 12.6262 4.55564C12.3905 4.32082 12.2727 4.02955 12.2727 3.68182V1.22727C12.2727 0.879545 12.3905 0.587864 12.6262 0.352227C12.861 0.117409 13.1523 0 13.5 0C13.8477 0 14.1394 0.117409 14.375 0.352227C14.6099 0.587864 14.7273 0.879545 14.7273 1.22727V3.68182C14.7273 4.02955 14.6099 4.32082 14.375 4.55564C14.1394 4.79127 13.8477 4.90909 13.5 4.90909ZM13.5 27C13.1523 27 12.861 26.8822 12.6262 26.6465C12.3905 26.4117 12.2727 26.1205 12.2727 25.7727V23.3182C12.2727 22.9705 12.3905 22.6792 12.6262 22.4444C12.861 22.2087 13.1523 22.0909 13.5 22.0909C13.8477 22.0909 14.1394 22.2087 14.375 22.4444C14.6099 22.6792 14.7273 22.9705 14.7273 23.3182V25.7727C14.7273 26.1205 14.6099 26.4117 14.375 26.6465C14.1394 26.8822 13.8477 27 13.5 27ZM5.70682 7.425L4.3875 6.13636C4.14205 5.91136 4.02423 5.625 4.03405 5.27727C4.04468 4.92955 4.1625 4.63295 4.3875 4.3875C4.63295 4.14205 4.92955 4.01932 5.27727 4.01932C5.625 4.01932 5.91136 4.14205 6.13636 4.3875L7.425 5.70682C7.65 5.95227 7.7625 6.23864 7.7625 6.56591C7.7625 6.89318 7.65 7.17955 7.425 7.425C7.2 7.67045 6.91895 7.78786 6.58186 7.77723C6.24395 7.76741 5.95227 7.65 5.70682 7.425V7.425ZM20.8636 22.6125L19.575 21.2932C19.35 21.0477 19.2375 20.7565 19.2375 20.4194C19.2375 20.0815 19.35 19.8 19.575 19.575C19.8 19.3295 20.0815 19.2121 20.4194 19.2228C20.7565 19.2326 21.0477 19.35 21.2932 19.575L22.6125 20.8636C22.858 21.0886 22.9758 21.375 22.966 21.7227C22.9553 22.0705 22.8375 22.367 22.6125 22.6125C22.367 22.858 22.0705 22.9807 21.7227 22.9807C21.375 22.9807 21.0886 22.858 20.8636 22.6125ZM19.575 7.425C19.3295 7.2 19.2121 6.91855 19.2228 6.58064C19.2326 6.24355 19.35 5.95227 19.575 5.70682L20.8636 4.3875C21.0886 4.14205 21.375 4.02423 21.7227 4.03405C22.0705 4.04468 22.367 4.1625 22.6125 4.3875C22.858 4.63295 22.9807 4.92955 22.9807 5.27727C22.9807 5.625 22.858 5.91136 22.6125 6.13636L21.2932 7.425C21.0477 7.65 20.7614 7.7625 20.4341 7.7625C20.1068 7.7625 19.8205 7.65 19.575 7.425V7.425ZM4.3875 22.6125C4.14205 22.367 4.01932 22.0705 4.01932 21.7227C4.01932 21.375 4.14205 21.0886 4.3875 20.8636L5.70682 19.575C5.95227 19.35 6.24395 19.2375 6.58186 19.2375C6.91895 19.2375 7.2 19.35 7.425 19.575C7.67045 19.8 7.78827 20.0815 7.77845 20.4194C7.76782 20.7565 7.65 21.0477 7.425 21.2932L6.13636 22.6125C5.91136 22.858 5.625 22.9754 5.27727 22.9647C4.92955 22.9549 4.63295 22.8375 4.3875 22.6125Z"
        fill="var(--color-black)"
      />
    </svg>
  );
};

export const Chevron = ({ open }) => {
  return (
    <motion.svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: 0 }}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{
        duration: 0.45,
        ease: [0.25, 0, 0.35, 1],
      }}
    >
      <path
        d="M10.7129 17.5872L21.0841 27.9583L31.4552 17.5872L30.1591 16.291L21.0841 25.366L12.0091 16.291L10.7129 17.5872Z"
        fill="var(--static-black"
      />
    </motion.svg>
  );
};

export const BookIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 8V24.47C0 24.47 6.4694 24.2243 14 28C21.5306 24.2243 28 24.47 28 24.47V8C28 8 20.3644 8 14 11.53C7.6356 8 0 8 0 8Z"
        fill="#8A8A8A"
        fillOpacity="0.2"
      />
      <path
        d="M14 8C16.2091 8 18 6.20914 18 4C18 1.79086 16.2091 0 14 0C11.7909 0 10 1.79086 10 4C10 6.20914 11.7909 8 14 8Z"
        fill="#8A8A8A"
        fillOpacity="0.2"
      />
    </svg>
  );
};
