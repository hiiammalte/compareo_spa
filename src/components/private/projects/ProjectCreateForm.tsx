import React, { useState } from "react";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import * as yup from 'yup'

import { CreateProjectMutationVariables, Project } from "../../../graphql/hooks/graphql";
import { useCreateProjectMutation } from '../../../graphql/hooks/graphql'
import InputField from "../../form/InputField";
import ErrorSummary from "../../form/ErrorSummary";
import SelectField, { optionsType } from "../../form/SelectField";

type FormProps = {
    formId: string,
    onCreatedProject: (id: String) => void
}

const initialValues: CreateProjectMutationVariables = {
    title: "",
    description: "",
    categoryId: ""
};

const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    categoryId: yup.string().required()
})

function ProjectCreateForm({ onCreatedProject, formId } : FormProps) {
    const [invalidApiResponse, setInvalid] = useState<boolean>(false);
    const [createProject] = useCreateProjectMutation();

    const formik = useFormik<CreateProjectMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
                values: CreateProjectMutationVariables,
                { setSubmitting }: FormikHelpers<CreateProjectMutationVariables>
            ) => {
            const response = await createProject({
                variables: values
            });
            if (response && response.data?.createProject?.project) {
                onCreatedProject(response.data.createProject.project.id);
                setSubmitting(false);
                setInvalid(false);
            }
            if (response && response.data?.createProject?.errors) {
                console.log("LOGIN ERRORS: ", response.data?.createProject?.errors)
                setInvalid(true);
            }
          }
    });

    const selectOptions: optionsType = [
        { label: "Versicherung", value: "1" },
        { label: "Autos", value: "2" },
        { label: "Software", value: "3" },
    ];

    return (
        <FormikProvider value={formik}>
            <form id={formId} onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <h6>Worum geht es?</h6>
                    <InputField name="title" type="text" label="Name des Projektes" />
                    <InputField name="desciption" type="text" label="Beschreibung" />
                    <SelectField name="categoryId" options={ selectOptions } label="Kategorie" />
                    { invalidApiResponse && <ErrorSummary errorMessage="Invalid Input" /> }
                </div>
            </form>
        </FormikProvider>
    );
}

export default ProjectCreateForm