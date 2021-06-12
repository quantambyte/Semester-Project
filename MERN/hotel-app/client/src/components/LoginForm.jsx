import React from 'react'

const LoginForm = ( { handleSubmit , email, setEmail , password , setPassword} ) => {
    return (
        <div>
            

            <form onSubmit = {handleSubmit} className = 'mt-5'>
                <div className="form-control mb-3">
 
                    <label className = 'form-label'>Enter Your Email</label>

                    <input 
                        type='email'  
                        className = 'form-control' placeholder = 'Enter Your Email'
                        value = {email}
                        onChange = { (e) => setEmail(e.target.value) }
                    />

                </div>

                <div className="form-control mb-3">
 
                    <label className = 'form-label'>Enter Your Password</label>

                    <input 
                        type='password'  
                        className = 'form-control' placeholder = 'Enter Your Email'
                        value = {password}
                        onChange = { (e) => setPassword(e.target.value) }
                    />

                </div>

                <button disabled = {!email || !password}
                 className="btn btn-primary"
                 type = 'submit'
                >Log In</button>

            </form>

        </div>
    )
}

export default LoginForm
