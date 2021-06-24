import { useState } from "react";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import * as yup from 'yup'

import { AttributeDataFragment, ComparisionType, CreateAttributeMutationVariables, useCreateAttributeMutation,  } from "../../../graphql/hooks/graphql";
import InputField from "../../form/InputField";
import ErrorSummary from "../../form/ErrorSummary";
import RadioField from "../../form/RadioField";
import { optionType } from "../../form/SelectField";

type FormProps = {
    formId: string,
    onCreatedAttribute: (attribute: AttributeDataFragment) => void,
    projectId: string
}

const validationSchema = yup.object({
    title: yup.string().required(),
    dataType: yup.mixed().oneOf(Object.values(ComparisionType))
})

function AttributeCreateForm({ onCreatedAttribute, formId, projectId } : FormProps) {
    const [invalidApiResponse, setInvalid] = useState<string>("");
    const [createAttribute] = useCreateAttributeMutation();

    const initialValues: CreateAttributeMutationVariables = {
        title: "",
        dataType: ComparisionType.Boolean,
        projectId
    };

    const formik = useFormik<CreateAttributeMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
            values: CreateAttributeMutationVariables,
            { setSubmitting }: FormikHelpers<CreateAttributeMutationVariables>
        ) => {
            const response = await createAttribute({ variables: values });
            if (response && response.data?.createAttribute?.attribute) {
                onCreatedAttribute(response.data.createAttribute.attribute);
                setSubmitting(false);
                setInvalid("");
                formik.resetForm()
            }
            if (response && response.data?.createAttribute?.errors) {
                setInvalid(response.data.createAttribute.errors.map(x => x.message).join(" "));
            }
        }
    });
    
    const radioOptions: optionType[] | undefined = Object.entries(ComparisionType).map(([k, v]) => ({ key: k, value: v }));

    return (
        <FormikProvider value={formik}>
            <form id={formId} onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <h6>What are we talking about?</h6>
                    <InputField name="title" type="text" label="Attribute Name" />
                </div>
                <div className="form-group">
                    <h6>What kind of data is it?</h6>
                    <RadioField name="dataType" options={ radioOptions } initialValue={ radioOptions[0].value } label="Data type"/>
                </div>
                { invalidApiResponse && <ErrorSummary errorMessage={invalidApiResponse} /> }
            </form>
        </FormikProvider>
    );
}

export default AttributeCreateForm