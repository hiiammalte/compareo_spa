import { useState } from "react";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import * as yup from 'yup'

import { CreateProjectMutationVariables, ProjectDataFragment, ProjectsDocument, ProjectsQuery, useCategoriesQuery } from "../../../graphql/hooks/graphql";
import { useCreateProjectMutation } from '../../../graphql/hooks/graphql'
import InputField from "../../form/InputField";
import ErrorSummary from "../../form/ErrorSummary";
import SelectField, { optionType } from "../../form/SelectField";

type FormProps = {
    formId: string,
    onCreatedProject: (project: ProjectDataFragment) => void
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
    const [invalidApiResponse, setInvalid] = useState<string>("");
    const [createProject] = useCreateProjectMutation();

    const { data, loading, error } = useCategoriesQuery();

    const formik = useFormik<CreateProjectMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
                values: CreateProjectMutationVariables,
                { setSubmitting }: FormikHelpers<CreateProjectMutationVariables>
            ) => {
                const response = await createProject({
                    variables: values,
                    update: (cache, { data }) => {
                        try {
                            const newProjectFromResponse = data?.createProject?.project;
                            const existingProjects = cache.readQuery<ProjectsQuery>({
                                query: ProjectsDocument
                            });
                            if (existingProjects && newProjectFromResponse) {
                                cache.writeQuery<ProjectsQuery>({
                                    query: ProjectsDocument,
                                    data: {
                                        projects: [...existingProjects.projects, newProjectFromResponse]
                                    }
                                })
                            }
                        } catch (e) {
                            console.log("Error while updating cache", e);
                        }
                    }
                });
                if (response && response.data?.createProject?.project) {
                    onCreatedProject(response.data.createProject.project);
                    setSubmitting(false);
                    setInvalid("");
                    formik.resetForm();
                }
                if (response && response.data?.createProject?.errors) {
                    console.log("PRODUCT CREATION ERRORS: ", response.data?.createProject?.errors)
                    setInvalid(response.data.createProject.errors.map(x => x.message).join(" "));
                }
            }
        }
    );
    
    const selectOptions: optionType[] | undefined = data?.categories && 
        data?.categories.map(({title, id}) => ({ key: title, value: id}));

    return (
        <FormikProvider value={formik}>
            <form id={formId} onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <h6>What is it about?</h6>
                    <InputField name="title" type="text" label="Name des Projektes" />
                    <InputField name="desciption" type="text" label="Beschreibung" />
                </div>
                {!loading && !error &&
                    <div className="form-group">
                        <h6>What are we comparing?</h6>
                        <SelectField name="categoryId" options={ selectOptions } label="Kategorie" />
                    </div>
                }
                { invalidApiResponse && <ErrorSummary errorMessage={ invalidApiResponse } /> }
            </form>
        </FormikProvider>
    );
}

export default ProjectCreateForm