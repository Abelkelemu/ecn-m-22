import './styles.scss'
import { motion } from 'framer-motion';
const ProgressBar = ({percentage}) => {
    
    console.log(percentage)
    return ( 
        <motion.div className="progress-bar"
            initial={{width:0}}
            animate={{width:percentage+'%'}}
        >  
        </motion.div>
     );
}
 
export default ProgressBar;