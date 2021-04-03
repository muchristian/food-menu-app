import React, {useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';


const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email field is required!'),
    password: Yup.string()
      .required('Password field is required!')
  });
function Login(props) {
    const [error, setError] = useState("");
    const { currentUser, login } = useAuth();
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    async function onSubmit(values, actions) {
        try {
            console.log(values)
            await login(values.email,  values.password);
            history.push('/')
        } catch(err) {
            setError("Email or Password is incorrect!");
        }
    }

    useEffect(() => {
        currentUser && history.push('/');
        
        
      }, [currentUser]);
      setTimeout(() => {setLoading(false)}, 3000)
      if (loading) {
        return (
            <div id="preloader">
              <div id="status">
                  <div className="spinner"></div>
              </div>
          </div>
          )
      }
    setTimeout(() => {
        setError("");
      }, 3000);
    return (
        <div class="login-container">
        <div class="card login-form col-sm-12 col-md-6 col-lg-6">
	<div class="card-body">
		<h3 class="card-title text-center">Log in to Admin</h3>
		<div class="card-text">
                {
                    error ?
                <Alert variant="danger">
                    {error}
                </Alert>
                : null
                }
                
                
                    <Formik
                       initialValues={{ email: '', password: '' }}
                       validationSchema={LoginSchema}
                       onSubmit={onSubmit}
                     >
                        {props => (
                        <form onSubmit={props.handleSubmit}>
                            <div class="form-group">
					                <label for="exampleInputEmail1">Email address</label>
					                <input 
                                    type="email" 
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    name="email" 
                                    class="form-control form-control-sm" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp"/>
                                {props.touched.email && props.errors.email ? (
                                      <span className="help-block error">{props.errors.email}</span>
                                    ) : null}
                            </div>
                            <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
					            <input 
                                type="password" 
                                type="password" 
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                name="password"
                                class="form-control form-control-sm" 
                                id="exampleInputPassword1"/>
                                {props.touched.password && props.errors.password ? (
                                      <span className="help-block error">{props.errors.password}</span>
                                    ) : null}
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Sign in</button>
                        </form>
                        )}
                        </Formik>
                        </div>
	        </div>
    </div>
</div>
    );
}

export default Login;
