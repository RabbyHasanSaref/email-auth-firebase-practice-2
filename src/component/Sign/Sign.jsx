import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";

const Sign = () => {
    const [createUser, setCreateUser] = useState();
    const [userError, setUseError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // console.log(createUser)
    // console.log(userError)

    const auth = getAuth(app);
    const handleCreateUser = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const checkbox = e.target.checkbox.checked
        console.log(name, email, password);

        if (password.length < 6) {
            setUseError('Password should be at least 6 characters');
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setUseError('Your password must contain at least one uppercase letter');
            return;
        }
        if (!checkbox) {
            setUseError('Please accept terms and condition');
            return;
        }

        // reset state error and succes 
        setCreateUser('');
        setUseError('');

        // create a user 
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                setCreateUser('Your sign-up successful');

                updateProfile(auth.currentUser, {
                    displayName: name
                })
                .then(()=>{
                    setCreateUser('Update Profile')
                })
                .catch(error => {
                    console.error(error)
                })
                
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert('Please check your email verification')
                })
            })
            .catch((error) => {
                console.error(error);
                setUseError('Email already use');
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleCreateUser} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <div className="absolute top-12 right-2 cursor-pointer">
                                <p onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Showe' : 'Hiden'}</p>
                            </div>
                            <label className="label">
                                <button href="#" className="label-text-alt link link-hover text-green-500"><Link to="/">already account create</Link></button>
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="checkbox" name="checkbox" /> Accept terms and condition
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign-up</button>
                        </div>

                        {
                            createUser && <p>{createUser}</p>
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

export default Sign;