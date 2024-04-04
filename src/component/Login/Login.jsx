import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";

const Login = () => {
    const [userSign, setUserSign] = useState('');
    const [userError, setUserError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = getAuth(app);
    const handleSign = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked;
        // console.log(email, password, checkbox)

        if(password.length < 6) {
            setUserError('Password should be at least 6 characters');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setUserError('Your password must contain at least one uppercase letter');
            return;
        }
        if(!checkbox){
            setUserError('Please accept Remember and condition');
            return;
        }
       

        // reset input filed 
        setUserSign('')
        setUserError('')
        // sign user 
        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);                     
            if(result.user.emailVerified){
                setUserSign('Your Login successful');
            }   
            else{
                alert('Please check your email verification')
            }             
        })
        .catch(error => {
            console.error(error);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSign} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="password" className="input input-bordered" required />
                            <div className="absolute top-12 right-2 cursor-pointer"><p onClick={()=>setShowPassword(!showPassword)}>{showPassword ? 'Showe' : 'Hiden'}</p></div>
                            <label className="label">
                                <button href="#" className="label-text-alt link link-hover text-blue-500"><Link to="/forget">Forgot password?</Link></button>
                                <button href="#"  className="label-text-alt link link-hover text-green-500"><Link to="/sign">Create a account</Link></button>
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="checkbox" /> Remember
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        {
                            userSign && <p>{userSign}</p>
                        }
                        {
                            userError && <p>{userError}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;