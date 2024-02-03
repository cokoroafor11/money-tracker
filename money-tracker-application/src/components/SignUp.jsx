import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import '../styles/Auth.css';

function SignUp() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [first,setFirst] = useState('');
    const [last,setLast] = useState('');
    const [errorFlag,setErrorFlag] = useState('');

    async function submit(e) {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
        }).catch((error) => {
            const errorCode = error.code;
            const errorMSG = error.message;
            if(errorCode === 'auth/wrong-password' || errorCode === "auth/user-not-found" || errorCode === "auth/invalid-credential") {
                setErrorFlag('Incorrect username or password. Try again.')
            }
            console.log(errorCode,errorMSG);
        })
    }
    return (
        <div className="auth-body">
            <div>                
                <h1> Budget App </h1>                                                                            
                <form>
                    <div className = "form-section">
                        <label htmlFor="first">
                            *First Name
                        </label>
                        <input
                            type="text"
                            label="first"
                            value={email}
                            onChange={(e) => setFirst(e.target.value)}  
                            required                                    
                            placeholder="John"                                
                        />
                    </div>

                    <div className = "form-section">
                        <label htmlFor="last">
                            *Last Name
                        </label>
                        <input
                            type="text"
                            label="last"
                            value={email}
                            onChange={(e) => setLast(e.target.value)}  
                            required                                    
                            placeholder="Doe"                                
                        />
                    </div>
                                                                                        
                    <div className = "form-section">
                        <label htmlFor="last">
                            *Email
                        </label>
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
                        <label htmlFor="last">
                            *Password
                        </label>
                        <input
                            type="password"
                            label="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"              
                        />
                    </div>                                             
                    {errorFlag ? (<p className="error">{errorFlag}</p>) :null} 
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