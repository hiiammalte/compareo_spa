import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddCollaboratorInput = {
  email: Scalars['String'];
};

/** The reusable Attribute model - used as base for assigning properties to products */
export type Attribute = {
  id: Scalars['ID'];
  /** Attribute name */
  title: Scalars['String'];
  /** Attribute type */
  dataType: Scalars['Float'];
  /** User who created this attribute */
  creator: User;
  /** Attribute creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Attribute last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AttributeCreatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  attribute?: Maybe<Attribute>;
};

export type AttributeSuccessResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type AttributeUpdatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  attribute?: Maybe<Attribute>;
};

/** The Category model - used for categorizing projects */
export type Category = {
  id: Scalars['ID'];
  /** Category name */
  title: Scalars['String'];
  /** Category creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Category last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CollaborationSuccessResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

/** This is mandatory to tell the app on how to compare properties of two or more products */
export enum ComparisionType {
  Number = 'NUMBER',
  Text = 'TEXT',
  Boolean = 'BOOLEAN'
}

export type CreateAttributeInput = {
  title: Scalars['String'];
  dataType: ComparisionType;
};

export type CreateProductInput = {
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
};

export type CreateProjectInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  categoryId: Scalars['String'];
};


export type Error = {
  message: Scalars['String'];
};

export type Mutation = {
  register: UserTokenResponse;
  registerByInvitation: UserTokenResponse;
  login: UserTokenResponse;
  revokeAccess: UserSuccessResponse;
  logout: UserSuccessResponse;
  deleteUser: UserSuccessResponse;
  createProject: ProjectCreatedResponse;
  updateProject: ProjectUpdatedResponse;
  deleteProject: ProductSuccessResponse;
  createAttribute: AttributeCreatedResponse;
  updateAttribute: AttributeUpdatedResponse;
  deleteAttribute: AttributeSuccessResponse;
  createProduct: ProductCreatedResponse;
  updateProduct: ProductUpdatedResponse;
  addCollaborators: CollaborationSuccessResponse;
  removeCollaborator: CollaborationSuccessResponse;
};


export type MutationRegisterArgs = {
  options: RegistrationInput;
};


export type MutationRegisterByInvitationArgs = {
  options: RegistrationByInvitationInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRevokeAccessArgs = {
  userId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  options: CreateProjectInput;
};


export type MutationUpdateProjectArgs = {
  options: UpdateProjectInput;
  id: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCreateAttributeArgs = {
  options: CreateAttributeInput;
  projectId: Scalars['String'];
};


export type MutationUpdateAttributeArgs = {
  options: UpdateAttributeInput;
  id: Scalars['String'];
};


export type MutationDeleteAttributeArgs = {
  id: Scalars['String'];
};


export type MutationCreateProductArgs = {
  options: CreateProductInput;
  projectId: Scalars['String'];
};


export type MutationUpdateProductArgs = {
  options: UpdateProductInput;
  projectId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationAddCollaboratorsArgs = {
  options: AddCollaboratorInput;
  projectId: Scalars['String'];
};


export type MutationRemoveCollaboratorArgs = {
  options: RemoveCollaboratorInput;
  projectId: Scalars['String'];
};

export type MutationResponse = {
  errors?: Maybe<Array<Error>>;
};

/** The Product model - used for comparision within projects */
export type Product = {
  id: Scalars['ID'];
  /** Name of the product */
  name: Scalars['String'];
  /** Url of website with information on the product */
  url?: Maybe<Scalars['String']>;
  /** Name of person or organization that invented/manufactures the product */
  manufacturer?: Maybe<Scalars['String']>;
  /** Comparable properties of product */
  properties: Array<Property>;
  /** User who created this object */
  creator: User;
  /** Object creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Object last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductCreatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  product?: Maybe<Product>;
};

export type ProductSuccessResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ProductUpdatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  product?: Maybe<Product>;
};

/** The Project model - holds everythings relevant to a comparision */
export type Project = {
  id: Scalars['ID'];
  /** Project name */
  title: Scalars['String'];
  /** Project description */
  description: Scalars['String'];
  /** Category of the comparable products within this project */
  category: Category;
  /** Comparable products within this project */
  products: Array<Product>;
  /** Attributes for comparison within this project */
  attributes: Array<Attribute>;
  /** Additional users participating in this project */
  collaborators: Array<User>;
  /** User who created this project */
  creator: User;
  /** Project creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Project last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProjectCreatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  project?: Maybe<Project>;
};

export type ProjectUpdatedResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  project?: Maybe<Project>;
};

/** The Property model - used for assigning comparable values to products */
export type Property = {
  id: Scalars['ID'];
  /** Property name */
  title: Scalars['String'];
  /** Property value */
  value: Scalars['String'];
  /** Property type */
  dataType: Scalars['Float'];
  /** User who created this property */
  creator: User;
  /** Property creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Property last updated date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  users: Array<User>;
  user?: Maybe<User>;
  projects: Array<Project>;
  project?: Maybe<Project>;
  categories: Array<Category>;
  attributes: Array<Attribute>;
  attribute?: Maybe<Attribute>;
  products: Array<Product>;
  product?: Maybe<Product>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryAttributeArgs = {
  id: Scalars['String'];
};


export type QueryProductsArgs = {
  projectId: Scalars['String'];
};


export type QueryProductArgs = {
  projectId: Scalars['String'];
  id: Scalars['String'];
};

export type RegistrationByInvitationInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  invitationCode: Scalars['String'];
};

export type RegistrationInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type RemoveCollaboratorInput = {
  id: Scalars['String'];
};

export type UpdateAttributeInput = {
  title?: Maybe<Scalars['String']>;
  dataType?: Maybe<ComparisionType>;
};

export type UpdateProductInput = {
  name?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
};

/** The User model */
export type User = {
  id: Scalars['ID'];
  /** User name */
  username: Scalars['String'];
  /** User email - also to be used for login */
  email: Scalars['String'];
  /** User creation date */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** User last update date */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserSuccessResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UserTokenResponse = MutationResponse & {
  errors?: Maybe<Array<Error>>;
  token?: Maybe<Scalars['String']>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  email: Scalars['String'];
  longlife: Scalars['Boolean'];
};

export type AttributeDataFragment = (
  Pick<Attribute, 'id' | 'title' | 'dataType' | 'createdAt' | 'updatedAt'>
  & { creator: UserDataFragment }
);

export type CreateAttributeMutationVariables = Exact<{
  projectId: Scalars['String'];
  title: Scalars['String'];
  dataType: ComparisionType;
}>;


export type CreateAttributeMutation = { createAttribute: { attribute?: Maybe<AttributeDataFragment>, errors?: Maybe<Array<Pick<Error, 'message'>>> } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<CategoryDataFragment> };

export type CategoryDataFragment = Pick<Category, 'id' | 'title' | 'createdAt' | 'updatedAt'>;

export type AddCollaboratorsMutationVariables = Exact<{
  projectId: Scalars['String'];
  email: Scalars['String'];
}>;


export type AddCollaboratorsMutation = { addCollaborators: (
    Pick<CollaborationSuccessResponse, 'success'>
    & { errors?: Maybe<Array<Pick<Error, 'message'>>> }
  ) };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  remember: Scalars['Boolean'];
}>;


export type LoginMutation = { login: (
    Pick<UserTokenResponse, 'token'>
    & { errors?: Maybe<Array<Pick<Error, 'message'>>> }
  ) };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: (
    Pick<UserSuccessResponse, 'success'>
    & { errors?: Maybe<Array<Pick<Error, 'message'>>> }
  ) };

export type ProductDataFragment = (
  Pick<Product, 'id' | 'name' | 'url' | 'manufacturer' | 'createdAt' | 'updatedAt'>
  & { creator: UserDataFragment }
);

export type CreateProductMutationVariables = Exact<{
  projectId: Scalars['String'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
}>;


export type CreateProductMutation = { createProduct: { product?: Maybe<ProductDataFragment>, errors?: Maybe<Array<Pick<Error, 'message'>>> } };

export type ProjectDataFragment = (
  Pick<Project, 'id' | 'title' | 'description' | 'createdAt' | 'updatedAt'>
  & { category: CategoryDataFragment, products: Array<ProductDataFragment>, attributes: Array<AttributeDataFragment>, collaborators: Array<UserDataFragment>, creator: UserDataFragment }
);

export type ProjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ProjectQuery = { project?: Maybe<ProjectDataFragment> };

export type CreateProjectMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  categoryId: Scalars['String'];
}>;


export type CreateProjectMutation = { createProject: { project?: Maybe<ProjectDataFragment>, errors?: Maybe<Array<Pick<Error, 'message'>>> } };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { projects: Array<ProjectDataFragment> };

export type RegisterByInvitationMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  invitationCode: Scalars['String'];
}>;


export type RegisterByInvitationMutation = { registerByInvitation: (
    Pick<UserTokenResponse, 'token'>
    & { errors?: Maybe<Array<Pick<Error, 'message'>>> }
  ) };

export type UserDataFragment = Pick<User, 'id' | 'username' | 'email' | 'createdAt' | 'updatedAt'>;

export type UserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type UserQuery = { user?: Maybe<UserDataFragment> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { users: Array<UserDataFragment> };

export const CategoryDataFragmentDoc = gql`
    fragment categoryData on Category {
  id
  title
  createdAt
  updatedAt
}
    `;
export const UserDataFragmentDoc = gql`
    fragment userData on User {
  id
  username
  email
  createdAt
  updatedAt
}
    `;
export const ProductDataFragmentDoc = gql`
    fragment productData on Product {
  id
  name
  url
  manufacturer
  creator {
    ...userData
  }
  createdAt
  updatedAt
}
    ${UserDataFragmentDoc}`;
export const AttributeDataFragmentDoc = gql`
    fragment attributeData on Attribute {
  id
  title
  dataType
  creator {
    ...userData
  }
  createdAt
  updatedAt
}
    ${UserDataFragmentDoc}`;
export const ProjectDataFragmentDoc = gql`
    fragment projectData on Project {
  id
  title
  description
  category {
    ...categoryData
  }
  products {
    ...productData
  }
  attributes {
    ...attributeData
  }
  collaborators {
    ...userData
  }
  creator {
    ...userData
  }
  createdAt
  updatedAt
}
    ${CategoryDataFragmentDoc}
${ProductDataFragmentDoc}
${AttributeDataFragmentDoc}
${UserDataFragmentDoc}`;
export const CreateAttributeDocument = gql`
    mutation CreateAttribute($projectId: String!, $title: String!, $dataType: ComparisionType!) {
  createAttribute(
    options: {title: $title, dataType: $dataType}
    projectId: $projectId
  ) {
    attribute {
      ...attributeData
    }
    errors {
      message
    }
  }
}
    ${AttributeDataFragmentDoc}`;
export type CreateAttributeMutationFn = Apollo.MutationFunction<CreateAttributeMutation, CreateAttributeMutationVariables>;

/**
 * __useCreateAttributeMutation__
 *
 * To run a mutation, you first call `useCreateAttributeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttributeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttributeMutation, { data, loading, error }] = useCreateAttributeMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      title: // value for 'title'
 *      dataType: // value for 'dataType'
 *   },
 * });
 */
export function useCreateAttributeMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttributeMutation, CreateAttributeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttributeMutation, CreateAttributeMutationVariables>(CreateAttributeDocument, options);
      }
export type CreateAttributeMutationHookResult = ReturnType<typeof useCreateAttributeMutation>;
export type CreateAttributeMutationResult = Apollo.MutationResult<CreateAttributeMutation>;
export type CreateAttributeMutationOptions = Apollo.BaseMutationOptions<CreateAttributeMutation, CreateAttributeMutationVariables>;
export const CategoriesDocument = gql`
    query Categories {
  categories {
    ...categoryData
  }
}
    ${CategoryDataFragmentDoc}`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const AddCollaboratorsDocument = gql`
    mutation AddCollaborators($projectId: String!, $email: String!) {
  addCollaborators(options: {email: $email}, projectId: $projectId) {
    success
    errors {
      message
    }
  }
}
    `;
export type AddCollaboratorsMutationFn = Apollo.MutationFunction<AddCollaboratorsMutation, AddCollaboratorsMutationVariables>;

/**
 * __useAddCollaboratorsMutation__
 *
 * To run a mutation, you first call `useAddCollaboratorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCollaboratorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCollaboratorsMutation, { data, loading, error }] = useAddCollaboratorsMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddCollaboratorsMutation(baseOptions?: Apollo.MutationHookOptions<AddCollaboratorsMutation, AddCollaboratorsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCollaboratorsMutation, AddCollaboratorsMutationVariables>(AddCollaboratorsDocument, options);
      }
export type AddCollaboratorsMutationHookResult = ReturnType<typeof useAddCollaboratorsMutation>;
export type AddCollaboratorsMutationResult = Apollo.MutationResult<AddCollaboratorsMutation>;
export type AddCollaboratorsMutationOptions = Apollo.BaseMutationOptions<AddCollaboratorsMutation, AddCollaboratorsMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $remember: Boolean!) {
  login(options: {email: $email, password: $password, longlife: $remember}) {
    token
    errors {
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      remember: // value for 'remember'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
    errors {
      message
    }
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($projectId: String!, $name: String!, $url: String, $manufacturer: String) {
  createProduct(
    options: {name: $name, url: $url, manufacturer: $manufacturer}
    projectId: $projectId
  ) {
    product {
      ...productData
    }
    errors {
      message
    }
  }
}
    ${ProductDataFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *      url: // value for 'url'
 *      manufacturer: // value for 'manufacturer'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ProjectDocument = gql`
    query Project($id: String!) {
  project(id: $id) {
    ...projectData
  }
}
    ${ProjectDataFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($title: String!, $description: String!, $categoryId: String!) {
  createProject(
    options: {title: $title, description: $description, categoryId: $categoryId}
  ) {
    project {
      ...projectData
    }
    errors {
      message
    }
  }
}
    ${ProjectDataFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    ...projectData
  }
}
    ${ProjectDataFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const RegisterByInvitationDocument = gql`
    mutation RegisterByInvitation($email: String!, $password: String!, $username: String!, $invitationCode: String!) {
  registerByInvitation(
    options: {email: $email, password: $password, username: $username, invitationCode: $invitationCode}
  ) {
    token
    errors {
      message
    }
  }
}
    `;
export type RegisterByInvitationMutationFn = Apollo.MutationFunction<RegisterByInvitationMutation, RegisterByInvitationMutationVariables>;

/**
 * __useRegisterByInvitationMutation__
 *
 * To run a mutation, you first call `useRegisterByInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterByInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerByInvitationMutation, { data, loading, error }] = useRegisterByInvitationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      invitationCode: // value for 'invitationCode'
 *   },
 * });
 */
export function useRegisterByInvitationMutation(baseOptions?: Apollo.MutationHookOptions<RegisterByInvitationMutation, RegisterByInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterByInvitationMutation, RegisterByInvitationMutationVariables>(RegisterByInvitationDocument, options);
      }
export type RegisterByInvitationMutationHookResult = ReturnType<typeof useRegisterByInvitationMutation>;
export type RegisterByInvitationMutationResult = Apollo.MutationResult<RegisterByInvitationMutation>;
export type RegisterByInvitationMutationOptions = Apollo.BaseMutationOptions<RegisterByInvitationMutation, RegisterByInvitationMutationVariables>;
export const UserDocument = gql`
    query User($id: String!) {
  user(id: $id) {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    ...userData
  }
}
    ${UserDataFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;