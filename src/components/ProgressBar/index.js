import './styles.scss'

const ProgressBar = ({percentage}) => {
    
    console.log(percentage)
    return ( 
        <div className="progress-bar" style = {{width:percentage+'%'}}>
        
            
        </div>
     );
}
 
export default ProgressBar;