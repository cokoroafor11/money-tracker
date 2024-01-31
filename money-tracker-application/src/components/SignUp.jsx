import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import '../styles/Auth.css';

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMSG = error.message;
            console.log(errorCode,errorMSG);
        })
    }
    return (
        <div className="auth-body">
            <div>                
                <h1> BudgetApp </h1>                                                                            
                <form>                                                                                        
                    <div className = "form-section">
                        <input
                            type="email"
                            label="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                    
                            placeholder="Email address"                                
                        />
                    </div>

                    <div className = "form-section">
                        <input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"              
                        />
                    </div>                                             
                    
                    <button
                        type="submit" 
                        onClick={submit}                        
                    >  
                        Sign up                                
                    </button>
                                                                
                </form>
            
                <p>
                    Already have an account?{' '}
                    <NavLink to="/login" >
                        Log In
                    </NavLink>
                </p>                   
            </div>
        </div>   
    )
}

export default SignUp; 