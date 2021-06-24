import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory, NavLink } from 'react-router-dom'
import { FormikHelpers, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'

import { useAuth } from '../hoc/AuthProvider'
import { AuthRoutes } from '../global/routeDefs'
import SidemenuContainer from '../components/public/Sidemenu'
import { RegisterByInvitationMutationVariables, useRegisterByInvitationMutation } from '../graphql/hooks/graphql'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import ErrorSummary from '../components/form/ErrorSummary'

const initialValues: RegisterByInvitationMutationVariables = {
    email: "",
    password: "",
    username: "",
    invitationCode: ""
};

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(100),
    username: yup.string().required(),
    invitationCode: yup.string().required()
});

function Register() {
    const apolloClient = useApolloClient();
    const [register] = useRegisterByInvitationMutation();
    const { signIn } = useAuth();

    const [invalidApiResponse, setInvalidApiResponse] = useState<boolean>(false);
    const history = useHistory();

    const formik = useFormik<RegisterByInvitationMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
                values: RegisterByInvitationMutationVariables,
                { setSubmitting }: FormikHelpers<RegisterByInvitationMutationVariables>
            ) => {
                const response = await register({
                    variables: values
                });
                if (response && response.data?.registerByInvitation?.token) {
                    await apolloClient.resetStore();
                    signIn(response.data.registerByInvitation.token);
                    setSubmitting(false);
                    setInvalidApiResponse(false);
                    history.push(AuthRoutes.projects);
                }
                if (response && response.data?.registerByInvitation?.errors) {
                    setInvalidApiResponse(true);
                    console.log("REGISTRATION ERRORS: ", response.data?.registerByInvitation?.errors)
                }
            }
        });

    return (
        <SidemenuContainer heading={<h5>Welcome back! <br/> Sign in</h5>} >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    <InputField name="email" type="email" label="Email" />
                    <InputField name="password" type="password" label="Password" />
                    <InputField name="username" type="text" label="Username" />
                    <InputField name="invitationCode" type="text" label="Invitation code" />
                    <SubmitButton text="Join"/>
                    { invalidApiResponse && <ErrorSummary errorMessage="Invalid email address or invitation code" /> }
                </form>
               
            </FormikProvider>
            <div className="form-group">
                <small>
                    <p>Already have an account?</p>
                    <NavLink to="/login">Go back to Login</NavLink>
                </small>
            </div>
        </SidemenuContainer>
    );
}

export default Register;