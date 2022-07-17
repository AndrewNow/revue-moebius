import React from "react";
import { useInstantSearch } from "react-instantsearch-hooks-web";
import { motion } from "framer-motion";

export function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "easeInOut",
        duration: 0.25,
      }}
      exit={{ y: 20, opacity: 0 }}
    >
      <small
        style={{
          color: "var(--static-cream)",
          fontSize: "12px",
          margin: "2rem 0",
          display: "block",
          textAlign: "center",
        }}
      >
        Aucun résultat trouvé pour <q>{indexUiState.query}</q>.
      </small>
    </motion.div>
  );
}
