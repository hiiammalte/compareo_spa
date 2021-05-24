import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { FormikHelpers, FormikProvider, useFormik } from 'formik'
import * as yup from 'yup'

import { useAuth } from '../hoc/AuthProvider'
import { AuthRoutes } from '../global/routeDefs'
import SidemenuContainer from '../components/public/Sidemenu'
import { LoginMutationVariables, useLoginMutation } from '../graphql/hooks/graphql'
import InputField from '../components/form/InputField'
import SubmitButton from '../components/form/SubmitButton'
import CompactCheckbox from '../components/form/CompactCheckbox'
import ErrorSummary from '../components/form/ErrorSummary'

const initialValues: LoginMutationVariables = {
    email: "",
    password: "",
    remember: false
};

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(100),
    remember: yup.boolean().required()
});

function Login() {
    const apolloClient = useApolloClient();
    const [login] = useLoginMutation();
    const { signIn } = useAuth();

    const [invalidApiResponse, setInvalidApiResponse] = useState<boolean>(false);
    const history = useHistory();

    const formik = useFormik<LoginMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
                values: LoginMutationVariables,
                { setSubmitting }: FormikHelpers<LoginMutationVariables>
            ) => {
                const response = await login({
                    variables: values
                });
                if (response && response.data?.login?.token) {
                    await apolloClient.resetStore();
                    signIn(response.data.login.token);
                    setSubmitting(false);
                    setInvalidApiResponse(false);
                    history.push(AuthRoutes.projects);
                }
                if (response && response.data?.login?.errors) {
                    setInvalidApiResponse(true);
                    console.log("LOGIN ERRORS: ", response.data?.login?.errors)
                }
            }
        });

    return (
        <SidemenuContainer heading={<h5>Welcome back! <br/> Sign in</h5>} >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} >
                    <InputField name="email" type="email" label="Email" />
                    <InputField name="password" type="password" label="Password" />
                    <CompactCheckbox name="remember" label="Stay logged in for 30 days"/>
                    <SubmitButton text="Login"/>
                    { invalidApiResponse && <ErrorSummary errorMessage="Invalid Username and/or Passwort" /> }
                </form>
            </FormikProvider>
        </SidemenuContainer>
    );
}

export default Login;