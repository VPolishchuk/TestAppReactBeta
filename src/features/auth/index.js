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
            // app
            //   .auth()
            //   .signInWithEmailAndPassword(email, password);
            // props.history.push("/");
            const login = async () => {
              try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email, password);
                props.history.push("/");
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
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="email"
              />
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
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

// const Login = ({ history }) => {
//   const handleLogin = useCallback(
//     async event => {
//       event.preventDefault();
//       const { email, password } = event.target.elements;
//       try {
//         await app
//           .auth()
//           .signInWithEmailAndPassword(email.value, password.value);
//         history.push("/");
//       } catch (error) {
//         alert(error);
//       }
//     },
//     [history]
//   );

//   const { currentUser } = useContext(AuthContext);
//     // console.log('currentUser', currentUser)
//   if (currentUser) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div className='layout'> 
//       <form onSubmit={handleLogin}>
//         <p>Welcam</p>
//         <label>
//           Email
//           <input name="email" type="email" placeholder="Email" />
//         </label>
//         <label>
//           Password
//           <input name="password" type="password" placeholder="Password" />
//         </label>
//         <button type="submit">Log in</button>
//       </form>
//     </div>
//   );
// };

// export default Login;