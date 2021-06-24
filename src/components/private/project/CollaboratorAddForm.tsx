import { useState } from "react";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import * as yup from 'yup'

import { AddCollaboratorsMutationVariables, useAddCollaboratorsMutation } from "../../../graphql/hooks/graphql";
import InputField from "../../form/InputField";
import ErrorSummary from "../../form/ErrorSummary";
import CheckboxField from "../../form/CheckboxField";

type FormProps = {
    formId: string,
    onCollaboratorsAdded: () => void,
    projectId: string
}

const validationSchema = yup.object({
     email: yup.string().email().required()
})

function CollaboratorsAddForm({ onCollaboratorsAdded, formId, projectId } : FormProps) {
    const [invalidApiResponse, setInvalid] = useState<string>("");
    const [addCollaborators] = useAddCollaboratorsMutation();

    const initialValues: AddCollaboratorsMutationVariables = {
        email: "",
        projectId
    };

    const formik = useFormik<AddCollaboratorsMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
            values: AddCollaboratorsMutationVariables,
            { setSubmitting }: FormikHelpers<AddCollaboratorsMutationVariables>
        ) => {
            const response = await addCollaborators({ variables: values });
            if (response && response.data?.addCollaborators?.success) {
                onCollaboratorsAdded();
                setSubmitting(false);
                setInvalid("");
                formik.resetForm();
            }
            if (response && response.data?.addCollaborators?.errors) {
                setInvalid(response.data?.addCollaborators.errors.map(x => x.message).join(" "));
            }
        }
    });

    return (
        <FormikProvider value={formik}>
            <form id={formId} onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <h6>Who should join the team?</h6>
                    <InputField name="email" type="email" label="Email address of new team member" />
                </div>
                <div className="form-group">
                    <h6>Send an email?</h6>
                    <CheckboxField name="notify" label="Send invitation code to new user" />
                </div>
                { invalidApiResponse && <ErrorSummary errorMessage={ invalidApiResponse } /> }
            </form>
        </FormikProvider>
    );
}

export default CollaboratorsAddForm