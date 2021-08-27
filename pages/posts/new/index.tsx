import { Field, FieldArray, Form, Formik, getIn } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { addPostApi } from '../../../utils/service';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Index = () => {
  const router = useRouter();

  const initialValues = {
    title: '',
    content: '',
    categories: [],
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    content: yup.string().required('Required'),
    category: yup.array().required('Required'),
  });

  const submitHandler = async (values, actions) => {
    try {
      values = {
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: values.categories.map((category) => {
          return {
            ...category
          };
        }),
      };
      await addPostApi(values);
      router.push('/');
    } catch (error) {
      console.log('error', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field name="title">
                {({ field, form }) => (
                  <Form.Control
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <Form.Label htmlFor="title" fontSize="xl">
                      Post Title
                    </Form.Label>
                    <Input {...field} id="title" />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </Form.Control>
                )}
              </Field>
              <Field name="content">
                {({ field, form }) => (
                  <Form.Control
                    isInvalid={
                      form.errors.content && form.touched.content
                    }
                  >
                    <Form.Label htmlFor="content" fontSize="xl" mt={4}>
                      Post content
                    </Form.Label>
                    <Textarea {...field} id="content" />
                    <FormErrorMessage>
                      {form.errors.content}
                    </FormErrorMessage>
                  </Form.Control>
                )}
              </Field>
              <Field name="categories">
                {({ field }) => (
                  <Form.Control>
                    <Form.Label htmlFor="categories" fontSize="xl" mt={4}>
                      Enter your categories data:
                    </Form.Label>
                    <Box ml={4}>
                      <FieldArray {...field} name="categories" id="categories">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          const { values, errors, touched } = form;
                          const { categories } = values;
                          const errorHandler = (name) => {
                            const error = getIn(errors, name);
                            const touch = getIn(touched, name);
                            return touch && error ? error : null;
                          };
                          return (
                            <div>
                              {categories.map((_question, index) => {
                                return (
                                  <Flex key={index} direction="column">
                                    <Form.Control
                                      isInvalid={errorHandler(
                                        `categories[${index}][title]`
                                      )}
                                    >
                                      <Form.Label
                                        htmlFor={`categories[${index}][title]`}
                                      >
                                        Question Title:
                                      </Form.Label>
                                      <Input
                                        name={`categories[${index}][title]`}
                                        as={Field}
                                        mb={
                                          !errorHandler(
                                            `categories[${index}][title]`
                                          ) && 3
                                        }
                                      />
                                      <FormErrorMessage>
                                        {errorHandler(
                                          `categories[${index}][title]`
                                        )}
                                      </FormErrorMessage>
                                    </Form.Control>
                                    <SimpleGrid
                                      minChildWidth="300px"
                                      spacing="10px"
                                      mb={{ base: 4 }}
                                    >
                                    </SimpleGrid>
                                    <Flex
                                      direction="row"
                                      justify="flex-end"
                                      mt={4}
                                    >
                                      {index > 0 && (
                                        <IconButton
                                          onClick={() => remove(index)}
                                          aria-label="Remove Category"
                                          icon={<MinusIcon />}
                                          variant="ghost"
                                        >
                                          -
                                        </IconButton>
                                      )}
                                      {index === categories.length - 1 && (
                                        <IconButton
                                          onClick={() => push(categoriesData)}
                                          aria-label="Add Category"
                                          icon={<AddIcon />}
                                          variant="ghost"
                                        >
                                          +
                                        </IconButton>
                                      )}
                                    </Flex>
                                    {index !== categories.length - 1 && (
                                      <Divider
                                        mt={2}
                                        mb={4}
                                        css={{
                                          boxShadow: '1px 1px #888888',
                                        }}
                                      />
                                    )}
                                  </Flex>
                                );
                              })}
                            </div>
                          );
                        }}
                      </FieldArray>
                    </Box>
                  </Form.Control>
                )}
              </Field>
              <Button
                colorScheme="green"
                isLoading={props.isSubmitting}
                type="submit"
                disabled={!(props.isValid && props.dirty)}
              >
                Submit Post
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default Index;
