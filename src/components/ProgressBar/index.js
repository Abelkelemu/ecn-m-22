import './styles.scss'
//UI
import { motion } from 'framer-motion';

const ProgressBar = ({percentage}) => {
    
    return ( 
        <motion.div className="progress-bar"
            initial={{width:0}}
            animate={{width:percentage+'%'}}
        >  
        </motion.div>
     );
}
 
export default ProgressBar;