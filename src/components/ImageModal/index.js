import './styles.scss';

// UI
import { motion } from 'framer-motion';

const Modal = ({ hideModal, toggleModal, children }) => {

  if (hideModal) return null;
  
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      toggleModal();
    }
  }

  return (
      <motion.div className="backdrop" onClick={handleClick}
        initial={{opacity:0}}
        animate={{opacity:1}}
      >
          {children}
      </motion.div>
  )
}

export default Modal;

