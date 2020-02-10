import React, { useContext, } from 'react';
import { Formik } from 'formik';
import { Redirect } from "react-router";
// features
import app from "../../firebase-config";
import { AuthContext } from '../../firebase';
// ui
import './style.scss';
// ///////////////////////////////////////////////////////

const SingInForm = (props) => {
  const { history } = props;
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/"/>;
  }
  return (
    <div className='layout'>
      <Formik
        initialValues={{
          email: '',
          password: ''
      }}
        onSubmit={(values) => {
          const { email, password } = values;
            const login = async () => {
              try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email, password);
                history.push("/");
              } catch (error) {
                alert(error);
              }
            }
            login()
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <p>Welcam</p>
            <label>
              <input
                type="email"
                name="email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
              />
              {props.errors.name && <div>{props.errors.name}</div>}
            </label>
            <label>
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="password"
              />
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            </label>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
)};

export default SingInForm;
