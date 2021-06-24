import { useState } from "react";
import { FormikHelpers, FormikProvider, useFormik } from "formik";
import * as yup from 'yup'

import { CreateProductMutationVariables, ProductDataFragment } from "../../../graphql/hooks/graphql";
import { useCreateProductMutation } from '../../../graphql/hooks/graphql'
import InputField from "../../form/InputField";
import ErrorSummary from "../../form/ErrorSummary";

type FormProps = {
    formId: string,
    onCreatedProduct: (product: ProductDataFragment) => void,
    projectId: string
}

const validationSchema = yup.object({
    name: yup.string().required(),
    url: yup.string().url(),
    manufacturer: yup.string()
})

function ProductCreateForm({ onCreatedProduct, formId, projectId } : FormProps) {
    const [invalidApiResponse, setInvalid] = useState<string>("");
    const [createProject] = useCreateProductMutation();

    const initialValues: CreateProductMutationVariables = {
        name: "",
        url: "",
        manufacturer: "",
        projectId
    };

    const formik = useFormik<CreateProductMutationVariables>({
        initialValues,
        validationSchema,
        onSubmit: async (
            values: CreateProductMutationVariables,
            { setSubmitting }: FormikHelpers<CreateProductMutationVariables>
        ) => {
            const response = await createProject({ variables: values });
            if (response && response.data?.createProduct?.product) {
                onCreatedProduct(response.data.createProduct.product);
                setSubmitting(false);
                setInvalid("");
                formik.resetForm();
            }
            if (response && response.data?.createProduct?.errors) {
                setInvalid(response.data?.createProduct.errors.map(x => x.message).join(" "));
            }
        }
    });

    return (
        <FormikProvider value={formik}>
            <form id={formId} onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <h6>What are we talking about?</h6>
                    <InputField name="name" type="text" label="Product Name" />
                </div>
                <div className="form-group">
                    <h6>Want to save additional info?</h6>
                    <InputField name="manufacturer" type="text" label="Manufacturer" />
                    <InputField name="url" type="text" label="Product website url" />
                </div>
                { invalidApiResponse && <ErrorSummary errorMessage={ invalidApiResponse } /> }
            </form>
        </FormikProvider>
    );
}

export default ProductCreateForm