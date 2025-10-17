import { motion, AnimatePresence } from "framer-motion";

export default function VictoryPopup({ winner, onClose }) {
  return (
    <AnimatePresence>
      {winner && (
        <motion.div
          className="popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="popup-content bg-white rounded-2xl p-8 shadow-xl text-center"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">🏆 Победитель турнира!</h2>
            <img src={winner.url} alt="Winner meme" className="mx-auto rounded-xl" />
            <p className="mt-3 text-lg">Мем, набравший больше всех голосов!</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-xl">
              Закрыть
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
