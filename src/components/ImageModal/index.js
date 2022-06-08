import './styles.scss';
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

// [
//     <motion.div className="modalOverlay" onClick={() => toggleModal()} 
//         initial={{opacity:0}}
//         animate= {{opacity:1}}
//     />,
//     <div className="backdrop">
//         <div className="backdrop-modal">
//           {children}
//         </div>
//     </div>
//   ];