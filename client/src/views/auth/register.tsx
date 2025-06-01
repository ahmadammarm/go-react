/* eslint-disable @typescript-eslint/no-explicit-any */
// import FC from react
import { type FC, useState, type FormEvent } from 'react';

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useRegister from hooks
import { useRegister } from "../../hooks/auth/useRegister";

//interface for validation errors
interface ValidationErrors {
    [key: string]: string;
}

const Register: FC = () => {

    //initialize navigate
    const navigate = useNavigate();

    //initialize useRegister
    const { mutate, isPending} = useRegister();

    //define state
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //define state for errors
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Handle submit form
    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // Call the register mutation
        mutate({
            name,
            username,
            email,
            password
        }, {
            onSuccess: () => {

                // Redirect to login page
                navigate('/login');
            },
            onError: (error: any) => {

                //set errors to state "errors"
                setErrors(error.response.data.errors);
            }
        })

    }

    return (
        <div className="row justify-content-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 rounded-4 shadow-sm">
                        <div className="card-body">
                            <h4 className='fw-bold text-center'>REGISTER</h4>
                            <hr />
                            <form onSubmit={handleRegister}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Full Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                                                placeholder="Full Name" />
                                            {errors.Name && <div className="alert alert-danger mt-2 rounded-4">{errors.Name}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Username</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"
                                                placeholder="Username" />
                                            {errors.Username && <div className="alert alert-danger mt-2 rounded-4">{errors.Username}</div>}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Email address</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                                placeholder="Email Address" />
                                            {errors.Email && <div className="alert alert-danger mt-2 rounded-4">{errors.Email}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label className="mb-1 fw-bold">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"
                                                placeholder="Password" />
                                            {errors.Password && <div className="alert alert-danger mt-2 rounded-4">{errors.Password}</div>}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 rounded-4" disabled={isPending}>
                                    {isPending ? 'Loading...' : 'REGISTER'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;