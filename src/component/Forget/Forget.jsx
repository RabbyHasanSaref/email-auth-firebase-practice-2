import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.config";

const Forget = () => {
    const auth = getAuth(app)
    const handleforget = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(email)
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email forget password')
        })
        .catch(error => {
            console.error(error)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleforget} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <label className="label">
                                <button href="#" className="label-text-alt link link-hover text-green-500"><Link to="/">Back</Link></button>
                            </label>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Forget</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Forget;